import { BaseSeeder } from './base.seeder';

export class ChatRoomSeeder extends BaseSeeder {
  async seedData() {
    await this.prisma.chatRoom.create({
      data: {
        name: 'default chat room',
      },
    });
  }
}
