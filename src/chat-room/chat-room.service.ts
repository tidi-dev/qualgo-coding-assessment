import { MessageService } from '@/message/message.service';
import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
export class ChatRoomService {
  private room_code = 'room_1';

  @WebSocketServer() server: Server;

  constructor(private readonly messageService: MessageService) {}

  async joinRoom(
    client: Socket,
    // server: Server,
    username: string,
  ): Promise<void> {
    client.join(this.room_code);

    // Message to the user who joined
    client.emit('systemMessage', {
      message: 'You joined the room',
      sender: 'System',
    });

    // Broadcast to all others in the room
    client.to(this.room_code).emit('systemMessage', {
      message: `${username} joined the room`,
      sender: 'System',
    });

    // Load previous messages from the database and send to the joining user
    const messages = await this.messageService.getMessagesInRoom(
      this.room_code,
    );
    console.log('🚀 ~ messages:', messages);
    client.emit('joinedRoom', { messages });
  }
}
