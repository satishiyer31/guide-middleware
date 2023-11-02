const enduserAuth = require('express').Router();
const signToken = require('../helpers/fsUtils');


enduserAuth.get('/:jwt', async (req,res) => {

    const token = await signToken(req.body);
    console.log(token)
    return token;
})


module.exports = enduserAuth;