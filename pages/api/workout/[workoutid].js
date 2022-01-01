import { getWorkoutById } from '../../../services/workout';

export default async function handler(req, res) {
    const { method } = req;
    const { workoutid } = req.query;

    // get all workouts
    if (method === 'GET') {
        const workout = await getWorkoutById(workoutid);
        workout ? res.status(200).send(workout) : res.status(404).send();
    }

    return res.status(405).send();
}
