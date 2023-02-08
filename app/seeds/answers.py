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
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()