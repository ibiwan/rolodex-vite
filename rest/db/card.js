import * as mongoose from 'mongoose';

export const cardSchema = {
  name: String,
  tags: [{ type: String }],
  url: String,
  blob_id: String,
};

export const CardModel = mongoose.model('Card', cardSchema);
