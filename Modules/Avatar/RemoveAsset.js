const request = require('request');
const Config = require('../config.json')
const GetToken = require('../Util/GetToken.js')
const GetAssetDetails = require('../Assets/GetAssetInfo.js')

exports.func = async(Asset_ID) => {

    return await new Promise(async resolve => {

        const x_csrf = await GetToken.func()
        const Item_Info = await  GetAssetDetails.func(Asset_ID)

        request({

            url: `https://avatar.roblox.com/v1/avatar/assets/${Asset_ID}/remove`,
            method: 'POST',
            headers: {

                'cookie': `.ROBLOSECURITY=${Config.ROBLOSECURITY}`,
                'x-csrf-token': x_csrf,
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'

            },
        
        }, async (_, response, body) => {

            if (response.statusCode == 200) {

                const Item_Data = JSON.parse(body)

                if (Item_Data.success) {

                    resolve(`Successfully removed ${Item_Info.Name}.`)

                }else {

                    resolve(`${response.statusCode}:  ${body}`)

                }

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

            }
        
        })
        
    })

}