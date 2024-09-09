import { ChatRoomService } from '@/chat-room/chat-room.service';
import { MessageService } from '@/message/message.service';
import { MessageRepository } from '@libs-common/repositories';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChatRoomService, MessageService, MessageRepository],
})
export class ChatRoomModule {}
