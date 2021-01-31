const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateRegisterPost, validateLoginPost} = require('./validation/rules');
const validationErrors = require('./validation/errors');
const User = require("../models/User");

//Register [POST]
router.post("/register", validateRegisterPost(), async (req, res) => {

    //Validate data
    if(validationErrors(req, res)) return;

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //Create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    //Save User
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

//Login [POST]
router.post('/login', validateLoginPost(), async (req, res) => {
    
    //Validate data
    if(validationErrors(req, res)) return;

    //Get User connected
    const user = await User.findOne({email: req.body.email});

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;