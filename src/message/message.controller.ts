import { MessageService } from '@/message/message.service';
import { CreateMessageDto, GetMessageDto } from '@libs-common/dtos';
import { ListMessageResponseDto } from '@libs-common/responses';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiCreatedResponse({ status: HttpStatus.CREATED })
  @Post()
  async saveMessage(@Req() req, @Body() dto: CreateMessageDto): Promise<void> {
    this.messageService.create({ ...dto, user_id: req.user.sub });
  }

  @ApiOkResponse({ type: ListMessageResponseDto, status: HttpStatus.OK })
  @Get()
  async getMessages(
    @Query() query: GetMessageDto,
  ): Promise<ListMessageResponseDto[]> {
    return this.messageService.getMessages(query);
  }
}
