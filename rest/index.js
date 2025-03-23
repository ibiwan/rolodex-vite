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
  if (!image) { res.status(404).send('image not found'); return }
  res.set({
    'Content-Type': image.mimetype,
    'Content-Disposition': `attachment; filename="${image.filename}"`
  });
  res.send(image.content);
})

app.get('/card/:id', async (req, res) => {
  try {
    const card = await getCard(req.params.id);
    res.send(card)
  } catch (e) {
    res.status(404).send('no')
  }
})

app.get('/thumb/:id', async (req, res) => {
  if ([undefined, null, 'undefined'].includes( req.params?.id)) {
    res.status(404).send('no id provided');
    return
  }

  const image = await getImage(req.params.id);
  if (!image) {
    res.status(404).send('image not found');
    return
  }

  const { mimetype, thumb } = image
  const filename = image.filename.replace(/(.*)\.(.{3,4})/, '$1.thumb.$2')
  res.set({
    'Content-Type': mimetype,
    'Content-Disposition': `attachment; filename="${filename}"`
  });
  res.send(thumb);
})

app.get('/cardNames', async (req, res) => {
  const result = await getCards()
  const projected = result.map((card) => ({
    _id: card._id.toString(),
    name: card.name,
    image_id: card.image?._id,
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
