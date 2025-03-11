import * as mongoose from 'mongoose';
import { CardModel } from './card.js';

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

export const makeCard = async (data) => {
  await init();
  data.tags = data.tagString.split(" ").filter(str => str.length > 0)
  const card = new CardModel(data);
  await card.save();
  console.log("saved")
  return card._id;
}

export const getCard = async id => {
  await init();
  return CardModel.find({ id });
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
