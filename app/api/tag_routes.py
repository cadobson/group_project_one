import flask
from flask import Blueprint, render_template, jsonify, redirect, request
from flask_login import login_required
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Question, Answer, Tag, TagQuestion, db
from sqlalchemy.orm import joinedload
from app.forms import QuestionForm
import json

tag_routes = Blueprint('tag_routes', __name__)

# Get all tags
@tag_routes.route('/', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    
    tag_names = [tag.tagName for tag in tags]

    if not tag_names:
        return {"message": "No tags exist in database", "statusCode": 404}, 404
    
    return { "Tags": tag_names }

# determined on 2023-02-11 that route is not needed
@tag_routes.route('/<tagId>', methods=['PUT'])
def edit_tag(tagId):
    if current_user.is_authenticated:
        # Throw error if tag does not exist
        tag = Tag.query.get(tagId)
        if not tag:
            return {"message": "Tag does not exist", "statusCode": 404}
        
        print(current_user.id)
        user_id = current_user.id # key into questions table
        
        #get all question ids that user created
        questions = Question.query.filter(Question.ask_id == user_id).all()
        questions_ids = list(map(lambda x: x.to_dict()['id'], questions))
        print(questions_ids, "<------------------------------- matching questions")
        
        # # Get all questions with a particular tag id 
        all_tagged_questions = TagQuestion.query.filter(TagQuestion.tag_id == tagId).all()
        all_tagged_quest_ids = list(map(lambda x: x.to_dict()['id'], all_tagged_questions))
        print(all_tagged_quest_ids, "<------------------------------- tagged questions")
        
        # # Intersect: If user created question and question has the tag, update
        tagged_quest_ids = list(set(questions_ids) & set(all_tagged_quest_ids))
        print(tagged_quest_ids, "<--------------------- intersection")
          
        # # If tag already exists, overwrite current quest-tag rels with already-existing tag
        data = json.loads(request.data)
        tagName = data["tagName"]
        print(tagName, "<-------------------------------- request data")
        existing_tag_id = list(map(lambda x: x.to_dict()['id'], Tag.query.filter(Tag.tagName == tagName).all()))[0]
        print(existing_tag_id, "<----------------------------- existing tag id")
        
        for i in range(0, len(tagged_quest_ids)):
            print(tagged_quest_ids[0], "<---------first question")
            tagQuestion = TagQuestion.query.get(tagged_quest_ids[i]).all()
            print(tagQuestion, "<--------------- question to be modded")
            tagQuestion.tag_id = existing_tag_id
            db.session.commit()
                
        # ask_id
        return 'Hello world'
    
