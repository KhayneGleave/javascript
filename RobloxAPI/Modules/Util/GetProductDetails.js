const request = require('request');
const Config = require('../config.json')
const GetToken = require('./GetToken.js')

exports.func = async(Asset_ID) => {

    return await new Promise(async resolve => {

        const x_csrf = await GetToken.func()

        request({

            url: 'https://catalog.roblox.com/v1/catalog/items/details',
            method: 'POST',
            body: `{"items":[{"itemType":"Asset","id":${Asset_ID}}]}`,
            headers: {
                
                'cookie': '.ROBLOSECURITY=' + Config.ROBLOSECURITY,
                'x-csrf-token': x_csrf,
                'content-type': 'application/json;charset=UTF-8'

            }
        }, async(_, response, body) => {

            if (response.statusCode == 200) {

                const Asset_Data = JSON.parse(body)

                resolve(Asset_Data.data[0])

            }else {

                resolve(`${response.statusCode}:  ${body}`)

            }

        })

    })

}