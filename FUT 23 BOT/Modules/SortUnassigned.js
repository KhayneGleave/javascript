const request = require('request');
const Config = require('./config.json').Settings;
const SendToTransferList = require('./SendToTransferList.js')
const QuicksellItem = require('./QuicksellItem.js')

async function SortUnassigned () {

    return await new Promise(resolve => {
        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/purchased/items',
            headers: {'X-UT-SID': Config.SESSION_ID}

        }, async (error, response, body)=> {

            try{

                let ItemList1 = JSON.parse(body)

                let len = ItemList1.itemData.length

                if (len == 0 ) {

                    resolve('You have no unassigned items.')

                }

                for (let i = 0; i < len; i++) {

                    let ItemList = ItemList1.itemData[i]
                    let item_Type = ItemList.itemType
                    let Item_ID = ItemList.id

                    await new Promise(async(resolve) => {

                        if (item_Type == 'player') {


                            await SendToTransferList.func(ItemList.id)

                        }else {

                            await QuicksellItem.func(ItemList.id)

                        }

                        setTimeout(() => resolve(), 1000)

                    })

                    resolve('Test Success')
                }

            }catch {

                resolve('An error occured: ' + response.statusCode + ': ' + body)

            }

        })

    })

}

exports.func = async () => {

    return await SortUnassigned()

}