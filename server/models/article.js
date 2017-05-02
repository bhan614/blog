import mongoose from 'mongoose';
import moment from 'moment';
moment.locale('zh-cn');
const Schema = mongoose.Schema;
const articleScheme = new Schema({
  title: String,
  content: String,
  abstract: String,
  publish: {
    type: Boolean,
    default: false
  },
  tags: {
    type: Array
  },
  createTime: {
    type: Date
  },
  lastEditTime: {
    type: Date,
    default: Date.now
  }
});

articleScheme.set('toJSON', { getters: true, virtuals: true });
articleScheme.set('toObject', { getters: true, virtuals: true });
articleScheme.path('createTime').get((v) => moment(v).format('YYYY-MM-DD HH:mm:ss'));
articleScheme.path('lastEditTime').get((v) => moment(v).format('YYYY-MM-DD HH:mm:ss'));

module.exports = mongoose.model('article', articleScheme);
