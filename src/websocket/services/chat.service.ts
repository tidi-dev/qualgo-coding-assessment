import { Injectable } from '@nestjs/common';

import { MessageService } from '@/message/message.service';
import { CreateMessageDto } from '@libs-common/dtos';
import { SocketEventEnum } from '@libs-common/enums';
import { ListAllMessageResponseDto } from '@libs-common/responses';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(private messageService: MessageService) {}

  async getMessagesInRoom(
    room_code: string,
  ): Promise<ListAllMessageResponseDto[]> {
    return this.messageService.getMessagesInRoom(room_code);
  }

  async saveMessage(dto: CreateMessageDto) {
    return this.messageService.create(dto);
  }

  async deleteMessage(
    socket: Socket,
    messageId: string,
    roomCode: string,
  ): Promise<void> {
    try {
      await this.messageService.deleteMessage({
        user_id: socket.data.user.sub,
        message_id: messageId,
        room_code: roomCode,
      });
    } catch (error) {
      socket.emit(SocketEventEnum.SYSTEM_MESSAGE, {
        message: `Error ${messageId} deleted`,
        sender: 'System',
      });

      return;
    }

    socket.emit(SocketEventEnum.SYSTEM_MESSAGE, {
      message: `Message ${messageId} deleted`,
      sender: 'System',
    });
  }

  async sendMessage(
    socket: Socket,
    content: string,
    roomCode: string,
  ): Promise<void> {
    if (!content.trim()) {
      return;
    }

    await this.messageService.create({
      user_id: socket.data.user.sub,
      room_code: roomCode,
      content,
    });

    socket.broadcast.to(roomCode).emit(SocketEventEnum.SEND_MESSAGE, {
      [socket.data.user.username]: content,
    });
  }
}
