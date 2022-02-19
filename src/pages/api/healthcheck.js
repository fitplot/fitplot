import { StatusCodes } from 'http-status-codes';

export default async function handler(req, res) {
  return res.status(StatusCodes.OK).send();
}
