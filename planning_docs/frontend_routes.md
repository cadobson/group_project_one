# User-facing routes

## `/login`

This page displays a log in form

* `GET /login`
* `POST /login`

## `/singup`

This page displays a signup form

* `GET /signup`
* `POST /signup`

## `/`

Logged in users are presented with a list of all questions. Logged out users are presented with a form menacing them to either sign up or log in.

* `GET /questions`
* `POST /questions`
* `GET /questions/:questionId`

## `/questions/:questionId`

A detailed page containing a question, all of its answers, all of the comments on those answers, and all of its tags. Logged in users can post answers or comments. The owner of the question can edit or delete the question, as well as create or edit tags on that question. If a user has an answer or a comment on this page, they can also edit or delete that comment/answer that they own.

Users can click on answers to get the page for that answer. Users can click on comments to get the page for that comment.

* `GET /questions/:questionId`
* `GET /answers/:answerId`
* `GET /comments/:commentId`
* `DELETE /questions/:questionId`
* `DELETE /answers/:answerId`
* `DELETE /comments/:commentId`
* `PUT /questions/:questionId`
* `PUT /answers/:answerId`
* `PUT /comments/:commentId`
* `POST /questions/:questionId/tags`
