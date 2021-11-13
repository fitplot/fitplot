const data = [
  {
    id: 1,
    user_id: 12345,
    timestamp: new Date()
  }
];

export function getCheckInForUser(user_id) {
  if (!user_id) return null;

  return data.filter(function(checkIn) {
    return checkIn.user_id === user_id;
  });
}

let count = 2;
export function createCheckIn(user_id) {
  if (!user_id) return null;

  const id = count++;

  data.push({
    id,
    user_id,
    timestamp: new Date()
  });

  return id;
}
