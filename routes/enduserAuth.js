const enduserAuth = require('express').Router();
//const signToken = require('../helpers/fsUtils');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

enduserAuth.post('/', async (req,res) => {

if (req.body) {

    const payload = req.body
    console.log(payload)
    const KEY_ID = 'app_6542ebfb3a057401be95fe79'
    // console.log(payload);
    // const expiration = '2h'
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h', header:{kid:KEY_ID}});
    // console.log(token)
    res.status(201).json(token);
}

    
})


module.exports = enduserAuth;