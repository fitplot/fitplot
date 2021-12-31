import { getAllWorkoutSets } from '../../../services/workoutset';

export default async function handler(req, res) {
    res.status(200).send(await getAllWorkoutSets());
}
