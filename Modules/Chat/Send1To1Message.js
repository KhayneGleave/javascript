const request = require('request');
const Config = require('../config.json')
const GetToken = require('../Util/GetToken.js')
const GetConversationId = require('./GetConversationId.js')
const GetIdFromUsername = require('../User/GetIdFromUsername.js')

exports.func = async(User_ID, Message) => {

    return await new Promise(async resolve => {

        if (typeof(User_ID) == 'string') {

            User_ID = await GetIdFromUsername.func(User_ID)

        }

        const x_csrf = await GetToken.func()
        const Conversation_ID = await GetConversationId.func(User_ID)

        request({

            url: 'https://chat.roblox.com/v2/send-message',
            method: 'POST',
            body: `{"conversationId":"${Conversation_ID}","message":"${Message}"}`,
            headers: {

                "Content-Type": "application/json",
                'cookie': `.ROBLOSECURITY=${Config.ROBLOSECURITY}`,
                'x-csrf-token': x_csrf
            
            },
        
        }, async (_, response, body) => {
        
            if (response.statusCode == 200) {

                resolve(JSON.parse(body))

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

            }
        
        })
        
    })

}