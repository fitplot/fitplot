import {
  getAllCheckinsForUser,
  createCheckin
} from "../../../services/checkin";

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const checkins = getAllCheckinsForUser(req.query.id);

    if (checkins) {
      res.status(200).json({ checkins });
    } else {
      res.status(404).send();
    }
  } else if (method === "POST") {
    const id = createCheckin(req.query.id);

    if (id) {
      res.status(200).send(id.toString());
    } else {
      res.status(400).send();
    }
  } else {
    res.status(405).send();
  }
}
