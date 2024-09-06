import { BaseSeeder } from './base.seeder';
import * as bcrypt from 'bcrypt';

export class UserSeeder extends BaseSeeder {
  async seedData() {
    const hashedPassword = await this.hashPassword();

    const pTasks = [];

    for (let index = 0; index < 3; index++) {
      pTasks[index] = this.prisma.user.create({
        data: {
          username: `user_${index + 1}`,
          password: hashedPassword,
        },
      });
    }

    await this.prisma.$transaction(pTasks);
  }

  private async hashPassword(): Promise<string> {
    return bcrypt.hashSync('p@ssword', 10);
  }
}
