const request = require('request')
const Config = require('../config.json')

exports.func = async(Group_Name) => {

    return await new Promise(async resolve => {

        let success = false

        request({

            url: `https://groups.roblox.com/v1/groups/search?cursor=&keyword=${Group_Name}&limit=25&prioritizeExactMatch=true&sortOrder=Asc`,
            headers: {

                "Content-Type": "application/json; charset=utf-8",
                'cookie': `.ROBLOSECURITY=${Config.ROBLOSECURITY}`,
                
            }

        }, async(_, response, body) => {

            if (response.statusCode == 200) {

                resolve(JSON.parse(body).data[0].id)

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)
                
            }


        })

    })

}