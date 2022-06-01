const encrypt = require('express').Router();
const crypto = require("crypto");
const {SEC_KEY} = process.env;


encrypt.get('/:email', async(req,res)=>{

    // const initVector = crypto.randomBytes(16);
    // console.log(initVector);

    // const securityKey = crypto.randomBytes(32);
    // console.log(securityKey);

    const cipher = crypto.createCipher('aes-128-cbc',SEC_KEY);

    let encryptedEmail = cipher.update(req.params.email,"utf-8","hex");

    encryptedEmail += cipher.final("hex");

    res.json(encryptedEmail);

})


module.exports = encrypt;