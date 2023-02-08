from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField, IntegerField, TextAreaField, DateField, BooleanField, SelectField)
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    # date_bought = DateField('Date Bought', validators=[DataRequired()])
    # nickname = StringField('Nickname', validators=[DataRequired()])
    # year = IntegerField('Year')
    # maker = StringField('Maker')
    # used = BooleanField('Used', validators=[DataRequired()])
    # submit = SubmitField('Submit')
    title = StringField('Title', validators=[DataRequired()])
    body = TextAreaField('Body')
    submit = SubmitField('Submit')