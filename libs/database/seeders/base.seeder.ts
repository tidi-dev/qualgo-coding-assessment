import { PrismaClient } from '@prisma/client';

export class BaseSeeder {
  constructor(protected prisma: PrismaClient = new PrismaClient()) {}
}
