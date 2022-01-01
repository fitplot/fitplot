import { getAllWorkouts } from '../../../services/workout';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    
    res.status(200).send(await getAllWorkouts());
  }

}
