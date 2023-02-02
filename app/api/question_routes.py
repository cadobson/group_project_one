import flask
from flask import Blueprint, render_template, jsonify, redirect
from flask_login import login_required
from app.models import User, Question, db
from sqlalchemy.orm import joinedload
from app.forms import QuestionForm

question_routes = Blueprint('question_routes', __name__)

### Get all Questions

@question_routes.route('/', methods=['GET'])
def get_all_questions():
    questions = Question.query.options(joinedload(Question.askers)).all()

    data = [question.to_dict() for question in questions ]

    return {"Questions": data}


@question_routes.route('/question_form', methods = ['GET'])
def get_simple_form():
        simple_form = QuestionForm()
        return render_template('simple_form.html', form=simple_form)

@question_routes.route('/question_form', methods = ['POST'])
def post_simple_form():
        simple_form = QuestionForm()
       
        if simple_form.validate_on_submit():
            data = simple_form.data
            
            new_question = QuestionForm(
                title = data['title'],
                body = data['body']
            )

            db.session.add(new_question)
            db.session.commit()
            return redirect("/api/questions")
        return 'Bad Data'

