from flask import Blueprint, jsonify, request
from app.models import Answer, User, AnswerComment, Question,db
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from .question_routes import question_routes
answer_routes = Blueprint('answer_routes',__name__)


# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages



### Get all Answers of the Current User
@answer_routes.route('/current', methods=['GET'])
def answer_current():
    if current_user.is_authenticated:
        answers = Answer.query.filter(Answer.answerer_id == current_user.id).all()
        
    
        result = [answer.to_dict() for answer in answers]
        
        return {'Answers':result}
    return {'errors': ['Unauthorized']}


### Create an Answer for a question based on the question Id
@question_routes.route('/<int:id>', methods=['POST'])
def post_answer(id):
    
    if current_user.is_authenticated:

        if not Question.query.get(id):
            return  {
                "message": "question couldn't be found",
                "statusCode": 404
                }


        data = request.json
        
        if not data:
            return    {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                "answers": "answer text is required",
                }
                }

        newAnswer = Answer(
            body=data['body'],
            answerer_id=current_user.id,
            question_id=id
        )

        db.session.add(newAnswer)
        db.session.commit()

        result = {
            'id': newAnswer.id,
            "questionId":id,
            "body":newAnswer.body           
        }

        return result
    return {'errors': ['Unauthorized']} 

### Edit an Answer
@answer_routes.route('/<int:id>', methods=['PUT'])
def edit_answer(id):

    if current_user.is_authenticated:
        data = request.json
        if not data:
            return    {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                "answers": "body text is required",
                }
                } 
        answer = Answer.query.get(id)
        if not answer:
            return     {
                "message": "answer couldn't be found",
                "statusCode": 404
                }

        answer.body = data['body']

        db.session.commit()

        result = {
            "id":answer.id,
            "questionId":answer.question_id,
            "body":answer.body
        }

        return result
    return {'errors': ['Unauthorized']} 
