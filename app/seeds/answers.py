from app.models import db, User, environment, SCHEMA, Answer

def seed_answers():
    answer_1 = Answer(
        body='Regular exercise can improve physical health, mental health, reduce stress, improve sleep, boost energy levels, strengthen the immune system, and reduce the risk of chronic diseases.',
        answerer_id = 1,
        question_id = 1   

        )     
    answer_2 = Answer(
        body='Eating a balanced diet can improve overall health and wellbeing, maintain a healthy weight, provide the body with essential nutrients and minerals, reduce the risk of chronic diseases, and improve digestion.',
        answerer_id = 2,
        question_id = 2
             

        )     

    answer_3 = Answer(
        body=' To maintain a healthy lifestyle, making healthy lifestyle choices such as exercising regularly, eating a balanced diet, getting enough sleep, managing stress, and avoiding unhealthy habits can help to achieve a healthy lifestyle.',
        answerer_id =3,
        question_id =3
        )     
   


    db.session.add(answer_1)
    db.session.add(answer_2)
    db.session.add(answer_3)
    db.session.commit()