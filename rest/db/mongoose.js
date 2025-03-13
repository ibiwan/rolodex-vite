import * as mongoose from 'mongoose';

import { CardModel } from './card.js';
import { ImageModel } from './image.js';

const conn = null;

const init = async () => {
  if (!conn) {
    mongoose.connect('mongodb://localhost:27017/card');
  }
}

const withInit = f => async (...a) => { await init(); return f(...a) };

export const getCards = withInit(() => CardModel.find());
export const getCard = withInit(async id => CardModel.findById(id));
export const getImage = withInit(async (id) => ImageModel.findById(id));

export const saveImage = withInit(async (data) => {
  const { originalname, encoding, mimetype, size, buffer } = data;
  const image = new ImageModel({
    filename: originalname,
    content: buffer,
    encoding, mimetype, size,
  })
  return image.save();
});

export const makeCard = withInit(async (data) => {
  data.tags = (data?.tagString ?? '').split(" ").filter(str => str.length > 0)
  console.log('makeCard', { data })
  const card = new CardModel(data);
  await card.save();

  return card._id;
});

export const findCard = withInit(async term =>
  CardModel.find({
    $or: [
      { name: { $regex: `/${term}/` } },
      { tags: term },
    ]
  })
);
