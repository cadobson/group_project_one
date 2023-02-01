from flask import Blueprint, jsonify
from app.models import Answer, User

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



### Get all Comments of the Current User
@answer_routes.route('/current', methods=['GET'])
def question_current():
    answers = Answer.query.all()
    
    return 
    