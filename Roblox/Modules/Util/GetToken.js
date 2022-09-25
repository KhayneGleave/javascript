const request = require('request');
const Config = require('../config.json')

exports.func = async() => {

    return await new Promise(resolve => {

        request({

            url: 'https://auth.roblox.com/v2/logout', //Noblox Method, https://github.com/noblox/noblox.js/blob/master/lib/util/getGeneralToken.js
            method: 'POST',
            headers: {'cookie': '.ROBLOSECURITY=' + Config.ROBLOSECURITY} //Only .ROBLOSECURITY is required.

        }, async (error, response, body) => {

            resolve(response.headers['x-csrf-token']) //Returns token to exports.func.

        })


    })

}; 