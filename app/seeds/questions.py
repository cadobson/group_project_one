from app.models import db, User, environment, SCHEMA,Question

def seed_questions():
    question_1 = Question(
        title='What Are the Benefits of Regular Exercise?', 
        body='What are some of the key benefits of regular exercise? How does exercise help us to stay healthy and fit? ',
        ask_id = 1
        )     
    question_2 = Question(
        title='What Are the Benefits of Eating a Balanced Diet?', 
        body='What are the key benefits of eating a balanced diet? What are some tips for ensuring a healthy and nutritious diet?',
        ask_id = 2
        )     

    question_3 = Question(
        title='How Can We Achieve a Healthy Lifestyle?', 
        body='What are some of the most important steps for achieving a healthy lifestyle? How can we maintain a healthy lifestyle in the long-term?',
        ask_id =3
        )     
   


    db.session.add(question_1)
    db.session.add(question_2)
    db.session.add(question_3)
    db.session.commit()