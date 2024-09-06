import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class ChatRoomRepository extends BaseRepository {
  async isExistingRoom(code: string): Promise<boolean> {
    return !!(await this.prisma.chatRoom.findUnique({ where: { code } }));
  }
}
