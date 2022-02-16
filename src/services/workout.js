import prisma from '../lib/prisma-server';

export async function getAllWorkouts() {
  return prisma.workout.findMany();
}

export async function getWorkoutById(workoutId) {
  return prisma.workout.findUnique({ where: { id: workoutId } });
}

export async function getWorkoutsByUserId(userId) {
  return prisma.workout.findMany({
    where: {
      userId,
    },
  });
}

export async function createWorkout(workout) {
  return prisma.workout.create({ data: workout });
}

export async function updateWorkout(id, { name }) {
  return prisma.workout.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteWorkout(workout) {
  return prisma.workout.delete({
    where: {
      id: workout.id,
    },
  });
}
