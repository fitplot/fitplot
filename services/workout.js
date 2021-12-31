import prisma from '../lib/prisma-server';

export async function getAllWorkouts() {
    return await prisma.workout.findMany();
}
