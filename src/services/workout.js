import prisma from '../lib/prisma-server';

export async function getAllWorkouts() {
  return await prisma.workout.findMany();
}

export async function getWorkoutById(workoutId) {
  return await prisma.workout.findUnique({ where: { id: workoutId } });
}

export async function getWorkoutsByUserId(userId) {
  return await prisma.workout.findMany({
    where: {
      userId
    }
  });
}

export async function createWorkout(workout) {
  return await prisma.workout.create({ data: workout });
}

export async function deleteWorkout(workout) {
  return await prisma.workout.delete({
    where: {
      id: workout.id
    }
  });
}
