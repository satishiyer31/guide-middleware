const enduserAuth = require('express').Router();
const signToken = require('../helpers/fsUtils');


enduserAuth.post('/jwt', async (req,res) => {

if (req.body) {
    const token = await signToken(req.body);
    console.log(token)
    res.status(201).json(token) ;
}

    
})


module.exports = enduserAuth;