import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { cardRouter } from './routes/card.js';
import { imageRouter } from './routes/image.js';

const port = 3000;

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.use('/card', cardRouter);
app.use('/image', imageRouter);

app.listen(port, () => {
  console.log(`Rolodex Server app listening on port ${port}`)
})
