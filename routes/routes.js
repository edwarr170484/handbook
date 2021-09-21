const express = require('express');
const router = express.Router();

const editorTopicRoutes = require('./editor/topic');
const editorPostRoutes = require('./editor/post');

router.get('/', (req, res) => {res.sendFile(__dirname + '/public');});
router.use('/editor/topic', editorTopicRoutes);
router.use('/editor/post', editorPostRoutes);

module.exports = router;