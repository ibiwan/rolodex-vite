import * as mongoose from 'mongoose';

export const imageSchema = {
  filename: String,
  encoding: String,
  mimetype: String,
  size: Number,
  content: Buffer,
};

export const ImageModel = mongoose.model('Image', imageSchema);
