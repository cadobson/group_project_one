# API-Routes

## Generic Route Information

Description of what the route does

* Require Authentication: true/false
* Request
  * Method: GET/POST/PUT/DELETE
  * URL: /api/whatevertheurlis
  * Body:

    ```json
    {
      "whateverTag": "whateverValue",
    }
    ```

* Successful Response
  * Status Code: 200/404/500/whatever
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "whateverTag": "whateverValue",
    }
* Error response: Description of why it failed
  * Status Code: 200/404/500/whatever
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Why it failed",
      "statusCode": 403,//or whatever
      "errors": {
        "email": "why this one thing failed"
      }
    }
    ```

## User Session

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "username": "JSmith",
      "email": "john.smith@gmail.com",
      "profileImg": "https://www.imgur.com/image.png"
    }
    ```
  * Error Response: No user logged in
    * Status Code: 403
    * Headers:
      * Content-Type: application/json
    * Body:

      ```json
      {
        "message": "No user logged in",
        "statusCode": 403
      }
      ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JSmith",
      "profileImg": "https://www.imgur.com/image.png",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "username": "Username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "username": "JSmith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Invalid username",
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "password": "Password is required",
      }
    }
    ```

## Questions

### Get all Questions

Returns all questions in no particular order

* Require Authentication: false
* Request
  * Method: GET/
  * URL: /api/questions
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Questions": [
        {
          "id": 1,
          "Asker": {
            "askerId": 1,
            "askerName": "John Smith",
            "askerProfileImg": "https://www.imgur.com/image.png"
          },
          "title": "Why does existence exist?",
          "body": "To elaborate, why is there something rather than nothing?",
          "createdAt": "2023-02-19 20:30:45",
          "updatedAt": "2023-02-19 20:35:45"
        },
      ]
    }
    ```

### Get details of a Question from an id

Returns the details of a question specified by its id

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/questions/:questionId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "Asker": {
        "askerId": 1,
        "askerName": "John Smith",
        "askerProfileImg": "https://www.imgur.com/image.png"
      },
      "title": "Why does existence exist?",
      "body": "To elaborate, why is there something rather than nothing?",
      "createdAt": "2023-02-19 20:30:45",
      "updatedAt": "2023-02-19 20:35:45",
      "Answers": [
        {
          "id": 1,
          "body": "It is a mystery. Nobody knows.",
          "Answerer": {
            "answererId": 2,
            "answererName": "Bohn Bmith",
            "answererProfileImg": "https://www.imgur.com/image.png"
          },
          "createdAt": "2023-02-19 20:30:45",
          "updatedAt": "2023-02-19 20:35:45",
          "Comments": [
            {
              "id": 1,
              "body": "This is not true. Existence is an elaborate government conspiracy, like birds and the IRS.",
              "createdAt": "2023-02-19 20:30:45",
              "updatedAt": "2023-02-19 20:35:45",
              "Commenter": {
                "commenterId": 2,
                "commenterName": "Cohn Cmith",
                "commenterProfileImg": "https://www.imgur.com/image.png"
              },
            }
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a question with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Question could not be found",
      "statusCode": 404
    }
    ```

### Get the title and body of a question

Returns the title and body of a question without any of the child answers or comments

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/questions/:questionId/truncated
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "Asker": {
        "askerId": 1,
        "askerName": "John Smith",
        "askerProfileImg": "https://www.imgur.com/image.png"
      },
      "title": "Why does existence exist?",
      "body": "To elaborate, why is there something rather than nothing?",
      "createdAt": "2023-02-19 20:30:45",
      "updatedAt": "2023-02-19 20:35:45",
    }
    ```

### Get all questions by a user by user id

Gets all of the questions that a particular user has asked.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/user/:userId/questions
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Asker": {
        "askerId": 1,
        "askerName": "John Smith",
        "askerProfileImg": "https://www.imgur.com/image.png"
      },
      "Questions": [
        {
          "id": 1,
          "title": "Why does existence exist?",
          "body": "To elaborate, why is there something rather than nothing?",
          "createdAt": "2023-02-19 20:30:45",
          "updatedAt": "2023-02-19 20:35:45"
        },
      ]
    }
    ```

* Error response: No user with that Id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User could not be found",
      "statusCode": 404
    }
    ```

### Post a new question

Description of what the route does

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/questions
  * Body:

    ```json
    {
      "title": "Why does existence exist?",
      "body": "To elaborate, why is there something rather than nothing?",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "title": "Why does existence exist?",
      "body": "To elaborate, why is there something rather than nothing?",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "title": "Title cannot be null or empty string",
        "title": "Title must be under 256 characters",
        "body": "Body must be under 10000 characters",
      }
    }
    ```

### Edit a question specified by its id

Description of what the route does

* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/questions/:questionId
  * Body:

    ```json
    {
      "title": "Why doesn't existence exist?",
      "body": "To elaborate, why is there nothing rather than something?",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "title": "Why doesn't existence exist?",
      "body": "To elaborate, why is there nothing rather than something?",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "title": "Title cannot be null or empty string",
        "title": "Title must be under 256 characters",
        "body": "Body must be under 10000 characters",
      }
    }
    ```

## Delete a question

Delete a question that

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/questions/:questionId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Question couldn't be found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Question couldn't be found",
      "statusCode": 404
    }
    ```

## Answers and Comments

### Get a Comment based Comment Id
* Returns a comment based on the Comment Id

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/comments/:commentId
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "id": 1,
      "answerId": 1,
      "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates.",
      "Commenter": {
        "commenterId": 2,
        "commenterName": "Cohn Cmith",
        "commenterProfileImg": "https://www.imgur.com/image.png"
      },
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
    }
    ```

* Error response: Couldn't find a comment with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Comment couldn't be found",
      "statusCode": 404
    }
    ```

### Get all Answers belonging to a user based on userID
* Returns all the answers written based on the UserId

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/answers/userId
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "Answers": [
        {
          "id": 1,
          "questionId": 1,
          "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates.",
          "Answerer": {
            "askerId": 1,
            "askerName": "John Smith",
            "askerProfileImg": "https://www.imgur.com/image.png"
          },
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
        }
      ]
    }
    ```

### Get all Answers of the Current User

Returns all the answers written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/answers/current
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json

    {
      "Answers":[
        {
          "id": 1,
          "questionId": 1,
          "userId": 1,
          "body": "Human evolution is the lengthy process of change by which people originated from apelike ancestors. ",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
        }
      ]

    }
    ```

### Get all Comments of the Current User

Returns all the comments written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/comments/current
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "Comments":[
        {
          "id": 1,
          "questionId": 1,
          "answerId": 1,
          "body": "Scientific evidence shows that the physical and behavioral traits shared by all people originated from apelike ancestors and evolved over a period of approximately six million years. ",
        }
    ]
    }
    ```

### Create an Answer for a question based on the question Id
Create and return a new answer for a question specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/questions/:questionId
  * Body:

    ```json
    {
      "answers": "Human evolution is the lengthy process of change by which people originated from apelike ancestors.",
    }
    ```
* Successful Response
  * Status Code: 201
  * Headers:
      * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "questionId": 1,
      "answers": "Human evolution is the lengthy process of change by which people originated from apelike ancestors.",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "answers": "answer text is required",
      }
    }
    ```
* Error response: Couldn't find a question with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "question couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Comment for an answer based on the answers Id
Create and return a new comment for an answer specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/answers/:answerId
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "answers": "Human evolution is the lengthy process of change by which people originated from apelike ancestors.",
    }
    ```
* Successful Response
  * Status Code: 201
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "id": 1,
      "answerId": 1,
      "questionId": 1,
      "answers": "Human evolution is the lengthy process of change by which people originated from apelike ancestors.",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "answer text is required",
      }
    }
    ```
* Error response: Couldn't find an question with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "answer couldn't be found",
      "statusCode": 404
    }
    ```

### Edit an Answer
Update and return an existing answer.

* Require Authentication: true
  * Require proper authorization: Answers must belong to the current user
* Request
  * Method: PUT
  * URL: /api/answers/:answerId
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "body": "new answers here!",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "id": 1,
      "questionId": 1,
      "answers": "new answers",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "answers": "body text is required",
      }
    }
    ```
* Error response: Couldn't find a question with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "message": "answer couldn't be found",
      "statusCode": 404
    }
    ```

### Edit a comment

Update and return an existing comment.

* Require Authentication: true
  * Require proper authorization: Comments must belong to the current user
* Request
  * Method: PUT
  * URL: /api/comments/:commentId
  * Headers:
      * Content-Type: application/json
  * Body:
  ``` json
  {
    "body": "new comments here!",
  }
  ```

* Successful Response

* Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "id": 1,
      "questionId": 1,
      "comments": "I think that is right",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "comments": "body text is required",
      }
    }
    ```
* Error response: Couldn't find an answer with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "message": "comment couldn't be found",
      "statusCode": 404
    }
    ```

### Delete an Answer
Delete an existing answer

* Require Authentication: true
*   Require proper authorization: Answers must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/answers/:answerId
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```
* Error response: Couldn't find an answer with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "message": "Answer couldn't be found",
      "statusCode": 404
    }
    ```


### Delete a Comment
Delete an existing comment

* Require Authentication: true
  * Require proper authorization: comment must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/comments/:commentId
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a comment with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Comment couldn't be found",
      "statusCode": 404
    }
    ```

### Get an Answer based Answer Id
Returns a particular Answer based on the Answer Id

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/answers/:answerId
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "id": 1,
      "questionId": 1,
      "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates.",
      "Answerer": {
        "answererId": 2,
        "answererName": "Bohn Bmith",
        "answererProfileImg": "https://www.imgur.com/image.png"
      },
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "Comments": [
        {
          "id": 1,
          "body": "This is a comment to the answer: human evolution, the process by which human beings developed on Earth from now-extinct primates.",
          "Commenter": {
            "commenterId": 2,
            "commenterName": "Cohn Cmith",
            "commenterProfileImg": "https://www.imgur.com/image.png"
          },
        }
      ]
    }
    ```
* Error response: Couldn't find an answer with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "message": "Answer couldn't be found",
      "statusCode": 404
    }
    ```

### Get the Title and Body of an Answer based Answer Id

Returns a particular Answer based on the Answer Id without any of the comments

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/answers/:answerId/truncated
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "id": 1,
      "questionId": 1,
      "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates.",
      "Answerer": {
        "answererId": 2,
        "answererName": "Bohn Bmith",
        "answererProfileImg": "https://www.imgur.com/image.png"
      },
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
    }
    ```
* Error response: Couldn't find an answer with the specified id
  * Status Code: 404
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "message": "Answer couldn't be found",
      "statusCode": 404
    }
    ```

### Get all Comments belonging to a user based on userID
* Returns all the answers/comments written based on the UserId

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/answers/:userId
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "Commenter": {
        "askerId": 1,
        "askerName": "John Smith",
        "askerProfileImg": "https://www.imgur.com/image.png"
      },
      "Comments": [
        {
        "id": 1,
        "answerId": "1",
        "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates. ",
        }
      ],
    }
    ```

## Search Questions

### Search for all of the questions that have a particular tag

Search for all of the questions that have a particular tag, specified by tag name.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/questions/tags/:tagName
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Tags":
        {
          "id": 1,
          "TagName": "Shakespeare",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        },
      "Questions": [
        {
          "id": 1,
          "askerId": 1,
          "title:" "To be or not to be?"
          "Body:" "Is this really a question?"
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        },
        {
          "id": 17,
          "askerId": 13,
          "title:" "Heavy is the head that wears the crown. Who said this?"
          "Body:" "Is this King Lear? Why doesn't he take the crown off?"
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",

        },
        {
          "id": 231,
          "askerId": 136,
          "title:" "What does it mean to beware the Ides of March?"
          "Body:" "I think this means the 15th of March"
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
      ]
    }
    ```

* Error response: There are no tags with this tagId.
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Tag does not exist",
      "statusCode": 403,
    }
    ```

## Tags

### Create a tag for a question they made

Has the following effect: if the proposed tag does not exist in the Tags table, the tag is added. Then it takes the tag from the table and creates an association with the question.

* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/questions/:questionId/tags
  * Body:
    ```json
    {
      "tagName": "Physics",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "Tags":
        {
          "id": 1,
          "tagName": "Physics",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        },
        "Question":
        {
          "id": 16,
          "askerId": 13,
          "title:" "What is the definition of escape velocity?"
          "Body:" "I think it's when gravitional potential energey equals kinetic energy"
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
    }
    ```
* Error response:
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "User does not own the question to-be-tagged",
      "statusCode": 403,
    }
    ```
### Edit a tag for a question they made

* Require Authentication: True
* Request
  * Method: PUT
  * URL: /api/tags/:tagId
  * Body:
    ```json
    {
      "tagName": "Chemistry",
    }
    ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
    "Tags":
      {
        "id": 11,
        "tagName": "Chemistry",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
    }
    ```
* Error response:
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Tag does not exist",
      "statusCode": 404,
    }
    ```
    
### Delete a tag for a question they made

Has the effect of deleting the association between a question and a tag. The tag is deleted if it is the last question that has that particular tag.

* Require Authentication: True
* Request
  * Method: DELETE
  * URL: /api/questions/:questionId/:tagName
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Tag successfully deleted",
      "statusCode": 200
    }
    ```

* Error response:
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Question does not exist",
      "statusCode": 404,
    }
    ```

* Error response:
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Tag does not exist",
      "statusCode": 404,
    }
    ```

### View all the tags for a particular question

* Require Authentication: False
* Request
  * Method: GET
  * URL: /api/questions/:questionId/tags
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
    "Tags":
      [
        {
        "id": 1,
        "tagName": "Physics",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
        },
        {
        "id": 3,
        "tagName": "Chemistry",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
        },
      ],
    }
    ```

* Error response:
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Question does not have any tags",
      "statusCode": 404,
    }
    ```

# Voting

# Comments on Comments
