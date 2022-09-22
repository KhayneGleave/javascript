//NOT COMPLETED

const request = require('request');
let Ancestor = {

    SessionID: 'SESSION_ID_HERE', //Will need to change upon every browser reload/ expired session notice!

}

Ancestor.SendItemToClub = function(ItemID){

    return new Promise(resolve => {

        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/item',
            method: 'PUT',
            body: '{"itemData":[{"id":' + ItemID +',"pile":"club"}]}',
            headers: {'X-UT-SID': Ancestor.SessionID}

        }, function(error, response, body) {

            try {

                let ItemDetails = JSON.parse(body)

                console.log(ItemDetails.itemData[0].success == false && 'Action Failed' || 'Action Completed')

            }catch {

                console.warn(error || body || 'an error occurred')

            } finally {
                
                resolve()
            }

        })

    })

}


Ancestor.AutolistTransfers = function() {

    request({

        url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/tradepile',
        headers: {'X-UT-SID': Ancestor.SessionID}

    }, async (error, response, body) => {

        try{

            let transferPile = JSON.parse(body)

            let len = transferPile.auctionInfo.length

            for (let i = 0; i < len; i++) {

                let ItemInfo = transferPile.auctionInfo[i]

                await new Promise(async(resolve) => {

                    console.log(ItemInfo.tradeState)

                    if (ItemInfo.tradeState == null || ItemInfo.tradeState == 'expired') {

                        let ItemData = ItemInfo.itemData

                        console.log(ItemInfo)

                        await Ancestor.ListItem(ItemData.id, ItemData.marketDataMinPrice, ItemData.marketDataMinPrice + 50)
                        Ancestor.GetCredits()
                    }

                    setTimeout(()=>resolve(),1000)

                    resolve()

                })
                

            }

        }catch {

        }

    })
    
}
