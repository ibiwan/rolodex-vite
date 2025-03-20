export const makeCard = async (formData) => {
  await fetch('http://localhost:3000/card', {
    method: 'POST',
    body: formData,
  })
}

export const getCardNames = async () => {
  const response = await fetch('http://localhost:3000/cardNames');
  const result = await response.json();
  return result;
}

export const getCardById = async (_id) => {
  const response = await fetch(`http://localhost:3000/card/${_id}`);
  const result = await response.json()
  return result;
}
