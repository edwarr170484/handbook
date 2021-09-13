const express = require('express');
const router = express.Router();
const topicController = require('../../controller/topicController');

router.post('/create', topicController.create);
router.post('/edit', topicController.edit);
router.post('/delete', topicController.delete);

module.exports = router;