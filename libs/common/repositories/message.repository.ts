import { CreateMessageDto, GetMessageDto } from '@libs-common/dtos';
import { ListMessageResponseDto } from '@libs-common/responses';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class MessageRepository extends BaseRepository {
  async createMessage({
    room_code,
    content,
    user_id,
  }: CreateMessageDto): Promise<void> {
    await this.prisma.message.create({
      data: {
        content,
        user: { connect: { id: user_id } },
        room: { connect: { code: room_code } },
      },
    });
  }

  async listMessages({
    room_code,
    page,
    limit,
  }: GetMessageDto): Promise<ListMessageResponseDto[]> {
    const skip = (page - 1) * limit;

    return this.prisma.message.findMany({
      where: { room_code: room_code },
      select: {
        id: true,
        content: true,
        created_at: true,
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      skip,
      take: +limit,
    });
  }
}
