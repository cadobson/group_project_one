"""empty message

<<<<<<<< HEAD:migrations/versions/9a7ab6194a3d_.py
Revision ID: 9a7ab6194a3d
Revises: 
Create Date: 2023-02-06 20:36:50.186360
========
Revision ID: e5fc94a5542d
Revises: 
Create Date: 2023-02-07 19:56:20.872982
>>>>>>>> 8f243fe420c3baf8ef53595ee0b2e7eaf1f7fd07:migrations/versions/e5fc94a5542d_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/9a7ab6194a3d_.py
revision = '9a7ab6194a3d'
========
revision = 'e5fc94a5542d'
>>>>>>>> 8f243fe420c3baf8ef53595ee0b2e7eaf1f7fd07:migrations/versions/e5fc94a5542d_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tagName', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('tagName')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('profileimg', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('body', sa.String(length=10000), nullable=False),
    sa.Column('ask_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['ask_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('answers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=10000), nullable=False),
    sa.Column('answerer_id', sa.Integer(), nullable=True),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['answerer_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tags_questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.Column('tag_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('question_id', 'tag_id')
    )
    op.create_table('answer_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=10000), nullable=False),
    sa.Column('commenter_id', sa.Integer(), nullable=True),
    sa.Column('answer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['answer_id'], ['answers.id'], ),
    sa.ForeignKeyConstraint(['commenter_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('answer_comments')
    op.drop_table('tags_questions')
    op.drop_table('answers')
    op.drop_table('questions')
    op.drop_table('users')
    op.drop_table('tags')
    # ### end Alembic commands ###
