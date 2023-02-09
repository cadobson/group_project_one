"""empty message

Revision ID: 49629a05542d
Revises: 
Create Date: 2023-02-08 16:26:50.253320

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '49629a05542d'
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
