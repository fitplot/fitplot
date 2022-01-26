import prisma from '../lib/prisma-server';

export async function getAllExercises() {
  return await prisma.exercise.findMany();
}

export async function createExercise(exercise) {
  return await prisma.exercise.create({ data: exercise });
}