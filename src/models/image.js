const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const imageSchema = new Schema({
  
  title: {type: String},
  description: {type: String},
  filename: {type: String},
  path: {type: String},
  originalname: {type: String},
  mimetype: {type: String},
  size: {type: Number},
  created_at: {type: Date, default: Date.now()},
  image_url: {type: String},
  public_id: {type: String}
});


module.exports = mongoose.model('Image', imageSchema)