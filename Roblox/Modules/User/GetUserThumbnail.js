
const request = require('request')
const GetIdFromUsername = require('./GetIdFromUsername.js')

exports.func=async(User_ID)=>{

    return await new Promise(async resolve => {

        if (typeof(User_ID) == 'string') {

            User_ID = await GetIdFromUsername.func(User_ID)

        }

        request({

            url: 'https://thumbnails.roblox.com/v1/batch',
            method: 'POST',
            body: `[{"type":"Avatar","targetId":${User_ID},"token":"","format":"png","size":"720x720"}]`,
            headers: {"Content-Type": "application/json"},

        }, async (error, response, body) => {

            if (response.statusCode == 200) {

                resolve(JSON.parse(body).data[0].imageUrl)

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)
                
            }

        })

    })

}