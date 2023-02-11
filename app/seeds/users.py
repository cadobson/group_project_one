from app.models import db, User, environment, SCHEMA


# Add profile images from https://imgur.com/t/cats
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name='Emma',
        last_name='Wang',
        profileimg='https://i.imgur.com/NCIMufv.jpeg'
    )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        first_name='David',
        last_name='Smith',
        profileimg='https://i.imgur.com/fubKkwC.jpeg'
    )

    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        first_name='Sarah',
        last_name='Johnson',
        profileimg='https://imgur.com/t/cats/UTuvBZg.jpeg'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
