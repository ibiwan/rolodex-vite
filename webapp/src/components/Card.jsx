import { Box } from './Box.jsx';
import { useSelector } from 'react-redux';
import { selectSelectedCard } from '../store/store.js';

export const Card = () => {
  const cardData = useSelector(selectSelectedCard);

  if (!cardData) { return <></>; }

  const imageUrl = cardData.image ? `http://localhost:3000/image/${cardData.image}` : null;

  return <>
    {cardData.image && (
      <Box>
        <img src={imageUrl} alt="" />
      </Box>
    )}
  </>
}
