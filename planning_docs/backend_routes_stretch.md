### Search for all of the questions that fulfill an AND or OR operation for a particular set of tags.
SOURCE: https://helpcenter.veeam.com/docs/backup/em_rest/query_and_or.html?ver=110

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/questions/tags?tag1=chemistry;tag2=physics,tag3=shakespeare
  * Body: 
    ```json
    {
      "Tags": 
        {
          "tag1": "Chemistry",
          "tag2": "Physics",
          "tag3": "Shakespeare"
        }
    }
    ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "Questions": [
        {
          "id": 16,
          "askerId": 13,
          "title:" "Does escape velocity apply only to planets?"  
          "Body:" "It seems like electrons might have an escape velocity, too."
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Tags": 
            { 
              "tagName": ["Physics", "Chemistry"]
            }
          }, 
          {
          "id": 38,
          "askerId": 13,
          "title:" "Who asked the question, shall I compare thee to a summers day?"  
          "Body:" "Is it Shakespeare?"
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Tags": { 
            "tagName": ["Shakespeare"]
          }
        }
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
      "message": "No question matches the specified criteria",
      "statusCode": 404,
    }
    ```