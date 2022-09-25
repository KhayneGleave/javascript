
const request = require('request');

exports.func = async(Username) => {

    return await new Promise(resolve => {

        request({

            url: `https://api.roblox.com/users/get-by-username?username=${Username}`,
            headers: {"Content-Type":"application/json"},
        
        }, async (_, response, body) => {
        
            if (response.statusCode == 200){

                resolve(JSON.parse(body).Id)

            }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

            }

        
        })
        
    })

}