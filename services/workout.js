import prisma from '../lib/prisma-server';

// get all workouts
export async function getAllWorkouts() {
    return await prisma.workout.findMany();
}

// get workout by id
export async function getWorkoutById(workoutId) {
    return await prisma.workout.findUnique({ where: { id: workoutId } });
}

// create workout
export async function createWorkout(workout) {
    return await prisma.workout.create({ data: workout });
}
