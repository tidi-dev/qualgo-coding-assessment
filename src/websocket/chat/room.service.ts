import { ChatService } from '@/websocket/chat/chat.service';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class RoomService {
  constructor(private readonly chatService: ChatService) {}

  async joinRoom(
    client: Socket,
    roomName: string,
    server: Server,
    username: string,
  ): Promise<void> {
    console.log('🚀 ~ roomName:', roomName);
    client.join('room_1');

    // Message to the user who joined
    client.emit('systemMessage', {
      message: 'You joined the room',
      sender: 'System',
    });

    // Broadcast to all others in the room
    client.to('room_1').emit('systemMessage', {
      message: `${username} joined the room`,
      sender: 'System',
    });

    // Load previous messages from the database and send to the joining user
    const messages = await this.chatService.getMessagesInRoom('room_1');
    console.log('🚀 ~ messages:', messages);
    client.emit('joinedRoom', { messages });
  }
}
