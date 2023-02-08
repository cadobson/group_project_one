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

# Answers and Comments

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
      "Comment":
        {
          "id": 1,
          "answerId": 1,
          "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates. ",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
        }

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
  * URL: /api/users/:userId/answers
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
          "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates. ",
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
  * URL: /api/answers/answerId
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "Answers":
        {
          "id": 1,
          "questionId": 1,
          "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates. ",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
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
      "message": "Answer couldn't be found",
      "statusCode": 404
    }
    ```

### Get all Comments belonging to a user based on userID
* Returns all the answers/comments written based on the UserId

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/users/:userId/comments
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
      * Content-Type: application/json
  * Body:
    ``` json
    {
      "Comments": [
        {
        "id": 1,
        "answerId": "1",
        "body": "human evolution, the process by which human beings developed on Earth from now-extinct primates. ",
        }
      ],
    }
    ```
