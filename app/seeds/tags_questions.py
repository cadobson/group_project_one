from app.models import db, TagQuestion, environment, SCHEMA

# Adds a demo user, you can add other users here if you want


def seed_tags_questions():
    tag_question_4_1 = TagQuestion(
        tag_id=4,
        question_id=1,
    )
    tag_question_5_1 = TagQuestion(
        tag_id=5,
        question_id=1,
    )
    tag_question_4_2 = TagQuestion(
        tag_id=4,
        question_id=2,
    )
    tag_question_4_3 = TagQuestion(
        tag_id=4,
        question_id=3,
    )
    tag_question_5_3 = TagQuestion(
        tag_id=5,
        question_id=3,
    )
    tag_question_6_4 = TagQuestion(
        tag_id=6,
        question_id=4,
    )

    db.session.add(tag_question_4_1)
    db.session.add(tag_question_5_1)
    db.session.add(tag_question_4_2)
    db.session.add(tag_question_4_3)
    db.session.add(tag_question_5_3)
    db.session.add(tag_question_6_4)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_tags_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tags_questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags_questions")

    db.session.commit()
