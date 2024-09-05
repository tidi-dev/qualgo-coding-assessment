import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class BaseSeeder {
  constructor(protected prisma: PrismaClient = new PrismaClient()) {}

  protected async hashPassword(): Promise<string> {
    return bcrypt.hash('admin@123', 10);
  }
}
