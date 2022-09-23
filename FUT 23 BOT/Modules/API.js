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

