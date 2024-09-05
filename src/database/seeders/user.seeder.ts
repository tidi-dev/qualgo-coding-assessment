import { BaseSeeder } from './base.seeder';

export class UserSeeder extends BaseSeeder {
  async seedData() {
    const hashedPassword = await this.hashPassword();

    const pTasks = [];

    for (let index = 0; index < 3; index++) {
      pTasks[index] = this.prisma.user.create({
        data: {
          username: `user${index + 1}`,
          password: hashedPassword,
        },
      });
    }

    await this.prisma.$transaction(pTasks);
  }
}
