import prisma from '../lib/prisma-server';

export async function getAllExercises() {
    return await prisma.exercise.findMany();
}
