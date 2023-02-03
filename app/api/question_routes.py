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

# localhost:5000/api/questions/{{questionId}}
@question_routes.route('/<questionId>', methods=['PUT'])
def edit_question(questionId):
    
    # Endpoint for updating a guide
    
    # @app.route("/guide/<id>", methods=["PUT"])
    # def guide_update(id):
    #     guide = Guide.query.get(id)
    #     title = request.json['title']
    #     content = request.json['content']

    #     guide.title = title
    #     guide.content = content

    #     db.session.commit()
    #     return guide_schema.jsonify(guide)
    
    # question = Question.query.get(questionId)
    # print(type(question), "<------------------ what question looks like")

    
    if current_user.is_authenticated:
            
        data = json.loads(request.data)
        
        question = Question.query.get(questionId)
        
        if not question: 
            return {'errors': ['Question ID does not exist']}
    
        question.title = data['title'],
        question.body = data['body'],

        # db.session.add(question)
        db.session.commit()

        # result = {
        #     "title": question.title,
        #     "body": question.body,
        #     "ask_id": question.ask_id,
        #     "askers":current_user.to_dict()
        # }

        #return result
    return {'errors': ['Unauthorized']}
