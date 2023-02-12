from flask import Blueprint, jsonify, request
from app.models import Answer, User, AnswerComment, Question, db
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from .question_routes import question_routes
from .user_routes import user_routes
from sqlalchemy import or_

search_routes = Blueprint('search_routes', __name__)


@search_routes.route('', methods=['GET'])
def search():

    data = request.args.get('q')

    results = Question.query.filter(Question.title.contains(
        data)).options(joinedload(Question.askers)).all()

    result = [result.search_result() for result in results]

    return {'Result': result}
