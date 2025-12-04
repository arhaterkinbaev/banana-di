const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const { category = 'burgers', search = '' } = req.query;
    if (!category) return res.status(400).json({ error: 'Category required' });

    const items = await Product.find({ category, name: new RegExp(search, 'i') }).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { category, id } = req.params;
    const item = await Product.findOne({ category, id: Number(id) }).lean();
    if (!item) return res.status(404).json({ error: 'Product not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};
