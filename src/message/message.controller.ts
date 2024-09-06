import { MessageService } from '@/message/message.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async saveMessage(@Req() req, @Body() content: string) {
    return this.messageService.saveMessage(content, req.user.sub);
  }
  @Get()
  async getMessages() {
    return this.messageService.getMessages();
  }
}
