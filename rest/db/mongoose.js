import * as mongoose from 'mongoose';

import { CardModel } from './card.js';
import { ImageModel } from './image.js';

const conn = null;

const init = async () => {
  if (!conn) {
    mongoose.connect('mongodb://localhost:27017/card');
  }
}

export const getCards = async () => {
  await init();
  return CardModel.find();
}

export const saveImage = async (data) => {
  await init();

  const image = new ImageModel({
    filename: data.originalname,
    encoding: data.encoding,
    mimetype: data.mimetype,
    size: data.size,
    content: data.buffer,
  })
  await image.save();

  return image;
}

export const getImage = async (id) => {
  await init();

  const image = await ImageModel.findById(id)
  return image;
}

export const makeCard = async (data) => {
  await init();

  data.tags = data.tagString.split(" ").filter(str => str.length > 0)

  const card = new CardModel(data);
  await card.save();

  return card._id;
}

export const getCard = async id => {
  await init();

  const card = await CardModel.findById(id);
  
  return card;
}

export const findCard = async term => {
  await init();
  return CardModel.find({
    $or: [
      { name: { $regex: `/${term}/` } },
      { tags: term },
    ]
  });
}
