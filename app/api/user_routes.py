from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Question
from sqlalchemy.orm import joinedload

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Get all questions by a user by userId
@user_routes.route('/<int:id>/questions', methods=['GET'])
def get_question_by_id(id):

    # auth not required; check to see if any user exists with sepcified id
    users = User.query.all()
    user_ids = [user.to_dict_public()['id'] for user in users]
    if id not in user_ids:
        return { "message": "User could not be found", "statusCode": 404}, 404

    questions = Question.query.options(joinedload(Question.askers)).filter(Question.ask_id == id)

    data = [question.to_dict() for question in questions ]

    return {"Questions": data}

