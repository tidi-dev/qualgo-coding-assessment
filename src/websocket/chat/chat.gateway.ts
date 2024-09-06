import { MessageService } from '@/message/message.service';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChatGateway.name);

  @WebSocketServer() server: Server;

  constructor(
    private messageService: MessageService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(socket: Socket) {
    const token = socket.handshake.headers.token as string;
    try {
      const decoded = this.jwtService.verify(token);
      socket.data.user = decoded;
    } catch (e) {
      this.logger.error(e);
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
    console.log('Client disconnected');
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const user = socket.data.user;
    await this.messageService.saveMessage(content, user.sub);

    this.server.emit('receiveMessage', { content, user: user.username });
  }

  @SubscribeMessage('getMessages')
  async getMessages() {
    const messages = await this.messageService.getMessages();
    this.server.emit('receiveMessage', { content: 'ok' });
    return messages.forEach((msg) => {
      this.server.emit('receiveMessage', {
        content: msg.content,
        created_at: msg.created_at,
      });
    });
  }
}
