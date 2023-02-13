import flask
from flask import Blueprint, render_template, jsonify, redirect, request
from flask_login import login_required
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Question, Answer, Tag, TagQuestion, db
from sqlalchemy.orm import joinedload
from sqlalchemy import func
from app.forms import QuestionForm
import json

question_routes = Blueprint('question_routes', __name__)

# Get all Questions


@question_routes.route('/', methods=['GET'])
def get_all_questions():
    questions = Question.query.options(joinedload(Question.askers)).all()

    data = [question.to_dict() for question in questions]

    return {"Questions": data}


@question_routes.route('/', methods=['POST'])
def post_simple_form():
    if current_user.is_authenticated:

        data = json.loads(request.data)

        # error handle empty title, body, or both
        title = data['title'],
        body = data['body'],

        # title cannot be empty
        if not title[0]:
            res = jsonify({
                "title": "Title cannot be null or empty string"
            })
            res.status_code = 400
            return res

        # title must be under 256 characters
        if len(title[0]) >= 256:
            res = jsonify({
                "title": "Title must be under 256 characters"
            })
            res.status_code = 400
            return res

        # body length may not exceed 10,000 characters
        if len(body[0]) >= 10**4:
            res = jsonify({
                "title": "Body must be under 10,000 characters"
            })
            res.status_code = 400
            return res

        new_question = Question(
            title=data['title'],
            body=data['body'],
            ask_id=current_user.id,
        )

        db.session.add(new_question)
        db.session.commit()

        result = {
            "id": new_question.id,
            "title": new_question.title,
            "body": new_question.body,
            "ask_id": new_question.ask_id,
            "askers": current_user.to_dict(),
        }

        return result, 201
    return {'errors': ['Unauthorized']}

# Edit a question specified by its id


@question_routes.route('/<int:id>', methods=['PUT'])
def edit_question(id):

    if current_user.is_authenticated:

        data = request.json

        question = Question.query.get(id)

        if not question:
            res = jsonify({
                "message": "question couldn't be found",
                "statusCode": 404
            })
            res.status_code = 404
            return res

        question.title = data['title']
        question.body = data['body']

        db.session.commit()

        result = {
            "title": question.title,
            "body": question.body,
            "id": question.id,
            "Asker": current_user.to_dict(),
        }

        return result
    return {'errors': ['Unauthorized']}

# Get a question by id with comments and answers


@question_routes.route('/<int:id>', methods=['GET'])
def get_question_comm_ans(id):
    question = Question.query.get(id)
    if not question:
        res = jsonify({
            "message": "question couldn't be found",
            "statusCode": 404
        })
        res.status_code = 404
        return res
    question_dict = question.to_dict()

    # Get related tags
    tag_questions = TagQuestion.query.filter(
        TagQuestion.question_id == id).all()

    tag_ids = [item.to_dict()['tag_id'] for item in tag_questions]
    try:
        tag_names = [Tag.query.get(tag_id).to_dict()['tagName']
                     for tag_id in tag_ids]
    except:
        tag_names = []

    # Get answers and comments
    answers = Answer.query.filter(Answer.question_id == id).all()
    answers_dict = list(map(lambda x: x.to_dict(), answers))

    # abstract necessary information
    askers = question_dict['askers']
    askerName = askers['first_name'] + ' ' + askers['last_name']
    askerId = askers['id']
    askerProfileImg = askers['profileimg']
    askerObj = {
        "askerId": askerId,
        "askerName": askerName,
        "profileImg": askerProfileImg
    }

    title = question_dict['title']
    body = question_dict['body']

    finalObj = {
        "id": id,
        "Asker": askerObj,
        "title": title,
        "Tags": tag_names,
        "body": body,
        "createdAt": "2023-02-19 20:30:45",
        "updatedAt": "2023-02-19 20:35:45",
        "Answers": answers_dict,
    }

    return finalObj

# Get a question by id without comments and answers


@question_routes.route('/<int:id>/truncated', methods=['GET'])
def get_question_sans_comm_ans(id):
    question = Question.query.get(id)
    if not question:
        res = jsonify({
            "message": "question couldn't be found",
            "statusCode": 404
        })
        res.status_code = 404
        return res

    question_dict = question.to_dict()

    # abstract necessary information
    askers = question_dict['askers']
    askerName = askers['first_name'] + ' ' + askers['last_name']
    askerId = askers['id']
    askerProfileImg = askers['profileimg']
    askerObj = {
        "askerId": askerId,
        "askerName": askerName,
        "profileImg": askerProfileImg
    }

    title = question_dict['title']
    body = question_dict['body']

    finalObj = {
        "id": id,
        "Asker": askerObj,
        "title": title,
        "body": body,
        "createdAt": "2023-02-19 20:30:45",
        "updatedAt": "2023-02-19 20:35:45",
    }

    return finalObj

# Delete a question (all routes)


@question_routes.route('/<int:id>', methods=['DELETE'])
def delete_question(id):

    question = Question.query.get(id)
    if not question:
        res = jsonify({
            "message": "question couldn't be found",
            "statusCode": 404
        })
        res.status_code = 404
        return res

    # values must match to make sure user owns question
    askerId = int(question.to_dict()['askId'])
    userId = int(current_user.get_id())

    if askerId != userId:
        res = jsonify({
            "message": "User does not own question", "statusCode": 404
        })
        res.status_code = 404
        return res

    if current_user.is_authenticated and askerId == userId:
        db.session.delete(question)
        db.session.commit()
        res = jsonify({
            "message": "Successfully deleted",
            "statusCode": 200
        })
        res.status_code = 200
        return res


# Tags

# Get all questions with a particular tag


@question_routes.route('/tags/<tagName>', methods=['GET'])
def get_questions_by_tag(tagName):

    try:
        tagId = Tag.query.filter(Tag.tagName == tagName)[0].to_dict()['id']
    except:
        return {"message": "Tag does not exist", "statusCode": 403}

    matching_questions = TagQuestion.query.filter(
        TagQuestion.tag_id == tagId).all()
    matching_question_ids = list(
        map(lambda x: x.to_dict()['question_id'], matching_questions))
    matching_question_ids = [
        element for element in matching_question_ids if element]
    # abstract objects of interest
    try:
        questions = list(map(lambda id: Question.query.get(
            id).search_result(), matching_question_ids))
    except:
        questions = []

    tags = Tag.query.filter(Tag.tagName == tagName)[0].to_dict()
    return {"Tags": tags, "Questions": questions}

# Make a tag for a question they made


@question_routes.route('/<questionId>/tags', methods=['POST'])
def make_tag(questionId):
    # if the tag DNE, create tag then associate. Otherwiese, just associate"
    if current_user.is_authenticated:

        question = Question.query.get(questionId)
        askId = question.to_dict()['askId']
        if askId != current_user.id:
            res = jsonify({
                "message": "User does not own question", "statusCode": 405
            })
            res.status_code = 405
            return res

        data = json.loads(request.data)
        tag_name_lower_case = data["tagName"].lower()
        new_tag = Tag(tagName=tag_name_lower_case)

        try:
            db.session.add(new_tag)
            db.session.commit()
        except:
            db.session.rollback()

        # Get primary key of newly added tag
        tagIds = Tag.query.filter(Tag.tagName == tag_name_lower_case).all()
        try:
            last_tag = tagIds[0].to_dict()['id']
        except:
            last_tag = []

        # add question_id and tag_id to tags_questions
        new_rel = TagQuestion(question_id=questionId, tag_id=last_tag)

        try:
            db.session.add(new_rel)
            db.session.commit()
        except:
            res = jsonify({
                "message": "Assocation already exists", "statusCode": 400,
                "errors": ["Assocation already exists"]
            })
            res.status_code = 400
            return res

        # Retrieve question; retrieve tag
        question = Question.query.get(questionId)

        if not question:
            res = jsonify({
                "message": "Question could not be found", "statusCode": 404
            })
            res.status_code = 404
            return res

        tag = Tag.query.get(last_tag)

        return {"Tags": tag.to_dict(), "Question": question.to_dict_sans_askers()}

# Edit a tag appears on tag_routes

# Delete a tag for a question they made


@question_routes.route('/<questionId>/<tagName>', methods=['DELETE'])
def delete_question_tags(tagName, questionId):
    if current_user.is_authenticated:

        question = Question.query.get(questionId)

        # handle error if question does not exist
        if not question:
            res = jsonify({
                "message": "Question does not exist", "statusCode": 404
            })
            res.status_code = 404
            return res

        askId = question.to_dict()['askId']
        if askId != current_user.id:
            res = jsonify({
                "message": "User does not own question", "statusCode": 405
            })
            res.status_code = 405
            return res

        # Handle error if tag does not exist
        try:
            tagId = Tag.query.filter(Tag.tagName == tagName)[0].to_dict()['id']
        except:
            res = jsonify({
                "message": "Tag does not exist", "statusCode": 404,
                "errors": ["Tag does not exist"]
            })
            res.status_code = 404
            return res

        # Retrieve and delete the relevant records from the table
        matching_questions = TagQuestion.query.filter(
            TagQuestion.tag_id == tagId).filter(TagQuestion.question_id == questionId).all()

        if not matching_questions:
            res = jsonify({
                "message": "Tag is not associated with question", "statusCode": 404
            })
            res.status_code = 404
            return res

        tags_questions_id = matching_questions[0].to_dict()['id']
        TagQuestion.query.filter(TagQuestion.id == tags_questions_id).delete()
        db.session.commit()

        # now, measure length of remaining questions. If zero, delete tag.
        tagId = Tag.query.filter(Tag.tagName == tagName).all()[
            0].to_dict()['id']

        rem_questions = TagQuestion.query.filter(
            TagQuestion.tag_id == tagId).all()
        rem_question_ids = list(
            map(lambda x: x.to_dict()['question_id'], rem_questions))
        questions = list(
            map(lambda id: Question.query.get(id).to_dict(), rem_question_ids))
        # length of array of questions that are still tagged
        rem_quest_len = len(questions)

        if rem_quest_len == 0:
            print('no questions remain')
            Tag.query.filter(Tag.tagName == tagName).delete()
            db.session.commit()

        return {"message": "Tag successfully deleted", "statusCode": 200}

# Get all of the tags for a particular


@question_routes.route('/<questionId>/tags', methods=['GET'])
def get_question_tags(questionId):
    tag_questions = TagQuestion.query.filter(
        TagQuestion.question_id == questionId).all()
    question = Question.query.get(questionId)

    # Error handling
    if not question:
        res = jsonify({
            "message": "Question does not exist", "statusCode": 404
        })
        res.status_code = 404
        return res

    if not tag_questions:
        res = jsonify({
            "message": "Question does not have any tags", "statusCode": 404
        })
        res.status_code = 404
        return res

    # Get integer tag ids
    tag_ids = [item.to_dict()['tag_id'] for item in tag_questions]

    # get tag names to plug into tags table
    tag_names = [Tag.query.get(tag_id).to_dict()['tagName']
                 for tag_id in tag_ids]

    return {"Tags": tag_names, "Question": question.to_dict()}
