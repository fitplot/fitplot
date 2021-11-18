import { LowSync, MemorySync } from "lowdb";
import _ from "lodash";
import { nanoid } from "nanoid";
import logger from "../lib/logger";

const db = new LowSync(new MemorySync());
db.read();
db.data = db.data || { checkins: [] };
db.write();

export function getAllCheckinsForUser(userId) {
  if (!userId) return null;

  logger.info(`Getting checkins for: ${userId}`);
  db.read();
  return _.chain(db.data.checkins)
    .filter(c => c.userId === userId)
    .value();
}

export function createCheckin(userId) {
  if (!userId) return null;

  const id = nanoid();

  const checkin = {
    id,
    userId,
    timestamp: new Date()
  };

  db.read();
  const { checkins } = db.data;
  checkins.push(checkin);
  db.write();

  logger.info(`Created checkin: ${id} for user: ${userId}`);
  return id;
}
