import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(content: string, user_id: string) {
    return this.prisma.message.create({
      data: { content, user_id } as any,
    });
  }

  async getMessages() {
    return this.prisma.message.findMany({
      include: { user: true },
      orderBy: { created_at: 'asc' },
    });
  }
}
