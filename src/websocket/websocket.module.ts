import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [MessageModule],
  providers: [MessageService],
})
export class WebsocketModule {}
