import {
  ChatRoomRepository,
  MessageRepository,
} from '@libs-common/repositories';
import { ExistingRoomConstraint } from '@libs-core/validators';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageRepository,
    ChatRoomRepository,
    ExistingRoomConstraint,
  ],
})
export class MessageModule {}
