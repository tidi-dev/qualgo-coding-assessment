import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository {
  constructor(protected prisma: PrismaService) {}
}
