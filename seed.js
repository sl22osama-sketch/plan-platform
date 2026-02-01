const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.COORDINATOR_EMAIL || 'coordinator@example.com';
  const password = process.env.COORDINATOR_PASSWORD || 'change-me-please';

  await prisma.user.upsert({
    where: { email },
    update: {
      name: 'منسق',
      password,
      role: 'COORDINATOR',
    },
    create: {
      email,
      name: 'منسق',
      password,
      role: 'COORDINATOR',
    },
  });

  console.log('Seeded coordinator user:', email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
