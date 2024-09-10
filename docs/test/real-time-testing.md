# How to test Real Time via Socket

## Socket url: `ws://localhost:3000`

## The default chat room code is "room_1"

## For testing via Restful API

There are some events that can be used for testing

- `connected`: client successfully establishes a connection to the Socket.IO server.
- `system_message`: Sent by the server to communicate system-wide events
- `join_room`: Client joins a specific chat room, allowing them to receive messages from that room.
- `leave_room`: Client leaves a specific chat room, stopping them from receiving further messages from that room.
- `send_message`: client sends a message to a chat room

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
