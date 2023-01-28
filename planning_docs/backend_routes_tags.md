# Tags

## 3: Search Questions

### Logged-out users can...

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

## 4: Tags

## Logged-in users can...

### Create a tag for a question they made

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
        "Questions": 
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
  * Method: POST
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

* Require Authentication: True
* Request
  * Method: DELETE
  * URL: /api/tags/:tagsId 
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Question successfully deleted",
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
      "message": "Tag does not exist",
      "statusCode": 404,
    }
    ```

## Logged-out users can...

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