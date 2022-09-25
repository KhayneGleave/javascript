
const request = require('request');
const Config = require('../config.json')

exports.func = async(username) => {

    return await new Promise(resolve => {

        request({

            url: 'https://api.roblox.com/currency/balance',
            headers: {

                "Content-Type": "application/json",
                'cookie': '.ROBLOSECURITY=' + Config.ROBLOSECURITY,
            
            },
        
        }, async (error, response, body) => {
        
            try{

                const PlayerData = JSON.parse(body)

                resolve(PlayerData.robux)

            }catch {

                resolve(`${response.statusCode}:  ${body}`)

            }
        
        })
        
    })

}