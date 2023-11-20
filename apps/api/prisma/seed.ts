import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const upsertCurrencies = async () => {
  const euro = await prisma.currency.upsert({
    where: { name: 'EUR' },
    update: {},
    create: { name: 'EUR' },
  });
  const americanDollar = await prisma.currency.upsert({
    where: { name: 'USD' },
    update: {},
    create: { name: 'USD' },
  });
  const yen = await prisma.currency.upsert({
    where: { name: 'JPY' },
    update: {},
    create: { name: 'JPY' },
  });
  const poundSterling = await prisma.currency.upsert({
    where: { name: 'GBP' },
    update: {},
    create: { name: 'GBP' },
  });
  const australianDollar = await prisma.currency.upsert({
    where: { name: 'AUD' },
    update: {},
    create: { name: 'AUD' },
  });
  const canadianDollar = await prisma.currency.upsert({
    where: { name: 'AUD' },
    update: {},
    create: { name: 'AUD' },
  });
  const swissFranc = await prisma.currency.upsert({
    where: { name: 'CHF' },
    update: {},
    create: { name: 'CHF' },
  });
  const chineseRenminbi = await prisma.currency.upsert({
    where: { name: 'CNH' },
    update: {},
    create: { name: 'CNH' },
  });

  console.log({
    euro,
    americanDollar,
    yen,
    poundSterling,
    australianDollar,
    canadianDollar,
    swissFranc,
    chineseRenminbi,
  });
};

const upsertUsers = async () => {
  const adminPwd = process.env.ADMIN_PWD;
  const saltRound = process.env.SALT_ROUND;

  if (!adminPwd) throw new Error('ADMIN_PWD env variable is missing');
  if (!saltRound) throw new Error('SALT_ROUND env variable is missing');

  const hash = await bcrypt.hash(adminPwd, +saltRound);

  const admin = await prisma.user.upsert({
    where: { nickname: 'admin' },
    update: {},
    create: {
      email: 'admin@admin.fr',
      nickname: 'admin',
      password: hash,
      role: Role.ADMIN,
      crypto_currencies: JSON.stringify({}),
      keywords: JSON.stringify({}),
      default_currency: {
        connectOrCreate: {
          where: {
            name: 'EUR',
          },
          create: {
            name: 'EUR',
          },
        },
      },
    },
  });

  console.log({ admin });
};

const main = async () => {
  await upsertCurrencies();
  await upsertUsers();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
