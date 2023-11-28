const Post = require('../models/post');

const getPosts = () => {

}

const getPost = () => {

}

const postCreatePost = () => {

}

const getCreatePost = () => {

}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, user, comments } = req.body;

        const post = Post.findByIdAndUpdate(id, {
            title, description, user, comments, updatedAt: Date.now()
        });

        res.status(200).json({"Status": "Success"});
    } catch (error) {
        res.status(400).json(error);
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json({ "Status": "Success" })
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { getPosts, getPost, getCreatePost, postCreatePost, deletePost, updatePost };