const request = require('request');
const Config = require('../config.json')
const GetToken = require('../Util/GetToken.js')
const GetAssetDetails = require('../Util/GetProductDetails.js')

exports.func = async(Asset_ID) => {

    return await new Promise(async resolve => {

        const x_csrf = await GetToken.func()

        const Item_Data = await GetAssetDetails.func(Asset_ID)    

        Asset_ID = Item_Data.productId
        Price = Item_Data.price
        Seller_ID = Item_Data.creatorTargetId

        request({

            url: `https://economy.roblox.com/v1/purchases/products/${Asset_ID}`,
            method: 'POST',
            body: `{"expectedCurrency":1,"expectedPrice":${Price},"expectedSellerId":${Seller_ID}}`,
            headers: {
                
                'cookie': '.ROBLOSECURITY=' + Config.ROBLOSECURITY,
                'x-csrf-token': x_csrf,
                'content-type': 'application/json;charset=UTF-8'

            }
        }, async (error, response, body) => {

            if (response.statusCode == 200) {

                const Asset_Details = JSON.parse(body)

                if (Asset_Details.purchased == false) {

                    resolve(`Status: Failed - ${Asset_Details.errorMsg}`)

                }else {

                    resolve(`Status: Success - Purchased ${Asset_Details.assetName} for ${Price} Robux`)

                }

            }

        })

    })

}