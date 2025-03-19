import { useEffect, useState } from 'react'
import { getCardById } from '../services/api.js';
import { Box } from './Box.jsx';

export const Card = ({ _id }) => {
  const [cardData, setCardData] = useState(null);

  const fetchCardWithId = async (id) => {
    const data = await getCardById(id)
    setCardData(data);
  }

  useEffect(() => {
    if (_id === null) {
      setCardData(null);
    }
    else fetchCardWithId(_id)
  }, [_id]);

  // console.log({ cardData });

  if (cardData === null) { return <></>; }

  const imageUrl = cardData.image ? `http://localhost:3000/image/${cardData.image}` : null;

  return <>
    {cardData.image && (
      <Box>
        <img src={imageUrl} alt="" />
      </Box>
    )}
  </>
}
