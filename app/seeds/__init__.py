from flask.cli import AppGroup
from .users import seed_users, undo_users
from .answers import seed_answers, undo_answers
from .questions import seed_questions, undo_questions
from .tags import seed_tags, undo_tags
from .tags_questions import seed_tags_questions, undo_tags_questions
from .answer_comments import seed_answer_comments, undo_answer_comments
# from .answer_comments import seed_answer_comments, undo_answer_comments


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tags_questions RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.answer_comments RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    # Add other seed functions here
    seed_tags()
    seed_questions()
    seed_tags_questions()
    seed_answers()
    seed_answer_comments()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_answer_comments()
    undo_answers()
    undo_tags_questions()
    undo_questions()
    undo_tags()
    undo_users()
