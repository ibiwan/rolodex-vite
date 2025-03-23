import { selectSelectedCard } from '../store';
import { Box } from './Box.jsx';
import { useSelector } from 'react-redux';

export const Card = () => {
  const cardData = useSelector(selectSelectedCard);

  if (!cardData) { return <></>; }

  const imageUrl = cardData.image ? `http://localhost:3000/image/${cardData.image}` : null;

  return <>
    {cardData.image && (
      <Box>
        <img style={{width:"50%"}} src={imageUrl} alt="" />
      </Box>
    )}
  </>
}
