const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');

router.post('/create', postController.createPost);
router.post('/edit/:id', postController.editPost);
router.post('/remove', postController.removePost);
router.post('/uploadImage', postController.uploadImage);

module.exports = router;