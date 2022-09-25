const request = require('request')
const Config = require('../config.json')

exports.func = async(Group_ID, Role_Name) => {

    return await new Promise(async resolve => {

        let success = false

        request({

            url: `https://groups.roblox.com/v1/groups/${Group_ID}/roles/permissions`,
            headers: {

                "Content-Type": "application/json",
                'cookie': '.ROBLOSECURITY=' + Config.ROBLOSECURITY,

            }

        }, async(_, response, body) => {

            if (response.statusCode == 200) {

                const Roles = JSON.parse(body).data

                for (let x in Roles) {

                    success = Role_Name.toLowerCase() == Roles[x].role.name.toLowerCase()

                    if (success) {

                        resolve(Roles[x].role.id)

                    }

                }

                resolve('Role not found')

                

            }else {

                console.log(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)
            }


        })

    })

}