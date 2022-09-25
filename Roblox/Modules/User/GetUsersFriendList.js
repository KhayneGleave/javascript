const request = require('request')
const GetIdFromUsername = require('./GetIdFromUsername.js')

exports.func = async (User_ID) => {

    return await new Promise(async resolve => {

        if (typeof(User_ID) == 'string') {

            User_ID = await GetIdFromUsername.func(User_ID)

        }

        request({

            url: `https://friends.roblox.com/v1/users/${User_ID}/friends`,

        }, async (_, response, body) => {

            if (response.statusCode == 200) {

                console.log(JSON.parse(body))

            }else {

                console.log(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

            }


        })

    })

}