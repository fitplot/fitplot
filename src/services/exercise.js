import prisma from '../lib/prisma-server';

export async function getAllExercises() {
  return prisma.exercise.findMany();
}

export async function createExercise(exercise) {
  return prisma.exercise.create({ data: exercise });
}
