const apiBaseUrl = 'http://localhost:3000'

export const getCardUrl = (id = null) => `${apiBaseUrl}/card/${id ?? ''}`
export const getImageUrl = (id) => `${apiBaseUrl}/image/full/${id}`
export const getThumbUrl = (id) => `${apiBaseUrl}/image/thumb/${id}`

export const makeCard = async (formData) => {
  await fetch(
    getCardUrl(),
    {
      method: 'POST',
      body: formData,
    }
  )
}

export const getCardNames = async () => {
  const response = await fetch(getCardUrl());
  const result = await response.json();
  return result;
}

export const getCardById = async (_id) => {
  const response = await fetch(getCardUrl(_id));
  const result = await response.json()
  return result;
}
