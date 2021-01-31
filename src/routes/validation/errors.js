const {validationResult} = require("express-validator");

const validationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
}

module.exports = validationErrors;