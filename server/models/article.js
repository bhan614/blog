import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const articleScheme = new Schema({
  title: String,
  content: String,
  abstract: String,
  publish: {
    type: Boolean,
    default: false
  },
  createTime: {
    type: Date
  },
  lastEditTime: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('article', articleScheme);
