import { MessageService } from '@/message/message.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { PayloadDto } from '@libs-common/dtos';
import { SocketEventEnum } from '@libs-common/enums';
import { ListAllMessageResponseDto } from '@libs-common/responses';
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { Socket } from 'socket.io';

@Injectable()
export class RoomService {
  private readonly logger: Logger = new Logger(RoomService.name);

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly messageService: MessageService,
  ) {}

  private async addUser(roomCode: string, user: PayloadDto): Promise<void> {
    await this.redis.sadd(roomCode, user.sub);
  }

  private async removeUser(roomCode: string, user: PayloadDto): Promise<void> {
    await this.redis.srem(roomCode, user.sub);
  }

  private async isMember(roomCode: string, user: PayloadDto): Promise<boolean> {
    return !!(await this.redis.sismember(roomCode, user.sub));
  }

  private getUser(socket: Socket): PayloadDto {
    return socket.data.user;
  }

  private async handleJoinRoomSystemtMessage(
    socket: Socket,
    roomCode: string,
    user: PayloadDto,
  ): Promise<void> {
    // Message to the user who joined
    socket.emit(SocketEventEnum.SYSTEM_MESSAGE, {
      message: 'You joined the room',
      sender: 'System',
    });

    // Broadcast to all others in the room
    socket.to(roomCode).emit(SocketEventEnum.SYSTEM_MESSAGE, {
      message: `${user.username} joined the room`,
      sender: 'System',
    });

    await this.addUser(roomCode, user);
    this.logger.log(`User ${user.username} joined room ${roomCode}`);
  }

  private async handleLeaveRoomSystemtMessage(
    socket: Socket,
    roomCode: string,
    user: PayloadDto,
  ): Promise<void> {
    socket.emit(SocketEventEnum.SYSTEM_MESSAGE, {
      message: `You left the room ${roomCode}`,
      sender: 'System',
    });

    // Broadcast to all others in the room
    socket.to(roomCode).emit(SocketEventEnum.SYSTEM_MESSAGE, {
      message: `${user.username} left the room`,
      sender: 'System',
    });

    await this.removeUser(roomCode, user);
    this.logger.log(`User ${user.username} left room ${roomCode}`);
  }

  private fetchMessagesByRoomCode(
    roomCode: string,
  ): Promise<ListAllMessageResponseDto[]> {
    return this.messageService.getMessagesInRoom(roomCode);
  }

  async joinRoom(socket: Socket, roomCode: string): Promise<void> {
    const user = this.getUser(socket);

    const isMember = await this.isMember(roomCode, user);

    if (isMember) {
      socket.emit(SocketEventEnum.SYSTEM_MESSAGE, {
        message: `You are already in room ${roomCode}`,
        sender: 'System',
      });

      return;
    }

    socket.join(roomCode);

    this.handleJoinRoomSystemtMessage(socket, roomCode, user);

    // Load previous messages from the database and send to the joining user
    const messages = await this.fetchMessagesByRoomCode(roomCode);

    messages.forEach((message) => {
      socket.emit(SocketEventEnum.JOIN_ROOM, {
        [message.user.username]: message.content,
      });
    });
  }

  async leaveRoom(socket: Socket, roomCode: string): Promise<void> {
    const user = this.getUser(socket);

    await this.handleLeaveRoomSystemtMessage(socket, roomCode, user);
  }
}
