from flask import Blueprint, jsonify, request
from app.models import Answer, User, AnswerComment, db, Question
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from .answers import answer_routes
from .user_routes import user_routes

comment_routes = Blueprint('comment_routes', __name__)

# Get all Comments of the Current User


@comment_routes.route('/current', methods=['GET'])
def comments_current():
    if current_user.is_authenticated:
        comments = AnswerComment.query.filter(
            AnswerComment.commenter_id == current_user.id).all()

        result = [comment.to_dict() for comment in comments]

        return {'Comments':result}
    
    return {'errors': ['Unauthorized'], "statusCode": 401 }, 401

# Create a Comment for an answer based on the answers Id

@answer_routes.route('/<int:id>', methods=['POST'])
def post_comment(id):
    if not Answer.query.get(id):
        return {"message": "answer couldn't be found", "statusCode": 404}, 404

    if current_user.is_authenticated:
        data = request.json
        print(data)

        if not data or len(data['body']) == 0:
               return  {
                "message": "Validation error",
                    "statusCode": 400,
                    "errors": {
                        "body": "comment text is required",
                    }
                }, 400

        newComment = AnswerComment(
            body=data["body"],
            commenter_id=current_user.id,
            answer_id=id
        )
        db.session.add(newComment)
        db.session.commit()

        result = {
            "id":newComment.id,
            "answerId":newComment.answer_id,
            "body":newComment.body,
        }

        return result

    return {'errors': ['Unauthorized'], "statusCode": 401 }, 401
 
### Edit a comment

@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    if current_user.is_authenticated:
        
        comment = AnswerComment.query.get(id)
        
        if not comment:
            return {
                "message": "answer couldn't be found",
                "statusCode": 404
            }, 404
        if current_user.id is not comment.commenter_id:
            return {'errors': ['Unauthorized']}
        data = request.json

        if not data:
            return    {
                    "message": "Validation error",
                    "statusCode": 400,
                    "errors": {
                    "answers": "body text is required",
                    }
                }, 400 

        comment.body = data['body']

        db.session.commit()

        result = {
            "id": comment.id,
            "answerId": comment.answer_id,
            "body": comment.body
        }

        return result
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401
 
 ### Delete a Comment

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    if current_user.is_authenticated:
        
        comment = AnswerComment.query.get(id)
        
        if not comment:
            return {
                "message": "Comment couldn't be found",
                "statusCode": 404
            }, 404
        try:
            db.session.delete(comment)
            db.session.commit()
            return "Successfully"
        except:
            return 'This comment does not hit database'
    
    return {'errors': ['Unauthorized'], "statusCode": 401}, 401 

### Get all Comments belonging to a user based on userID

@user_routes.route('/<int:id>/comments', methods=['GET'])
def get_all_comments_by_userId(id):

    user = User.query.get(id)

    if not user:
        return {
            "message": "user doesn't exist",
            "statusCode": 404
        }, 404

    comments = User.query.options(joinedload(
        User.answer_comments)).filter(User.id == id).all()

    result = [comment.to_dict_c() for comment in comments]

    return {'Comments': result}


# Get a Comment based Comment Id

@comment_routes.route('/<int:id>', methods=['GET'])
def comment_by_id(id):
    comment = AnswerComment.query.get(id)
    if not comment:
        return  {
                "message": "comment couldn't be found",
                "statusCode": 404
            }, 404
        
    return comment.to_dict()
