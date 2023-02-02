from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Question
from sqlalchemy.orm import joinedload


question_routes = Blueprint('question_routes', __name__)

### Get all Questions

@question_routes.route('/', methods=['GET'])
def get_all_questions():
    questions = Question.query.options(joinedload(Question.askers)).all()

    # for row in questions:
    #     for user in row.ask_id:
    #         print(row.id, row.title, user.last_name)

    # print(questions)
    # result={}

    data = [question.to_dict() for question in questions ]
    # askers = [asker.to_dict() for asker in questions]

    return {"Questions":data}