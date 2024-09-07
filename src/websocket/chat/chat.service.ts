import { Injectable } from '@nestjs/common';

import { MessageRepository } from '@libs-common/repositories';
import { ListAllMessageResponseDto } from '@libs-common/responses';

@Injectable()
export class ChatService {
  constructor(private messageRepository: MessageRepository) {}

  async getMessagesInRoom(
    room_code: string,
  ): Promise<ListAllMessageResponseDto[]> {
    return this.messageRepository.listAll(room_code);
  }

  async saveMessage(user_id: string, room_code: string, content: string) {
    return this.messageRepository.createMessage({
      room_code,
      content,
      user_id,
    });
  }

  async deleteMessage(userId: string, messageId: string) {
    return this.messageRepository.deleteMessage(userId, messageId);
  }
}
