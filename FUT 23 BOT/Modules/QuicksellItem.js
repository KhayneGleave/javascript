const request = require('request');
const Config = require('./config.json').Settings;

async function QuicksellItem(Item_ID) {

    return await new Promise(resolve =>{

        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/item/' + Item_ID.toString(),
            method: 'DELETE',
            headers: {'X-UT-SID': Config.SESSION_ID}

        }, (error, response, body) => {

            try{

                resolve((response.statusCode == 200 && 'Quick Sold: ' + Item_ID.toString()) || 'An error occured: ' + response.statusCode + ': ' + body)

            }catch {

                resolve('An error occured: ' + response.statusCode + ': ' + body)

            }finally {

                resolve()

            }

        })

    })

}

exports.func = async (Item_ID) => {

    return await QuicksellItem(Item_ID)

}