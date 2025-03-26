import { Router } from 'express';

import { getImage } from '../db/mongoose.js';

export const imageRouter = Router();

const sendImage = (res, { mimetype, filename, content }) => {
  res.set({
    'Content-Type': mimetype,
    'Content-Disposition': `attachment; filename="${filename}"`
  });
  res.send(content);
}

imageRouter.get('/full/:id', async (req, res) => {
  const image = await getImage(req.params.id);
  if (!image) { res.status(404).send('image not found'); return }
  
  const { mimetype, filename, content } = image;
  sendImage(res, { mimetype, filename, content });
})

imageRouter.get('/thumb/:id', async (req, res) => {
  if ([undefined, null, 'undefined'].includes(req.params?.id)) {
    res.status(404).send('no id provided');
    return
  }
  
  const image = await getImage(req.params.id);
  if (!image) { res.status(404).send('thumbnail not found'); return }

  const { mimetype, filename, thumb } = image;
  sendImage(res, {
    mimetype,
    filename: filename.replace(/(.*)\.(.{3,4})/, '$1.thumb.$2'),
    content: thumb
  });
})
