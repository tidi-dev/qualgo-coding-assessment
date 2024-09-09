import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MessageModule],
  providers: [],
})
export class WebsocketModule {}
