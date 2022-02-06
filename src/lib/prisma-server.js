import { PrismaClient } from '@prisma/client';

// create prisma client
const prisma = new PrismaClient();

// connect to client
prisma.$connect();

export default prisma;
