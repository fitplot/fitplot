import prisma from '../lib/prisma-server';

export async function getAllExercises() {
  return prisma.exercise.findMany();
}

export async function createExercise(exercise) {
  return prisma.exercise.create({ data: exercise });
}

export async function getExercisesForUser(userId) {
  return prisma.exercise.findMany({
    where: {
      userId,
    },
  });
}

export async function getExerciseById(exerciseId) {
  return prisma.exercise.findUnique({ where: { id: exerciseId } });
}

export async function updateExerciseNameById(id, { name }) {
  return prisma.exercise.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}
