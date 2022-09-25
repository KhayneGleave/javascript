
const request = require('request');
const Config = require('../config.json')

exports.func = async(username) => {

    return await new Promise(resolve => {

        request({

            url: 'https://api.roblox.com/currency/balance',
            headers: {

                "Content-Type": "application/json",
                'cookie': `.ROBLOSECURITY=${Config.ROBLOSECURITY}`,
            
            },
        
        }, async (_, response, body) => {
        
            if (response.statusCode == 200) {

                resolve(JSON.parse(body).robux)

            }else {

                resolve(`${response.statusCode}:  ${body}`)                

            }
        
        })
        
    })

}