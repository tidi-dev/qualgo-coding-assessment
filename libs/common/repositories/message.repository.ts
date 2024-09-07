import {
  CreateMessageDto,
  DeleteMessageDto,
  GetMessageDto,
} from '@libs-common/dtos';
import { ForbiddenExceptionMessageEnum } from '@libs-common/enums';
import {
  ListAllMessageResponseDto,
  ListMessageResponseDto,
} from '@libs-common/responses';
import { ForbiddenException, Injectable } from '@nestjs/common';
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
      where: { room_code },
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

  async listAll(room_code: string): Promise<ListAllMessageResponseDto[]> {
    return this.prisma.message.findMany({
      where: { room_code },
      select: {
        content: true,
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async deleteMessage({
    user_id,
    message_id,
  }: DeleteMessageDto): Promise<void> {
    try {
      await this.prisma.message.delete({
        where: {
          id_user_id: {
            id: message_id,
            user_id,
          },
        },
      });
    } catch (error) {
      throw new ForbiddenException(
        ForbiddenExceptionMessageEnum.NOT_ALLOWED_TO_DELETE_MESSAGE,
      );
    }
  }
}
