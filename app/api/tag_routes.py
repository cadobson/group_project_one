import flask
from flask import Blueprint, render_template, jsonify, redirect, request
from flask_login import login_required
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Question, Answer, Tag, TagQuestion, db
from sqlalchemy.orm import joinedload
from app.forms import QuestionForm
import json

tag_routes = Blueprint('tag_routes', __name__)

@tag_routes.route('/<tagId>', methods=['PUT'])
def edit_tag(tagId):
    print(current_user.id)
    if current_user.is_authenticated:
        return 'True!'