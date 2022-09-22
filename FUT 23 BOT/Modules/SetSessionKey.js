const request = require('request');
const Config = require('./config.json').Settings;

async function SetSessionKey(SessionID) {

    Config.SESSION_ID = SessionID

    return await new Promise(resolve => {

        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/usermassinfo',
            headers: {'X-UT-SID': Config.SESSION_ID}

        }, (error, response, body) => {

            if (response.statusCode == 200) {

                let UserInfo = JSON.parse(body)

                resolve('Logged in as ' + UserInfo.userInfo.personaName)

            }else {


                resolve('Error: ' + response.statusCode + ': ' + body)

            }

            let UserInfo = JSON.parse(body)


        })
    })

}

exports.func = async (SessionID) => {

    return await SetSessionKey(SessionID)

}