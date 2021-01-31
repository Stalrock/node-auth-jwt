const {body, param} = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const validator = {
    //#region Auth
    //Register
    validateRegisterPost() {
        return [
            body("name").not().isEmpty().trim(),
            body("email").isEmail()
            .custom(async value => {
                const user = await User.findOne({email: value})
                if (user) throw new Error("E-mail already in use");
            }),
            body("password").isLength({min: 5})
            .custom((value, {req}) => {
                if (value !== req.body.passwordConfirmation) throw new Error("Password confirmation is incorrect");
            }),
        ];
    },
    //Login
    validateLoginPost() {
        return [
            body("email").isEmail()
            .custom(async value => {
                const user = await User.findOne({email: value});
                if (!user) throw new Error("E-mail or password is wrong");
            }),
            body("password").isLength({min: 5})
            .custom(async (value, {req}) => {
                const user = await User.findOne({email: req.body.email})
                const validPassword = await bcrypt.compare(value, user.password);
                if (!validPassword) throw new Error("E-mail or password is wrong");
            })
        ];
    },
    //#endregion

    //#region Post
    //Add title and body
    validatePost() {
        return [
            body("title").not().isEmpty().trim(),
            body("body").not().notEmpty().trim()
        ];
    }
    //#endregion
};

module.exports = validator;