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

## Questions
