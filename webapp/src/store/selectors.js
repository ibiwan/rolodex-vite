export const selectCardNames = state => state.cardNames;
export const selectSelectedId = state => state.selectedId;
export const selectCardThumbs = state => state.cardThumbs;
export const selectHoveredCardId = state => state.hoveredCardId;
export const selectSelectedCard = state => state?.cardData?.[state?.selectedId];
