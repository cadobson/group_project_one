import flask
from flask import Blueprint, render_template, jsonify, redirect, request
from flask_login import login_required
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Question, db
from sqlalchemy.orm import joinedload
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
            "title":new_question.title,
            "body":new_question.body,
            "ask_id":new_question.ask_id,
            "askers":current_user.to_dict()
        }

        return result
    return {'errors': ['Unauthorized']}


@question_routes.route('/<int:id>', methods=['PUT'])
def edit_question(id):

    if current_user.is_authenticated:
            
        data = request.json
        
        question=Question.query.get_or_404(id)

     
        # if not question: 
        #     return {'errors': ['Question ID does not exist']}
        
        question.title = data['title']
        question.body = data['body']


        db.session.commit()

        result = {
            "title": question.title,
            "body": question.body,

        }

        return result
    return {'errors': ['Unauthorized']}

