const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  author: { type: String },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
