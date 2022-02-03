import prisma from "../lib/prisma-server";

export async function getSetByWorkoutId(workoutId) {
  return await prisma.workoutset.findMany({ where: { workoutId } });
}

export async function createSetForWorkout(set) {
  return await prisma.workoutset.create({ data: set });
}


export async function findAllSetsForExercise(exerciseId, workoutId) {
  return await prisma.workoutset.findMany({
    where: {
      exerciseId,
      workoutId
    }
  });
}

export async function deleteAllSetsForExercise(exerciseId, workoutId) {
  return await prisma.workoutset.deleteMany({
    where: {
      exerciseId,
      workoutId
    }
  });
}
