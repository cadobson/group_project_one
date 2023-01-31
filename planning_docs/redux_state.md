# Redux State

```json
  "session": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JSmith",
      "profileImg": "https://www.imgur.com/image.png",
      "token": ""
    }
  },
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
      ],
  "Question": {
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
    },
  "Answer": {},
  "Comment": {}
```
