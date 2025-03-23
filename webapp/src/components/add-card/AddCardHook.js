import { useDispatch } from 'react-redux'
import { refreshCardNames } from '../../store';

export const useAddCard = () => {
  const dispatch = useDispatch();
  return { refreshCardNames: () => dispatch(refreshCardNames()) };
}
