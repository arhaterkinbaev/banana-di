const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const auth = require('../middlewares/authMiddleware');

router.get('/', commentsController.getCommentsForProduct);
router.post('/', auth.optionalAuth, commentsController.addComment); // optional: allow guests but better require auth
module.exports = router;
