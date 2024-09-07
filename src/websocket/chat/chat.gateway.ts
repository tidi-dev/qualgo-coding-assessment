import { MessageService } from '@/message/message.service';
import { ChatService } from '@/websocket/chat/chat.service';
import { ConnectionService } from '@/websocket/chat/connection.service';
import { RoomService } from '@/websocket/chat/room.service';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChatGateway.name);

  @WebSocketServer() server: Server;
  private users = new Map<string, string>(); // Store socketId and username mapping

  constructor(
    private messageService: MessageService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly chatService: ChatService,
    private readonly connectionService: ConnectionService,
    private readonly roomService: RoomService,
  ) {}

  async handleConnection(socket: Socket) {
    const token = socket.handshake.headers.token as string;
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      if (!decoded) {
        throw new WsException('Invalid token');
      }

      socket.data.user = decoded;

      this.connectionService.addUser(socket.id, decoded.username);
      this.logger.log(`Client connected: ${socket.id}`);
    } catch (e) {
      this.logger.error(e);
      socket.disconnect();
      this.logger.error(`Client disconnected: ${socket.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    const username = this.connectionService.getUsername(client.id);
    this.connectionService.removeUser(client.id);
    this.server.emit('userDisconnected', { username });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, roomName: string) {
    const username = this.connectionService.getUsername(client.id);
    if (!username) {
      client.emit('error', { message: 'User not authenticated' });
      return;
    }

    // this.server.emit('receiveMessage', { user: username });

    await this.roomService.joinRoom(client, roomName, this.server, username);
  }

  // @SubscribeMessage('sendMessage')
  // async handleMessage(
  //   @MessageBody() content: string,
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   const user = socket.data.user;
  //   await this.messageService.create({
  //     content,
  //     user_id: user.sub,
  //     room_code: 'room_1',
  //   });

  //   this.server.emit('receiveMessage', { content, user: user.username });
  // }

  // @SubscribeMessage('getMessages')
  // async getMessages() {
  //   const messages = await this.messageService.getMessages({
  //     room_code: 'room_1',
  //   });
  //   this.server.emit('receiveMessage', { content: 'ok' });
  //   return messages.forEach((msg) => {
  //     this.server.emit('receiveMessage', {
  //       content: msg.content,
  //       created_at: msg.created_at,
  //     });
  //   });
  // }
}
