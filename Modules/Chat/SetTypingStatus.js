const request = require('request')
const GetToken = require('../Util/GetToken.js')
const Config = require('../config.json')
const GetConversationId = require('./GetConversationId.js')
const GetIdFromUsername = require('../User/GetIdFromUsername.js')

exports.func = async (User_ID, SetTyping) => {

    const User_Name = User_ID

    return await new Promise(async resolve => {

        if (typeof(User_ID) == 'string') {

            User_ID = await GetIdFromUsername.func(User_ID)

        }

        const x_csrf = await GetToken.func()
        const Conversation_ID = await GetConversationId.func(User_ID)

        request({

            url: 'https://chat.roblox.com/v2/update-user-typing-status',
            method: 'POST',
            body: `{"conversationId":${Conversation_ID},"isTyping":${SetTyping}}`,
            headers: {

                "Content-Type": "application/json",
                'cookie': `.ROBLOSECURITY=${Config.ROBLOSECURITY}`,
                'x-csrf-token': x_csrf
            
            },

        }, async(_, response, body) => {

            if (response.statusCode == 200) {

                if (JSON.parse(body).resultType == 'Success') {

                    resolve(`Set Typing Status To ${User_Name} to ${SetTyping}.`)

                }

            }else {

                
                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

            }

        })

    })

}