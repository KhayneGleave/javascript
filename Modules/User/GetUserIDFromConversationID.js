const request = require('request')
const Config = require('../config.json')

exports.func = async(Conversation_ID) => {

    return await new Promise(resolve => {

        request({
            
            url: `https://chat.roblox.com/v2/get-messages?conversationId=${Conversation_ID}&pageSize=30`,
            headers: {
                
                'cookie': `.ROBLOSECURITY=${Config.ROBLOSECURITY}`,
                'content-type': 'application/json; charset=utf-8'
            
            },

        }, async (_, response, body) => {
        
            if (response.statusCode == 200) {
    
                resolve(JSON.parse(body)[0].senderTargetId)
    
            }else {
    
                resolve(`${response.statusCode}:  ${body}`)
    
            }
    
        })

    })

}