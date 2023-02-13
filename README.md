# Boura

Boura is a portfolio project Quora clone by Ray Yu, David Pratt, and Christopher Dobson. This project was meant to build our soft skills in interacting with peers on a common project.

## Setup and Installation

### Local

As a prerequisite, install the latest versions of python3, pip, node, npm, and sqlite3.

Clone this repo onto your machine.

Open two terminals -- one in the root folder, and the other in the `react-app` folder.

In the root folder, install the relevant python packages using `pipenv install`. Initialize a shell using `pipenv shell`.

Initialize the database using the script `db-helper.sh`. Use chmod to make this script executable, and execute it using `./db-helper.sh`. After the database is set up and migrated, seed the database using the command `flask seed all`.

Initialize the backend using `flask run`.

Navigate to your second terminal in the `react-app` folder. Use `npm install` to install dependencies, and use `npm run start` to start the frontend react app. If it does not automatically open the site in your browser, navigate to the url `localhost:3000`.

### Deployment

Don't deploy this. Save yourself the heartache.

## Features

This project implements a subset of the features of quora:

### Questions

Users can ask new questions, edit their questions, delete questions they made, view a list of all questions, view individual question threads, and view all the questions asked by a particular user.

### Answers and Comments

Users can answer questions, edit their answers, and delete their answers. Users can view all answers in response to a question by navigating to the page for that question.

Similarly, users can comment on answers, edit their comments, and delete their comments. Users can view all comments in response to an answer on the corresponding question page.

Users cannot view answers and comments on their own, since it does not make sense to view them out of context of the question they are in response to.

### Tags

Users can tag questions they own, and delete tags on questions they own. Users can view all questions that have a particular tag, and view a list of all tags. Users can click on these tags to navigate between tag catagories.

### Search

Users can search the bodies and titles of questions, and view a list of all questions that satisfy the search parameters.

### Users

As a prerequisite for the project, users can register an account, sign in, and access protected routes that require authentication.
