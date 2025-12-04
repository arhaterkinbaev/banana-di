// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth');
const commentsRoute = require('./routes/comments');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/banana_di');

app.use(cors());
app.use(express.json());

// routes
app.use('/api/products', productsRoute);
app.use('/api/auth', authRoute);
app.use('/api/comments', commentsRoute);

// error handler (last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
