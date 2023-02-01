from app.models import db, Tag, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_tags():
    demo = Tag(
        username='Demo', 
        email='demo@aa.io',
        password='password',
        first_name='Emma',
        last_name='Wang',
        profileimg='imgur.com' 
        )        
    marnie = Tag(
        username='marnie', 
        email='marnie@aa.io', 
        password='password',
        first_name='David',
        last_name='Smith',
        profileimg='imgur.com'
        )
    
    bobbie = Tag(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password',
        first_name='Sarah',
        last_name='Johnson',
        profileimg='imgur.com'
        )

    # change these (note to self)
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()