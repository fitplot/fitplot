import prisma from "../lib/prisma-server";

export async function getSetByWorkoutId(workoutId) {
  return await prisma.workoutset.findMany({ where: { workoutId } });
}

export async function createSetForWorkout(set) {
  return await prisma.workoutset.create({ data: set });
}

export async function updateWorkoutSet(id, { amount, unit, volume, }) {
  return await prisma.workoutset.update({
    where: {
      id
    },
    data: {
      amount,
      unit,
      volume
    }
  });
}
