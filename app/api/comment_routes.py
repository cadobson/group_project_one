from flask import Blueprint, jsonify, request
from app.models import Answer, User, AnswerComment, db,Question
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from .answers import answer_routes

comment_routes = Blueprint('comment_routes',__name__)

### Get all Comments of the Current User
@comment_routes.route('/current',methods=['GET'])
def comments_current():
    if current_user.is_authenticated:
        comments = AnswerComment.query.filter(AnswerComment.commenter_id == current_user.id).all()

        result = [comment.to_dict() for comment in comments]

        return {'Comments':result}
    return {'errors': ['Unauthorized']}


## Create a Comment for an answer based on the answers Id

@answer_routes.route('/<int:id>', methods=['POST'])
def post_comment(id):
    if not AnswerComment.query.get(id):
        return {
                "message": "answer couldn't be found",
                "statusCode": 404
            }

    if current_user.is_authenticated:
        data = request.json

        if not data:
               return  {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "body": "comment text is required",
                }
                }

        newComment = AnswerComment(
            body=data["body"],
            commenter_id=current_user.id,
            answer_id = id
        )
    db.session.add(newComment)
    db.session.commit()

    result = {
        "id":newComment.id,
        "answerId":newComment.answer_id,
        "body":newComment.body,
    }


    return result


### Edit a comment

@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    if current_user.is_authenticated:
        comment = AnswerComment.query.get(id)
        if not comment:
            return     {
                "message": "answer couldn't be found",
                "statusCode": 404
                }
        data=request.json

        if not data:
            return    {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                "answers": "body text is required",
                }
                } 

        comment.body = data['body']

        db.session.commit()

        result = {
            "id":comment.id,
            "answerId":comment.answer_id,
            "body":comment.body
        }

        return result
    return {'errors': ['Unauthorized']}
 
 ### Delete a Comment

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = AnswerComment.query.get_or_404(id)
    try:
        db.session.delete(comment)
        db.session.commit()
        return "Successfully"
    except:
        return 'This comment does not hit database'