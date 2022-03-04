import prisma from '../lib/prisma-server';

export async function getWorkoutSet(setId) {
  return prisma.set.findUnique({ where: { id: setId } });
}

export async function getSetsByWorkoutId(workoutId) {
  return prisma.set.findMany({ where: { workoutId } });
}

export async function createSetForWorkout(set) {
  return prisma.set.create({ data: set });
}

export async function replaceExerciseId({ exerciseId, replaceWith }) {
  return prisma.set.updateMany({
    where: {
      exerciseId,
    },
    data: {
      exerciseId: replaceWith,
    },
  });
}

export async function updateWorkoutSet(id, { amount, unit, volume }) {
  return prisma.set.update({
    where: {
      id,
    },
    data: {
      amount,
      unit,
      volume,
    },
  });
}

export async function findAndRemoveWorkoutSets(exerciseId, workoutId) {
  return prisma.set.deleteMany({
    where: {
      exerciseId,
      workoutId,
    },
  });
}
