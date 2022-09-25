const request = require('request')


exports.func = async (User_ID) => {

    return await new Promise(async resolve => {

        request({

            url: `https://accountinformation.roblox.com/v1/users/${User_ID}/roblox-badges`,

        }, async (_, response, body) => {

            if (response.statusCode == 200) {

                resolve(JSON.parse(body))

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

            }

        })

    })

}