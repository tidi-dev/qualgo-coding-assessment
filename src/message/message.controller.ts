import { MessageService } from '@/message/message.service';
import { CreateMessageDto, GetMessageDto } from '@libs-common/dtos';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiCreatedResponse({ status: HttpStatus.CREATED })
  @Post()
  async saveMessage(@Req() req, @Body() dto: CreateMessageDto): Promise<void> {
    this.messageService.create({ ...dto, user_id: req.user.sub });
  }

  @Get()
  async getMessages(@Query() query: GetMessageDto) {
    return this.messageService.getMessages(query);
  }
}
