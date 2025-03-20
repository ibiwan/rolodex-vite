import { useDispatch } from 'react-redux'

import {
  refreshCardNames
} from '../store/store.js'

export const useAddCard = () => {
  const dispatch = useDispatch();
  return { refreshCardNames: () => dispatch(refreshCardNames()) };
}
