from .db import db, environment, SCHEMA
from .db import add_prefix_for_prod


# tags_questions = db.Table(
#     'tags_questions',
#     db.Model.metadata,

#     db.Column('question_id', db.ForeignKey('questions.id'), primary_key=True),
#     db.Column('tag_id', db.ForeignKey('tags.id'), primary_key=True )
#     )

class TagQuestion(db.Model):
    __tablename__ = 'tags_questions'

    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})

    else:
        __table_args__ = (db.UniqueConstraint('question_id', 'tag_id'),)

    id = db.Column(db.Integer, primary_key=True)

    question_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('questions.id')))
    tag_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('tags.id')))

    tags = db.relationship('Tag',
                           back_populates='questions'
                           )

    questions = db.relationship('Question',
                                back_populates='tags'
                                )

    def to_dict(self):
        return {
            "id": self.id,
            "question_id": self.question_id,
            "tag_id": self.tag_id
        }


class Question(db.Model):
    __tablename__ = 'questions'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.String(10000), nullable=False)
    ask_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))

    tags = db.relationship('TagQuestion',
                           back_populates='questions'
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
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "askId": self.ask_id,
            "askers": self.askers.to_dict()
        }

    def to_dict_sans_askers(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "askId": self.ask_id,
        }

    def search_result(self):
        return {
            "title": self.title,
            "body": self.body,
            "id": self.id,
            # "answers": [answer.to_dict() for answer in self.answers]
            "Asker": self.askers.to_dict_public()
        }


class Tag(db.Model):
    __tablename__ = 'tags'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tagName = db.Column(db.String(255), nullable=False, unique=True)

    questions = db.relationship('TagQuestion',
                                back_populates='tags'
                                )

    def to_dict(self):
        return {
            "id": self.id,
            "tagName": self.tagName,
        }


class Answer(db.Model):
    __tablename__ = 'answers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    body = db.Column(db.String(10000), nullable=False)

    answerer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))

    question_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('questions.id')))

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
            "id": self.id,
            "body": self.body,
            "answerer_id": self.answerer_id,
            "question_id": self.question_id,
            "questions": self.questions.to_dict(),
            "Answerer": self.answerers.to_dict(),
            "Comments": [comment.to_dict() for comment in self.answer_comments]
        }


class AnswerComment (db.Model):
    __tablename__ = 'answer_comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(10000), nullable=False)

    commenter_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    answer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('answers.id')))

    answers = db.relationship('Answer',
                              back_populates='answer_comments'
                              )

    commenters = db.relationship('User',
                                 back_populates='answer_comments'
                                 )

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "answer_id": self.answer_id,
            "Commenter": self.commenters.to_dict_public()
        }
