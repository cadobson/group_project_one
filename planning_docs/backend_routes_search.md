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

## Search

### Search for questions based on tag

* Returns all the question/answers/comments based on tags
* Require Authentication: False

* Request

* Method: GET
* URL: /api/tags/:tags
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
        "questionId": 1,
        "firstName": "demo",
        "lastName": "user",
        "body": "bla bla bla bla ",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36" ,

        "Answer": {[
          "firstName": "demo1",
          "lastName": "user1",

          "body": "hello hello hello hello ",
          "Comments":{
            "firstName": "demo2",
            "lastName": "user2",

            "body": "hey hey hey hey" 
        }
        ]
        }
      }
    ]
  }
  ```