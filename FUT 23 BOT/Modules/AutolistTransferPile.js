
const request = require('request');
const Config = require('./config.json').Settings;
const ListItem = require('./ListItem.js')

async function AutolistTransfers() {

    return await new Promise(resolve => {

        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/tradepile',
            headers: {'X-UT-SID': Config.SESSION_ID}

        }, async (error, response, body) => {

            try{

                let transferPile = JSON.parse(body)

                let len = transferPile.auctionInfo.length

                for (let i = 0; i < len; i++) {

                    let ItemInfo = transferPile.auctionInfo[i]

                    await new Promise(async(resolve) => {

                        let ItemData = ItemInfo.itemData
                        
                        if (ItemData.itemState == 'free') {

                            await ListItem.func(ItemData.id, ItemData.marketDataMinPrice, ItemData.marketDataMinPrice + 50)
                            
                        }

                        setTimeout(()=>resolve(), 13000)

                        resolve()

                    })
                    
                    resolve('Test Complete')
                }

            }catch {

                resolve('An error occured: ' + response.statusCode + ': ' + body)

            }

        })
        
    })

}

exports.func = async () => {
    
    return await AutolistTransfers()

}