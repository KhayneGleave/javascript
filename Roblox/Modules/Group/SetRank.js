const request = require('request')
const GetIdFromUsername = require('../User/GetIdFromUsername.js')
const GetToken = require('../Util/GetToken.js')
const Config = require('../config.json')
const GetGroupRoleByName = require('./GetGroupRoleByName.js')
const GetGroupIDByName = require('./GetGroupIDByName.js')

exports.func = async(Group_ID, User_ID, Role_Name) => {

    return await new Promise(async resolve => {

        const User_Name = User_ID

        const x_csrf = await GetToken.func()

        if (typeof(User_ID) == 'string') {

            User_ID = await GetIdFromUsername.func(User_ID)

        }

        if (typeof(Group_ID) == 'string') {

            Group_ID = await GetGroupIDByName.func(Group_ID)            

        }

        let Role_ID = await GetGroupRoleByName.func(Group_ID, Role_Name)

        request({

            url: `https://groups.roblox.com/v1/groups/${Group_ID}/users/${User_ID}`,
            method: 'PATCH',
            body: `{"roleId":${Role_ID}}`,
            headers: {

                "Content-Type": "application/json",
                'cookie': '.ROBLOSECURITY=' + Config.ROBLOSECURITY,
                'x-csrf-token': x_csrf

            }

        }, async(_, response, body) => {

            if (response.statusCode == 200) {

                console.log(`Successfully added role: ${Role_Name} to  member: ${User_Name}`)

            }else {

                console.log(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)
            
            }

        })

    })

}