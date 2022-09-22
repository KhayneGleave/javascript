const request = require('request');
const Config = require('./config.json').Settings;

async function GetTradePile() {

    return await new Promise(resolve => {

        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/tradepile',
            headers: {'X-UT-SID': Config.SESSION_ID}
    
        }, (error, response, body) => {

            console.log(response.statusCode)
    
            try{

                if (response.statusCode == 200) {


                    const TradePile = JSON.parse(body)

                    resolve(TradePile)

                }

            }catch {

                resolve('An error occured: ' + response.statusCode + ': ' + body)
    
            }finally {

                resolve();
            }

        })

    })

}

exports.func = async() => {

    return await GetTradePile()

}