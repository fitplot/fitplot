import { updateWorkoutSet } from "../../../../../../services/set";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "PUT") {
    const { id, amount, unit, volume } = body;
    return res
      .status(200)
      .send(await updateWorkoutSet(id, amount, unit, volume));
  }

  return res.status(405).send();
}
