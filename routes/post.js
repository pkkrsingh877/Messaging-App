const express = require('express');
const router = express.Router();
const { getPosts, getPost ,updatePost, deletePost, getCreatePost, postCreatePost } = require('../controllers/postController');

router.patch('/:id', updatePost);
router.delete('/:id', deletePost)
router.post('/', postCreatePost);
router.get('/create', getCreatePost);
router.get('/:id', getPost);
router.get('/', getPosts);

module.exports = router;