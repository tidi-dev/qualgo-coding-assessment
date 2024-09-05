import { faker } from '@faker-js/faker';
import { BaseSeeder } from './base.seeder';

export class UserSeeder extends BaseSeeder {
  async seedData() {
    const hashedPassword = await this.hashPassword();

    const pTasks = [];

    for (let index = 0; index < 3; index++) {
      pTasks[index] = this.prisma.user.create({
        data: {
          username: faker.internet.userName().toLowerCase(),
          password: hashedPassword,
        },
      });
    }

    await this.prisma.$transaction(pTasks);
  }
}
