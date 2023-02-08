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

### Get all Questions

@question_routes.route('/', methods=['GET'])
def get_all_questions():
    questions = Question.query.options(joinedload(Question.askers)).all()

    data = [question.to_dict() for question in questions ]

    return {"Questions": data}

@question_routes.route('/', methods=['POST'])
def post_simple_form():
    if current_user.is_authenticated:
            
        data = json.loads(request.data)
            
        new_question = Question(
            title = data['title'],
            body = data['body'],
            ask_id = current_user.id,
        )

        db.session.add(new_question)
        db.session.commit()

        result = {
            "title": new_question.title,
            "body": new_question.body,
            "ask_id":new_question.ask_id,
            "askers":current_user.to_dict()
        }

        return result
    return {'errors': ['Unauthorized']}

### Edit a question specified by its id
@question_routes.route('/<int:id>', methods=['PUT'])
def edit_question(id):

    if current_user.is_authenticated:
            
        data = request.json
        
        question=Question.query.get_or_404(id)

        
        question.title = data['title']
        question.body = data['body']


        db.session.commit()

        result = {
            "title": question.title,
            "body": question.body,

        }

        return result
    return {'errors': ['Unauthorized']}

### Get a question by id with comments and answers 
@question_routes.route('/<int:id>', methods=['GET'])
def get_question_comm_ans(id):
    question = Question.query.get(id)
    question_dict = question.to_dict()
    
    answers = Answer.query.filter(Answer.question_id == id).all()
    answer_dict = [answer.to_dict() for answer in answers]
    #print(answer_dict[0]['questions'].to_dict(), "<-----------------------------------------")

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
        "Answers": [],
        "Comments": []
        }

    return finalObj

### Get a question by id without comments and answers 
@question_routes.route('/<int:id>/truncated', methods=['GET'])
def get_question_sans_comm_ans(id):
    question = Question.query.get(id)
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

## Delete a question (all routes) 

@question_routes.route('/<int:id>', methods=['DELETE'])
def delete_question(id):
    
    question = Question.query.get(id)
    if not question:
        return {"message": "Question could not be found", "statusCode": 404}
    
    # values must match to make sure user owns question
    askerId = int(question.to_dict()['askId'])
    userId = int(current_user.get_id())
    
    if askerId != userId:
        return {"message": "User does not own question", "statusCode": 404}
    
    if current_user.is_authenticated and askerId == userId:
        db.session.delete(question)
        db.session.commit()
        return { "message": "Successfully deleted", "statusCode": 200 }

## Tags

### Get all questions with a particular tag
@question_routes.route('/tags/<tagName>', methods=['GET'])
def get_questions_by_tag(tagName):
     
    try:
        tagId = Tag.query.filter(Tag.tagName == tagName)[0].to_dict()['id']
    except:
        return {"message": "Tag does not exist", "statusCode": 403}
    
    matching_questions = TagQuestion.query.filter(TagQuestion.tag_id == tagId).all()
    matching_question_ids = list( map(lambda x: x.to_dict()['question_id'], matching_questions) )
    
    # abstract objects of interest
    questions = list(map(lambda id: Question.query.get(id).to_dict_sans_askers(), matching_question_ids))
    tags = Tag.query.filter(Tag.tagName == tagName)[0].to_dict()
    return {"Tags": tags, "Questions": questions}

### Make a tag for a question they made
@question_routes.route('/<questionId>/tags', methods=['POST'])
def make_tag(questionId):
    if current_user.is_authenticated:
        data = json.loads(request.data)
        new_tag = Tag(tagName = data["tagName"])
        
        try:
            db.session.add(new_tag)
            db.session.commit()
        except:
            return { "message": "Tag already exists", "statusCode": 502 }
        
        # Get primary key of newly added tag
        tagIds = Tag.query.all()
        last_tag = tagIds[-1].to_dict()['id']
        
        # add question_id and tag_id to tags_questions
        new_rel = TagQuestion(question_id = questionId, tag_id = last_tag)
        db.session.add(new_rel)
        db.session.commit()
        
        # Retrieve question; retrieve tag
        question = Question.query.get(questionId)
        tag = Tag.query.get(last_tag)
            
        return {"Tags": tag.to_dict(), "Question": question.to_dict_sans_askers()}

### Edit a tag for a question they made (In progress)

## Delete a tag for a question they made (IN PROGRESS)
@question_routes.route('/<questionId>/<tagName>', methods=['DELETE'])
def delete_question_tags(tagName, questionId):
    if current_user.is_authenticated:
        try:
            tagId = Tag.query.filter(Tag.tagName == tagName)[0].to_dict()['id']
        except:
            return {"message": "Tag does not exist", "statusCode": 403}
    
    matching_questions = TagQuestion.query.filter(TagQuestion.tag_id == tagId).all()
    matching_question_ids = list( map(lambda x: x.to_dict()['question_id'], matching_questions) )
    
    # abstract objects of interest
    questions = list(map(lambda id: Question.query.get(id).to_dict(), matching_question_ids))
    tags = Tag.query.filter(Tag.tagName == tagName)[0].to_dict()
    tags_questions =  {"Tags": tags, "Questions": questions}
    
    print(current_user.id)
    return tags_questions
