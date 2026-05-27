const express = require('express');
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/:projectId/generate', aiController.generateSuggestions);
router.get('/:projectId', aiController.getSuggestions);
router.patch('/suggestion/:id', aiController.updateSuggestionStatus);

module.exports = router;
