import { getAllWorkouts } from '../../../services/workout';

export default async function handler(req, res) {
  res.status(200).send(await getAllWorkouts());
}
