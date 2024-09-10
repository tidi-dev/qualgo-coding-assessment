# How to test Real Time via Socket

## Socket url: `ws://localhost:3000`

### The default chat room code is "room_1"

There are some events that can be used for testing

- `connected`: client successfully establishes a connection to the Socket.IO server.
- `system_message`: Sent by the server to communicate system-wide events
- `join_room`: Client joins a specific chat room, allowing them to receive messages from that room.
- `leave_room`: Client leaves a specific chat room, stopping them from receiving further messages from that room.
- `send_message`: client sends a message to a chat room

### How to setup Socketio on Postman

- After import `Qualgo API.postman_collection.json` into Postman -> Add new request and choose **Socket.IO**

<img width="238" alt="image" src="https://github.com/user-attachments/assets/37e0f07a-0530-456d-bd86-b3f9b3614832">

- Enter Socket url `ws://localhost:3000`

- Click on tab `Events` and add all events above and enable Listen

<img width="501" alt="Screenshot 2024-09-10 at 08 16 01" src="https://github.com/user-attachments/assets/ce60efdf-05c9-4e43-8109-89c4b9d5e33f">

- Click on tab `Headers` and add token
> Remember to execute the login first and set token ({{token1}}, etc)


<img width="904" alt="Screenshot 2024-09-10 at 08 17 37" src="https://github.com/user-attachments/assets/2f0f40cf-883e-45d0-8374-00463c1c592c">


> Note: You can setup 3 tabs of socketio for 3 default account in database
<img width="302" alt="image" src="https://github.com/user-attachments/assets/99d31c60-d360-439c-8325-b7c8583701d8">

---

## Connected event

```json
# When user successfully connected to server. User will received a welcomed message from system

['connected']{"message":"Welcome user_1 to the server"}
```

---

## Join room event

```json
# When join room (`room_1`). User will received a notification message from system and also broadcast to all users in the room different notification message

# User A join room
['system_message']{"message":"You joined the room","sender":"System"}

# Other Users in room
['system_message']{"message":"user_2 joined the room","sender":"System"}

# After user A joins a room, the system will cache the user's ID (decoded from the token) in Redis and then retrieve all the messages from that room.

# If user A already joined the room, the system will not cache the user's ID in Redis again and send a notification message.
['system_message']{"message":"You are already in room room_1","sender":"System"}
```

> **_NOTE:_** Users who are not in the room will not see the chat messages.

---

## Leave room event

```json
# When user leaves room. User will received a notification message from system and also broadcast to all users in the room different notification message

# User A join room
['system_message']{"message":"You left the room room_1","sender":"System"}

# Other Users in room
['system_message']{"message":"user_1 left the room","sender":"System"}

# After user A left a room, the system will remove the user's ID (decoded from the token) in Redis.
```

---

## Send message event

```json
# When user send message. The message will broadcast to all users in the room

# Other Users in room
['send_message']{"user_1":"aloha"}
```

---

## Delete message event

```json
# When user delete message. The notification message will be sent to that user

# Failed to delete message
['system_message']{"message":"Error 123123123 deleted","sender":"System"}

# successfully to delete message
['system_message']{"message":"Message 123123123 deleted","sender":"System"}
```
