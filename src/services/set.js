import prisma from '../lib/prisma-server';

export async function getWorkoutSet(setId) {
  return prisma.workoutset.findUnique({ where: { id: setId } });
}

export async function getSetsByWorkoutId(workoutId) {
  return prisma.workoutset.findMany({ where: { workoutId } });
}

export async function createSetForWorkout(set) {
  return prisma.workoutset.create({ data: set });
}

export async function updateWorkoutSet(id, { amount, unit, volume }) {
  return prisma.workoutset.update({
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

export async function deleteWorkoutSet(workoutSetId) {
  return prisma.workoutset.delete({
    where: {
      id: workoutSetId,
    },
  });
}
