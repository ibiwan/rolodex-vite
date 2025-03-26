import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCardById, getCardNames, getThumbUrl } from '../services/api.js';
import { addCardData, addCardThumb, setCardNames } from './store.js';

export const refreshCardNames = createAsyncThunk(
  'cards/fetchNames',
  async (arg, thunkAPI) => {
    const response = await getCardNames();
    thunkAPI.dispatch(setCardNames(response));
    response.forEach(async (r) => {
      if (r.image_id) {
        const imageUrl = getThumbUrl(r.image_id);
        fetch(imageUrl);
        thunkAPI.dispatch(addCardThumb({ id: r._id, data: imageUrl }));
      }
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
