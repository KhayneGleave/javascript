const request = require('request');
const Config = require('../config.json')

exports.func = async() => {

    return await new Promise(async resolve => {

        request({

            url: 'https://avatar.roblox.com/v1/avatar-rules',
            headers: {

                'cookie': '.ROBLOSECURITY=' + Config.ROBLOSECURITY,
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'

            },

        }, async(_, response, body) => {

            if (response.statusCode == 200) {

                resolve(JSON.parse(body))

            }else {

                resolve(`${response.statusCode}:  ${body}`) //Should always respond with 200 unless there's a ROBLOX outage. so basically always.

            }

        })

    })

}