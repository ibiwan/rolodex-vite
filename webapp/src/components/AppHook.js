import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  clearHoveredCardId,
  clearSelectedId,
  fetchCardWithId,
  refreshCardNames,
  selectCardNames,
  selectCardThumbs,
  selectHoveredCardId,
  selectSelectedId,
  setHoveredCardId,
  setSelectedId,
} from '../store/store.js'

export const useApp = () => {
  const cardNames = useSelector(selectCardNames);
  const selectedId = useSelector(selectSelectedId);
  const hoveredCardId = useSelector(selectHoveredCardId);
  const cardThumbs = useSelector(selectCardThumbs);
  const hoveredThumbUrl = cardThumbs[hoveredCardId] ?? null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshCardNames())

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dispatch(clearSelectedId())
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (selectedId) {
      dispatch(fetchCardWithId(selectedId))
    }
  }, [selectedId])

  return {
    cardNames,
    hoveredCardId,
    hoveredThumbUrl,
    selectedId,
    setHoveredCardId: (id) => dispatch(setHoveredCardId(id)),
    clearHoveredCardId: () => dispatch(clearHoveredCardId()),
    setSelectedId: (id) => { dispatch(setSelectedId(id)) },
  };
}
