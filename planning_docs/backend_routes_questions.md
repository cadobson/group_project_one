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
    ```

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
          "comments": [
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

### Get all questions by a user by user id

Description of what the route does

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/questions/user/:userId
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
  * Status Code: 200
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

## Generic Route Information

Description of what the route does

* Require Authentication: true/false
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

* Error response: Description of why it failed
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
