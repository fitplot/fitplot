import { getCheckInForUser, createCheckIn } from "../../../services/checkin";
import { useUser } from "@auth0/nextjs-auth0";

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const checkIns = getCheckInForUser(req.query.id);

    if (checkIns) {
      res.status(200).json({ Checkins: checkIns });
    } else {
      res.status(404).send();
    }
  } else if (method === "POST") {
    // auth0 libray to grab users id {sub}
    const id = createCheckIn(req.query.id);

    if (id) {
      res.status(200).send(id.toString());
    } else {
      res.status(400).send();
    }
  } else {
    res.status(405).send();
  }
}
