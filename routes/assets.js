const assets = require('express').Router();
const {ASSET_SONAR} = process.env;
const fetch =require('node-fetch') ;


assets.get('/:id', async(req,res)=> {

   

const url = 'https://zendesksatish.assetsonar.com/assets/filter.api?&status=possessions_of&filter_param_val='+req.params.id

    const response = await fetch(url, {
    
        
        headers: {
            'Content-Type': 'application/json',
            'token': ASSET_SONAR 
        }
    
    });
    
    const data = await response.json();
    res.json(data);
})













module.exports = assets;