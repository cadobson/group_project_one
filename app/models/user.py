from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    profileimg = db.Column(db.String(255))

    questions = db.relationship('Question',
                                back_populates='askers',
                                cascade="all, delete-orphan"
    )
    answers = db.relationship('Answer',
                             back_populates='answerers',
                             cascade="all,delete-orphan" 
    )

    answer_comments = db.relationship('AnswerComment',
                                     back_populates='commenters',
                                     cascade="all, delete-orphan"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profileimg':self.profileimg
            
            
        }

    def to_dict_public(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profileimg':self.profileimg
            
        }
    def to_dict_a(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            # 'answers':[answer.body for answer in self.answers],
            # 'answers_id':[answer.id for answer in self.answers],
             'answers':[answer.to_dict() for answer in self.answers],

            
        }
    def to_dict_c(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'comments':[comment.body for comment in self.answer_comments]
            
        }