from .db import db, environment, SCHEMA


# tags_questions = db.Table(
#     'tags_questions',
#     db.Model.metadata,

#     db.Column('question_id', db.ForeignKey('questions.id'), primary_key=True),
#     db.Column('tag_id', db.ForeignKey('tags.id'), primary_key=True )
#     )

class TagQuestion(db.Model):
    __tablename__='tags_questions'
    
    id = db.Column(db.Integer, primary_key=True)
    
    question_id =  db.Column(db.Integer, db.ForeignKey('questions.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'))
    
    # tags = db.relationship('Tag',
    #                           back_populates='tags_questions'
    # )

    # questions = db.relationship('Question',
    #                              back_populates='tags_questions'
    # )
    
    def to_dict(self):
        return {
            "id": self.id,
            "question_id": self.question_id,
            "tag_id": self.tag_id
        }


class Question(db.Model):
    __tablename__= 'questions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable = False)
    body = db.Column(db.String(10000), nullable = False)
    ask_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    tags = db.relationship('Tag',
                            secondary='tags_questions',
                            back_populates ='questions' 
    )

    answers = db.relationship('Answer',
                              back_populates='questions',
                 
                              cascade="all, delete-orphan"
    )

    askers = db.relationship('User',
                            back_populates='questions'
    )

    def to_dict(self):
        return {
            "id" :self.id,
            "title" : self.title,
            "body" :self.body,
            "askId": self.ask_id,
            "askers":self.askers.to_dict()
        }

    def search_result(self):
        return {
            "title" : self.title,
            "body" : self.body,
            "answers":[answer.body for answer in self.answers]
        }







class Tag(db.Model):
    __tablename__='tags'

    id = db.Column(db.Integer, primary_key=True)
    tagName = db.Column(db.String(255), nullable = False, unique=True)

    questions = db.relationship('Question',
                                secondary='tags_questions',
                                back_populates='tags'
    )


    def to_dict(self):
        return {
            "id":self.id,
            "tagName": self.title,

        }

class Answer(db.Model):
    __tablename__='answers'

    id = db.Column(db.Integer, primary_key=True)

    body = db.Column(db.String(10000), nullable = False)

    answerer_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))

    questions = db.relationship("Question",
                                back_populates='answers'
    )

    answer_comments = db.relationship('AnswerComment',
                                      back_populates='answers',
                                      cascade="all, delete-orphan"
    )

    answerers = db.relationship('User',
                                back_populates='answers'
    )

    def to_dict(self):
        return {
            "id":self.id,
            "body": self.body,
            "answerer_id":self.answerer_id,
            "question_id": self.question_id,
            "questions": self.questions.to_dict(),
        }
    
      

class AnswerComment (db.Model):
    __tablename__='answer_comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(10000), nullable = False)

    commenter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    answer_id = db.Column(db.Integer, db.ForeignKey('answers.id'))

    answers = db.relationship('Answer',
                              back_populates='answer_comments'
    )

    commenters = db.relationship('User',
                                 back_populates='answer_comments'
    )

    def to_dict(self):
        return {
            "id":self.id,
            "body": self.body,
            "answer_id":self.answer_id,
        }

