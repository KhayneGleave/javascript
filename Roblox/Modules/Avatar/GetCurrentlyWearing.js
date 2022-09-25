const request = require('request')
const GetIdFromUsername = require('../User/GetIdFromUsername.js')

exports.func = async (User_ID) => {

    return await new Promise(async resolve => {

        if (typeof(User_ID) == 'string') {

            User_ID = await GetIdFromUsername.func(User_ID)

        }

        request({

            url: `https://avatar.roblox.com/v1/users/${User_ID}/currently-wearing`,

        }, async (_, response, body) => {

            if (response.statusCode == 200) {

                resolve(JSON.parse(body))

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

            }


        })

    })

}