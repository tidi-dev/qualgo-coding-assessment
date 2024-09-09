import { ChatService } from '@/websocket/services/chat.service';
import { RoomService } from '@/websocket/services/room.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { SocketEventEnum } from '@libs-common/enums';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import Redis from 'ioredis';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class BaseGateway {
  private readonly logger: Logger = new Logger(BaseGateway.name);

  @WebSocketServer()
  server: Server;

  protected roomCode = 'room_1';

  constructor(
    @InjectRedis() private readonly redis: Redis,

    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly roomService: RoomService,
    private readonly chatService: ChatService,
  ) {}

  async onModuleInit() {
    await this.redis.del(this.roomCode);
  }
  async connect(@ConnectedSocket() socket: Socket) {
    const token = socket.handshake.headers.token as string;

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      if (!decoded) {
        throw new WsException('Invalid token');
      }

      socket.data.user = decoded;

      socket.emit('connected', {
        message: `Welcome ${socket.data.user.username} to the server`,
      });
      this.logger.log(`Client connected: ${socket.id}`);
    } catch (e) {
      this.logger.error(e);
      socket.disconnect();
      this.logger.error(`Client disconnected: ${socket.id}`);
    }
  }

  async disconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage(SocketEventEnum.JOIN_ROOM)
  async joinRoom(@ConnectedSocket() socket: Socket) {
    await this.roomService.joinRoom(socket, this.roomCode);
  }

  @SubscribeMessage(SocketEventEnum.LEAVE_ROOM)
  async leaveRoom(@ConnectedSocket() socket: Socket) {
    await this.roomService.leaveRoom(socket, this.roomCode);
  }

  @SubscribeMessage(SocketEventEnum.SEND_MESSAGE)
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() content: string,
  ) {
    await this.chatService.sendMessage(socket, content, this.roomCode);
  }

  @SubscribeMessage(SocketEventEnum.DELETE_MESSAGE)
  async deleteMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() messageId: string,
  ) {
    await this.chatService.deleteMessage(socket, messageId, this.roomCode);
  }
}
