import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  clearHoveredCardId,
  clearSelectedId,
  fetchCardWithId,
  refreshCardNames,
  selectCardThumbs,
  selectHoveredCardId,
  selectSelectedId,
  setHoveredCardId,
  setSelectedId,
  selectCardNames,
} from '../../store'

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

    const handleClick = () => {
      dispatch(clearSelectedId());
    }

    document.body.addEventListener('keydown', handleKeyDown);
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
      document.body.removeEventListener('click', handleClick);
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedId) {
      dispatch(fetchCardWithId(selectedId))
    }
  }, [dispatch, selectedId])

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
