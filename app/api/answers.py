from flask import Blueprint, jsonify, request
from app.models import Answer, User, AnswerComment, Question, db
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from .question_routes import question_routes
from .user_routes import user_routes
answer_routes = Blueprint('answer_routes', __name__)


# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages


# Get all Answers of the Current User
@answer_routes.route('/current', methods=['GET'])
def answer_current():
    if current_user.is_authenticated:
        answers = Answer.query.filter(
            Answer.answerer_id == current_user.id).all()

        result = [answer.to_dict() for answer in answers]

        return {'Answers': result}
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401


# Create an Answer for a question based on the question Id
@question_routes.route('/<int:id>', methods=['POST'])
def post_answer(id):
    if current_user.is_authenticated:

        if not Question.query.get(id):
            return {
                "message": "question couldn't be found",
                "statusCode": 404
            }, 404

        data = request.json

        if not data or not len(data['body']):
            return {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "answers": "answer text is required",
                }
            }, 400

        newAnswer = Answer(
            body=data['body'],
            answerer_id=current_user.id,
            question_id=id
        )

        db.session.add(newAnswer)
        db.session.commit()

        result = {
            'id': newAnswer.id,
            "questionId": id,
            "body": newAnswer.body
        }

        return result
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401

# Edit an Answer


@answer_routes.route('/<int:id>', methods=['PUT'])
def edit_answer(id):

    if current_user.is_authenticated:
        data = request.json
        if not data:
            return {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "answers": "body text is required",
                }
            }, 400
        answer = Answer.query.get(id)

        if current_user.id is not answer.answerer_id:
            return {'errors': ['Unauthorized'], "statusCode": 401}, 401

        if not answer:
            return {
                "message": "answer couldn't be found",
                "statusCode": 404
            }, 404

        answer.body = data['body']

        db.session.commit()

        result = {
            "id": answer.id,
            "questionId": answer.question_id,
            "body": answer.body
        }

        return result
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401


# Delete an Answer
@answer_routes.route('/<int:id>', methods=['DELETE'])
def delete_answer(id):
    if current_user.is_authenticated:
        answer = Answer.query.get(id)
        if not answer:
            return {
                "message": "Answer couldn't be found",
                "statusCode": 404
            }, 404
        try:
            db.session.delete(answer)
            db.session.commit()
            return "Successfully"
        except:
            return 'This Answer does not hit database'

    return {'errors': ['Unauthorized'], "statusCode": 401}, 401

# Get all Answers belonging to a user based on userID


@user_routes.route('/<int:id>/answers', methods=['GET'])
def get_all_answers_user(id):

    user = User.query.get(id)

    if not user:
        return {
            "message": "user doesn't exist",
            "statusCode": 404
        }, 404

    answers = User.query.options(joinedload(
        User.answers)).filter(User.id == id).all()

    result = [answer.to_dict_a() for answer in answers]

    return {'Answers': result}


# Get an Answer based Answer Id

@answer_routes.route('/<int:id>', methods=['GET'])
def get_answer_by_id(id):
    answer = Answer.query.get(id)
    if not answer:
        return {
            "message": "Answer couldn't be found",
            "statusCode": 404
        }, 404

    return answer.to_dict()
