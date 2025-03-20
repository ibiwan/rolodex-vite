import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCardById, getCardNames } from '../services/api.js';

export const refreshCardNames = createAsyncThunk(
  'cards/fetchNames',
  async (arg, thunkAPI) => {
    const response = await getCardNames();
    thunkAPI.dispatch(setCardNames(response));
    response.forEach(async (r) => {
      const imageUrl = `http://localhost:3000/thumb/${r.image_id}`;
      fetch(imageUrl);
      thunkAPI.dispatch(addCardThumb({ id: r._id, data: imageUrl }));
    })
  }
);

export const fetchCardWithId = createAsyncThunk(
  'cards/fetchCard',
  async (id, thunkAPI) => {
    const data = await getCardById(id)
    thunkAPI.dispatch(addCardData({ id, data }));
  }
)

const initialState = {
  cardNames: [],
  cardData: {},
  selectedId: null,
  cardThumbs: {},
  hoveredCardId: null,
};

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

const {
  addCardThumb,
  clearHoveredCardId,
  clearSelectedId,
  fetchCardNames,
  setCardNames,
  addCardData,
  setHoveredCardId,
  setSelectedId,
} = cardySlice.actions;

export {
  clearHoveredCardId,
  clearSelectedId,
  fetchCardNames,
  setHoveredCardId,
  setSelectedId,
}

export const selectCardNames = state => state.cardNames;
export const selectSelectedId = state => state.selectedId;
export const selectCardThumbs = state => state.cardThumbs;
export const selectHoveredCardId = state => state.hoveredCardId;
export const selectSelectedCard = state => state?.cardData?.[state?.selectedId];

export const store = configureStore({
  reducer: cardySlice.reducer,
})
