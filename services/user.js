const data = [
  {
    id: 1,
    name: 'Rick Sanchez',
  },
  {
    id: 2,
    name: 'Morty Sanchez'
  }
];

export function getUser(id) {
  if (!id) return null;

  return data.find(u => u.id === id) || null;
}

export function createUser(user) {
  if (!user || typeof user !== 'object') return null;

  const id = data.map(u => u.id).sort()[0] + 1;
  user.id = id;

  data.push(user);

  return id;
}
