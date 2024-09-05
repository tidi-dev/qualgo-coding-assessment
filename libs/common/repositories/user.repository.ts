import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository {
  async findByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
