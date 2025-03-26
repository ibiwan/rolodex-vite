import { Router } from 'express';
import multer from 'multer';

import { getCard, getCards, makeCard, saveImage } from '../db/mongoose.js';

export const cardRouter = Router();
const uploadMw = multer({});

cardRouter.get('/:id', async (req, res) => {
  try {
    const card = await getCard(req.params.id);
    res.send(card)
  } catch (e) {
    res.status(404).send('no')
  }
})

cardRouter.get('/', async (req, res) => {
  const result = await getCards()
  const projected = result.map((card) => ({
    _id: card._id.toString(),
    name: card.name,
    image_id: card.image?._id,
  }))
  res.send(projected);
})

cardRouter.post('/', uploadMw.single('image'), async (req, res) => {
  let image = null;
  if (req.file) {
    image = await saveImage(req.file)
  }

  const { name, url, tagString, text } = req.body;
  const card = { name, url, tagString, image, text };
  await makeCard(card)

  res.send({ success: true })
})
