const request = require('request');
const Config = require('./config.json').Settings;
const SendToTransferList = require('./SendToTransferList.js')
const IsItemInTradePile = require('./IsItemInTradePile.js')

async function ListItem(Item_ID) {

    return await new Promise(async resolve => {

        const IsItemInCurrentTradePile = await IsItemInTradePile.func(Item_ID)

       if (!IsItemInCurrentTradePile) {

            await SendToTransferList(Item_ID)

       }

        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/auctionhouse',
            method: 'POST',
            body: '{"buyNowPrice":' + '200' + ',"duration":3600,"itemData":{"id":' + Item_ID + '},"startingBid":' + '150' + '}',
            headers: {'X-UT-SID': Config.SESSION_ID}
    
        }, function(error, response, body){
    
            try{

                resolve((response.statusCode == 200 && 'Listed item: ' + Item_ID + ' For Max: ' + '200' + ', Min: ' + '150') || response.statusCode)
            }catch {

                console.log(response.statusCode)

                resolve('An error occured: ' + response.statusCode + ': ' + body)
    
            } finally {

                resolve();
            }

        })

    })

}

exports.func = async(Item_ID) => {

    return await ListItem(Item_ID)

}