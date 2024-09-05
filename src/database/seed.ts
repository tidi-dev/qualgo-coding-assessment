import { PrismaClient } from '@prisma/client';
import { SeederFactory } from './seeder-factory';

const prisma = new PrismaClient();
const seederFactory = new SeederFactory();

async function main() {
  await seederFactory.seedData();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
