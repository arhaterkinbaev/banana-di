const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'User already exists' });

    const u = new User({ name, email: email.toLowerCase() });
    await u.setPassword(password);
    await u.save();

    const token = jwt.sign({ userId: u._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: u.toClient(), token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const u = await User.findOne({ email: email.toLowerCase() });
    if (!u) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await u.validatePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: u._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: u.toClient(), token });
  } catch (err) {
    next(err);
  }
};
