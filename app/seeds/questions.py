from app.models import db, User, environment, SCHEMA, Question


def seed_questions():
    question_1 = Question(
        title='What Are the Benefits of Regular Exercise?',
        body='What are some of the key benefits of regular exercise? How does exercise help us to stay healthy and fit? ',
        ask_id=1
    )
    question_2 = Question(
        title='What Are the Benefits of Eating a Balanced Diet?',
        body='What are the key benefits of eating a balanced diet? What are some tips for ensuring a healthy and nutritious diet?',
        ask_id=2
    )

    question_3 = Question(
        title='How Can We Achieve a Healthy Lifestyle?',
        body='What are some of the most important steps for achieving a healthy lifestyle? How can we maintain a healthy lifestyle in the long-term?',
        ask_id=3
    )

    question_4 = Question(
        title='What is the best way to learn a new language?',
        body='I do not have any language-learning experience.',
        ask_id=3
    )

    question_5 = Question(
        title='How can I start a business with no money?',
        body='',
        ask_id=3
    )

    db.session.add(question_1)
    db.session.add(question_2)
    db.session.add(question_3)
    db.session.add(question_4)
    db.session.add(question_5)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
