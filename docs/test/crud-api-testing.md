# How to test locally

API: `http://localhost:3000`

SWAGGER: `http://localhost:3000/api`

Postman Collection: `Qualgo API.postman_collection.json`

## For testing via Restful API
After finishing the setup process, there are 3 accounts that can be used for testing.

```json
{
  "username": "user_1",
  "password": "p@ssword"
},
{
  "username": "user_2",
  "password": "p@ssword"
},
{
  "username": "user_3",
  "password": "p@ssword"
}

# The default chat room code is "room_1"
```

In order to test sending and retrieving message, it is required to login first

API: POST `http://localhost:3000/auth/login`

PAYLOAD

```json
{
    "username": "user_1",
    "password": "p@ssword"
}
```
---

RESPONSE
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzI1NTU3Njg3LCJleHAiOjE3MjU1NTgyODd9.65aebgj8VOq_mKMryUbHg23sPm79wAY9vsphHY8yZcI"
}
```

---

## Sending message

API: POST `http://localhost:3000/messages`

PAYLOAD
```json
{
    "room_code": "room_1",
    "content": "from user 1 new"
}
```

---

## Fetch messages

API: GET `http://localhost:3000/messages?room_code=room_1&page=1`

RESPONSE
```json
[
    {
        "id": "c4be10b2-96ab-49e5-8d62-985a18d3fdc0",
        "content": "from user 1 new",
        "created_at": "2024-09-06T12:28:07.047Z",
        "user": {
            "username": "user_1"
        }
    },
    {
        "id": "9399379d-ae1d-460f-bcef-91c7916f5136",
        "content": "from user 2 new",
        "created_at": "2024-09-06T12:20:35.203Z",
        "user": {
            "username": "user_2"
        }
    }
]

# By default, API will response only 15 messages per page
```

---

## Delete messages

API: DELETE `http://localhost:3000/messages`

PAYLOAD
```json
{
    "user_id": "5aebe15b-a6b8-47e8-ad4d-eb132cdb705a",
    "message_id": "5aebe15b-a6b8-47e8-ad4d-eb132cdb705a",
    "room_code": "room_1"
}
```
