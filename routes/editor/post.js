const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');

router.post('/create', postController.create);
router.post('/edit/:id', postController.edit);
router.post('/remove', postController.remove);
router.post('/block/delete', postController.deleteBlock);

module.exports = router;