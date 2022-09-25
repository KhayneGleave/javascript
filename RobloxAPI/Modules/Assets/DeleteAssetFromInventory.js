const request = require('request');
const Config = require('../config.json')
const GetToken = require('../Util/GetToken.js')
const GetAssetDetails = require('../Util/GetProductDetails.js')

exports.func = async(Asset_ID) => {

    return await new Promise(async resolve => {

        const x_csrf = await GetToken.func()
        const Asset_Data = await GetAssetDetails.func(Asset_ID)


        request({

            url: 'https://www.roblox.com/asset/delete-from-inventory',
            method: 'POST',
            body: `assetId=${Asset_ID}`,
            headers: {

                'cookie': '.ROBLOSECURITY=' + Config.ROBLOSECURITY,
                'x-csrf-token': x_csrf,
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'

            },
        
        }, async (_, response, body) => {

            if (response.statusCode == 200) {

                const Item_Data = JSON.parse(body)

                if (Item_Data.isValid) {

                    resolve(`Deleted ${Asset_Data.name} from inventory.`)

                }else {

                    resolve(`${response.statusCode}:  ${body}`)

                }

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server`)

            }
        
        })
        
    })

}