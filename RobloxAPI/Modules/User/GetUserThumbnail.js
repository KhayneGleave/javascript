
const request = require('request')

exports.func=async(User_ID)=>{

    return await new Promise(resolve => {

        request({

            url: 'https://thumbnails.roblox.com/v1/batch',
            method: 'POST',
            body: `[{"type":"Avatar","targetId":${User_ID},"token":"","format":"png","size":"720x720"}]`,
            headers: {"Content-Type": "application/json"},

        }, async (error, response, body) => {

            try{

                const PlayerData = JSON.parse(body)
                resolve(PlayerData.data[0].imageUrl)

            }catch {

                resolve(`${response.statusCode}:  ${body}`)
                
            }

        })

    })

}