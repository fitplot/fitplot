import { getUser, createUser } from '../../services/user';

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const { query: { id } } = req;

    const user = getUser(parseInt(id, 10));

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send();
    }
  } else if (method === "POST") {
    const user = req.body;

    const id = createUser(user)

    if (id) {
      res.status(200).send(id.toString());
    } else {
      res.status(400).send();
    }
  } else {
    res.status(405).send();
  }
};
