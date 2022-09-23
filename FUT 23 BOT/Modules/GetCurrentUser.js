const request = require('request');
const Config = require('../Modules/config.json').Settings;

async function GetCurrentUser() {

    return await new Promise(resolve => {
        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/usermassinfo',
            headers: {'X-UT-SID': Config.SESSION_ID}

        }, (error, response, body) => {

            if (response.statusCode == 200) {

                let UserInfo = JSON.parse(body)

                resolve('Currently Logged in as, ' + UserInfo.userInfo.personaName + '.')

            }else {


                resolve('Error: ' + response.statusCode + ': ' + body)

            }


        })

    })
    
}

exports.func = async() => {

    return await GetCurrentUser()

}