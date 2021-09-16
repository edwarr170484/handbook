const express = require('express');
const router = express.Router();
const topicController = require('../../controller/topicController');
const postController = require('../../controller/postController');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public');
});

router.get('/topics/list', topicController.getTopicsList);

router.get('/post/:postId', postController.getPost);

module.exports = router;