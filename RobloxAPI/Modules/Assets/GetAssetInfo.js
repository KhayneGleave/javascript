const request = require('request');

exports.func = async(Asset_ID) => {

    return await new Promise(async resolve => {

        request({
 
         url: `https://api.roblox.com/marketplace/productinfo?assetId=${Asset_ID}`
 
        }, async (_, response, body) => {
 
         if (response.statusCode == 200) {
 
            resolve(JSON.parse(body))
 
         }else {
 
            resolve(`${response.statusCode}:  ${body}`)
 
         }
 
        })   
 
         
     })
}