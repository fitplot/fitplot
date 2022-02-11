import prisma from '../lib/prisma-server';

export async function getAllExercises() {
  return prisma.exercise.findMany();
}

export async function createExercise(exercise) {
  return prisma.exercise.create({ data: exercise });
}

export async function deleteExercise(exerciseId) {
  return prisma.exercise.delete({
    where: {
      id: exerciseId,
    },
  });
}

export async function updateExercise(exercise) {
  return prisma.exercise.update({
    where: {
      id: exercise.id,
    },
    data: {
      name: exercise.name,
    },
  });
}
