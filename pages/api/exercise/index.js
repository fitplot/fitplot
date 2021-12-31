import { getAllExercises } from '../../../services/exercise';

export default async function handler(req, res) {
    res.status(200).send(await getAllExercises());
}
