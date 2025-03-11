import express from 'express';
import { getCards, makeCard } from './db/mongoose.js';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';

const uploadMw = multer({});

const port = 3000;

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cardNames', async (req, res) => {
  const result = await getCards()
  const projected = result.map((card) => ({
    _id: card._id.toString(),
    name: card.name,
  }))
  res.send(projected);
})

app.post('/card', async (req, res) => {
  console.log({ body: req.body })
  const { name, url, tagString } = req.body;
  const card = { name, url, tagString };
  await makeCard(card)
  res.send({ success: true })
})

app.post('/image', uploadMw.single('image'), (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
