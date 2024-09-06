import { ChatRoomSeeder, UserSeeder } from './seeders';

export class SeederFactory {
  constructor(
    protected userSeeder = new UserSeeder(),
    protected chatRoomSeeder = new ChatRoomSeeder(),
  ) {}

  async seedData() {
    await Promise.all([
      this.userSeeder.seedData(),
      this.chatRoomSeeder.seedData(),
    ]);
  }
}
