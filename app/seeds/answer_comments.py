from app.models import db, AnswerComment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_answer_comments():
    comment1 = AnswerComment(
        answer_id=1,
        commenter_id=1,
        body="What a great question!"
        )
    comment2 = AnswerComment(
        answer_id=2,
        commenter_id=2,
        body="ChatGPT will never replace us!"
        )

    comment3 = AnswerComment(
        answer_id=3,
        commenter_id=3,
        body="What's moral about running a railroad?"
        )

    # change these (note to self)
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answer_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answer_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
