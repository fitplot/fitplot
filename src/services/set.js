import prisma from '../lib/prisma-server';

export async function getSetByWorkoutId(workoutId) {
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
