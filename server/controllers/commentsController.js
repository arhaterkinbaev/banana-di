const Comment = require('../models/Comment');

exports.getCommentsForProduct = async (req, res, next) => {
  try {
    const { productId } = req.query;
    if (!productId) return res.json([]);
    const comments = await Comment.find({ productId: Number(productId) }).sort({ date: 1 }).lean();
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { productId, text } = req.body;
    const user = req.user; // from authMiddleware

    if (!productId || !text) return res.status(400).json({ message: 'productId and text required' });

    const comment = new Comment({
      productId: Number(productId),
      userId: user ? user._id : null,
      author: user ? user.name : req.body.author || 'Аноним',
      text
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
