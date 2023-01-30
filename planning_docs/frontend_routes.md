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

Logged in users are presented with a list of all questions, as well as a form to submit a new question. Logged out users are presented with a form menacing them to either sign up or log in.

* `GET /questions`
* `POST /questions`
* `GET /questions/:questionId`

## `/questions/:questionId`

A detailed page containing a question, all of its answers, all of the comments on those answers, and all of its tags. Logged in users can post answers or comments. The owner of the question can edit or delete the question, as well as create or edit tags on that question. If a user has an answer or a comment on this page, they can also edit or delete that comment/answer that they own.

Users can click on answers to get the page for that answer. Users can click on comments to get the page for that comment.

* `GET /questions/:questionId`
* `DELETE /questions/:questionId`
* `DELETE /answers/:answerId`
* `DELETE /comments/:commentId`
* `PUT /questions/:questionId`
* `PUT /answers/:answerId`
* `PUT /comments/:commentId`
* `POST /questions/:questionId/tags`
* `GET /questions/:questionId/tags`
* `PUT /questions/:questionId/tags`
* `DELETE /questions/:questionId/tags`

## `/answers/:answerId`

An abbreviated version of the question page. On this page, a user can view the requested answer, the question it is in response to, and all comments on that answer. The owner of a question, answer, or comment can edit or delete it. The owner of the question can add, edit, or remove tags.

* `GET /questions/:questionId/truncated`
* `GET /answers/:answerId`
* `DELETE /questions/:questionId`
* `DELETE /answers/:answerId`
* `DELETE /comments/:commentId`
* `PUT /questions/:questionId`
* `PUT /answers/:answerId`
* `PUT /comments/:commentId`
* `POST /questions/:questionId/tags`
* `GET /questions/:questionId/tags`
* `PUT /questions/:questionId/tags`
* `DELETE /questions/:questionId/tags`

## `/comments/:commentId`

An abbreviated version of the answer page. On this page, a user can view the requested comment, the answer it is a child of, and the question which the answer is in response to. The owner of a question, answer, or comment can edit or delete it. The owner of the question can add, edit, or remove tags.

* `GET /questions/:questionId/truncated`
* `GET /answers/:answerId/truncated`
* `GET /comments/:commentId`
* `DELETE /questions/:questionId`
* `DELETE /answers/:answerId`
* `DELETE /comments/:commentId`
* `PUT /questions/:questionId`
* `PUT /answers/:answerId`
* `PUT /comments/:commentId`
* `POST /questions/:questionId/tags`
* `GET /questions/:questionId/tags`
* `PUT /questions/:questionId/tags`
* `DELETE /questions/:questionId/tags`

## `/tags/:tagName`

A search feature that allows users to find all of the questions that have a particular tag attached to them.

* `GET /tags/:tagName`

## `/users/:userId`

A page to view all of the questions, answers, and comments by a particular user.

TODO: Fill in the backend routes

## `/users/current`

A page to view all of the questions, answers, and comments by the current user.

TODO: Fill in the backend routes
