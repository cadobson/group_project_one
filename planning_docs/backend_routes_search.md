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
* URL: /api/search
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