from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Question


question_routes = Blueprint('question_routes', __name__)

### Get all Questions

@question_routes.route('/', methods=['GET'])
def get_all_questions():
    questions = Question.query.join(User).all()

    data = [question.to_dict() for question in questions ]


    return {"Questions":data}