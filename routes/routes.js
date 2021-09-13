const express = require('express');
const router = express.Router();

const frontRoutes = require('./front/front');
const editorTopicRoutes = require('./editor/topic');
const editorPostRoutes = require('./editor/post');

router.use('/', frontRoutes);
router.use('/editor/topic', editorTopicRoutes);
router.use('/editor/post', editorPostRoutes);

module.exports = router;