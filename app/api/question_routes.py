

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


## Delete a question

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
