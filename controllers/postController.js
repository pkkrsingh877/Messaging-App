const Post = require('../models/post');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).render('posts/posts', { posts });
    } catch (error) {
        console.log(error);
        res.status(400).json({"Status": "Failure"});
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ _id: id });
        res.render(`posts/post`, { post });
    } catch (error) {
        console.log(error);
        res.status(400).json({"Status": "Failure"});
    }
}

const postCreatePost = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.body);
        const post = await Post.create({ title, description });
        res.redirect(`http://localhost:8000/post/${post._id}`);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);   
    }
}

const getCreatePost = (req, res) => {
    try {
        res.render('posts/create');
    } catch (error) {
        res.json({"Status": "Ejs related error"});
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, user, comments } = req.body;

        const post = await Post.findByIdAndUpdate(id, {
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
        res.status(200).redirect('/post');
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { getPosts, getPost, getCreatePost, postCreatePost, deletePost, updatePost };