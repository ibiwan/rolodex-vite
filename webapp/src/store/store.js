import { configureStore, createSlice } from '@reduxjs/toolkit'

import { initialState } from './state.js'

const cardySlice = createSlice({
  name: 'cards',
  initialState,
  reducers: () => ({
    setCardNames: (state, action) => { state.cardNames = action.payload },
    addCardData: (state, action) => { state.cardData[action.payload.id] = action.payload.data; },
    setSelectedId: (state, action) => { state.selectedId = action.payload },
    clearSelectedId: (state, action) => { state.selectedId = null },
    addCardThumb: (state, action) => { state.cardThumbs[action.payload.id] = action.payload.data; },
    setHoveredCardId: (state, action) => { state.hoveredCardId = action.payload },
    clearHoveredCardId: (state, action) => { state.hoveredCardId = null },
  }),
})

export const {
  addCardThumb,
  clearHoveredCardId,
  clearSelectedId,
  fetchCardNames,
  setCardNames,
  addCardData,
  setHoveredCardId,
  setSelectedId,
} = cardySlice.actions;

export const store = configureStore({
  reducer: cardySlice.reducer,
})
