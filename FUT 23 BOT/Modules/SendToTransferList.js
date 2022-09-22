const request = require('request');
const Config = require('./config.json').Settings;

async function SendToTransferList(Item_ID) {

    return await new Promise(resolve => {

            request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/item',
            method: 'PUT',
            body: '{"itemData":[{"id":' + Item_ID +',"pile":"trade"}]}',
            headers: {'X-UT-SID': Config.SESSION_ID}

        }, (error, response, body) => {

            try{

                resolve(response.statusCode, body)

            }catch {

                resolve('An error occured: ' + response.statusCode + ': ' + body)

            }finally {

                resolve()

            }
        
        })

    })

}

exports.func = async (Item_ID) => {

    return await SendToTransferList(Item_ID)

}