const router = require("express").Router();
const verifyToken = require('../middlewares/verifyToken');
const { validatePost } = require("./validation/rules");
const validationErrors = require('./validation/errors');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Post = require('../models/Post');

//Posts [GET]
router.get("/", async (req, res) => {
    
    try{
        const posts = await Post.find();
        res.send(posts);
    }catch(err){
        res.status(400).send(err);
    }
});

//Post :id [GET]
router.get("/:id", async (req, res) => {

    try{
        const post = await Post.findById(req.params.id);
        res.send(post);
    }catch(err){
        res.status(400).send(err);
    }
});

//Post add [POST]
router.post("/", [verifyToken, validatePost()], async (req, res) => {

    //Validate data
    if(validationErrors(req, res)) return;

    const idAuthor = jwt.decode(req.header('auth-token'))._id;
    const author = await User.findById(idAuthor);

    //create new Post
    const post = new Post({
        author: author,
        title: req.body.title,
        body: req.body.body
    })

    try{
        const savedPost = await post.save();
        res.send(savedPost);
    }catch(err){
        res.status(400).send(err);
    }
});

//Post remove [DELETE]
router.delete("/:id", verifyToken, async (req, res) => {

    try{
        const removedPost = await Post.remove({_id: req.params.id});
        res.send(removedPost);
    }catch(err){
        res.status(400).send(err);
    }
});

//Post update [PATCH]
router.patch("/:id", [verifyToken, validatePost()], async (req, res) => {

    //Validate data
    if(validationErrors(req, res)) return;

    try{
        console.log(req.params);
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                body: req.body.body,
                updated_at: Date.now()
            }
        );
        res.send(updatedPost);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;