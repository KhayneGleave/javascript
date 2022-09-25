
const request = require('request');
const Config = require('../config.json')
const GetToken = require('../Util/GetToken.js')

exports.func = async(User_ID) => {

    return await new Promise(async resolve => {

        const x_csrf = await GetToken.func()

        request({

            url: 'https://chat.roblox.com/v2/start-one-to-one-conversation',
            method: 'POST',
            body: `{"participantUserId":${User_ID}}`,
            headers: {

                "Content-Type": "application/json",
                'cookie': `.ROBLOSECURITY=${Config.ROBLOSECURITY}`,
                'x-csrf-token': x_csrf
            
            },
        
        }, async (_, response, body) => {
        
            if (response.statusCode == 200) {

                resolve(JSON.parse(body).conversation.id)

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

            }
        
        })
        
    })

}