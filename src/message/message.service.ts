import { CreateMessageDto, GetMessageDto } from '@libs-common/dtos';
import { MessageRepository } from '@libs-common/repositories';
import { ListMessageResponseDto } from '@libs-common/responses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageService {
  private readonly limit_per_page: number;

  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly configService: ConfigService,
  ) {
    this.limit_per_page = configService.get<number>('LIMIT_PER_PAGE');
  }

  async create(dto: CreateMessageDto): Promise<void> {
    await this.messageRepository.createMessage(dto);
  }

  async getMessages(query: GetMessageDto): Promise<ListMessageResponseDto[]> {
    return this.messageRepository.listMessages({
      ...query,
      limit: this.limit_per_page,
    });
  }
}
