
const request = require('request');

exports.func = async(username) => {

    return await new Promise(resolve => {

        request({

            url: 'https://api.roblox.com/users/get-by-username?username=' + username,
            headers: {"Content-Type":"application/json"},
        
        }, async (error, response, body) => {
        
            try{

                const PlayerData = JSON.parse(body)

                resolve(PlayerData)

            }catch {

                resolve(`${response.statusCode}:  ${body}`)

            }
        
        })
        
    })

}