import express from 'express';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';

import { getCard, getCards, getImage, makeCard, saveImage } from './db/mongoose.js';

const port = 3000;

const app = express()
const uploadMw = multer({});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.get('/image/:id', async (req, res) => {
  const image = await getImage(req.params.id);
  res.set({
    'Content-Type': image.mimetype,
    'Content-Disposition': `attachment; filename="${image.filename}"`
  });
  res.send(image.content);
})

app.get('/card/:id', async (req, res) => {
  const card = await getCard(req.params.id);
  res.send(card)
})

app.get('/cardNames', async (req, res) => {
  const result = await getCards()
  const projected = result.map((card) => ({
    _id: card._id.toString(),
    name: card.name,
    thumb: card.thumb,
  }))
  res.send(projected);
})

app.post('/card', uploadMw.single('image'), async (req, res) => {
  let image = null;
  if (req.file) {
    image = await saveImage(req.file)
  }

  const { name, url, tagString, text } = req.body;
  const card = { name, url, tagString, image, text };
  await makeCard(card)

  res.send({ success: true })
})

app.listen(port, () => {
  console.log(`Rolodex Server app listening on port ${port}`)
})
