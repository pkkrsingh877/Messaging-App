const express = require('express');
const router = express.Router();
const { getPosts, getPost, getUpdatePost, patchUpdatePost, deletePost, getCreatePost, postCreatePost } = require('../controllers/postController');

router.patch('/:id', patchUpdatePost);
router.get('/update/:id', getUpdatePost);
router.delete('/:id', deletePost)
router.post('/', postCreatePost);
router.get('/create', getCreatePost);
router.get('/:id', getPost);
router.get('/', getPosts);

module.exports = router;