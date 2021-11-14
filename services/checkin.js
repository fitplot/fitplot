const data = [];

export function getAllCheckinsForUser(userId) {
  if (!userId) return null;

  return data.filter(
    (checkin) => checkin.user_id === userId
  );
}

let count = 2;
export function createCheckin(userId) {
  if (!userId) return null;

  const id = count++;

  data.push({
    id,
    user_id: userId,
    timestamp: new Date()
  });

  return id;
}
