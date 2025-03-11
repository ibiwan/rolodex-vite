import * as mongoose from 'mongoose';
import { imageSchema } from './image.js';

export const cardSchema = {
  name: String,
  tags: [{ type: String }],
  url: String,
  image: {type: mongoose.Types.ObjectId, ref: "Image"}
};

export const CardModel = mongoose.model('Card', cardSchema);
