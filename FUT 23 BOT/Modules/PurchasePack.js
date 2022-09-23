const request = require('request');
const Config = require('./config.json').Settings;
const QuicksellItem = require('./QuicksellItem.js')
const ListItem = require('./ListItem.js')

async function PurchasePack (Pack_ID) {

    Pack_ID = 101

    return await new Promise(resolve => {

        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/purchased/items',
            method: 'POST',
            body: '{"currency":"COINS","packId":' + Pack_ID + '}',
            headers: {'X-UT-SID': Config.SESSION_ID}

        }, async (error, response, body) => {

            try{

                let Pack = JSON.parse(body)

                let len = Pack.itemList.length

                for (let i = 0; i < len; i++) {

                    let ItemList =  Pack.itemList[i]
                    let item_Type = ItemList.itemType

                    await new Promise(async(resolve) => {

                        if (item_Type == 'player') {

                            ListItem.func(ItemList.id, ItemList.marketDataMinPrice, ItemList.marketDataMinPrice + 100, ItemList.assetId)

                        }else {

                            request({
                            
                                url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/purchased/items',

                            })

                            QuicksellItem.func(ItemList.id, ItemList.discardValue)

                        }

                        setTimeout(() => resolve(), (ItemList.itemState == 'free' && 1000) || 10)

                    })

                    resolve('Purchased Pack')
                }
            }catch {

                resolve('An error occured: ' + response.statusCode + ': ' + 'You have unassigned items.')
            }

        })

    })
}

exports.func = async() => {

    return await PurchasePack()

}