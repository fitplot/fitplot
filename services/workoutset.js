import prisma from '../lib/prisma-server';

export async function getAllWorkoutSets() {
    return await prisma.workoutset.findMany();
}
