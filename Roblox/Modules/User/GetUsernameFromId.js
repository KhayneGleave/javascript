
const request = require('request');

exports.func = async(User_ID) => {

    return await new Promise(resolve => {

        request({

            url: `https://api.roblox.com/users/${User_ID}`,
            headers: {"Content-Type":"application/json"},
        
        }, async (error, response, body) => {
        
           if (response.statusCode == 200) {

                resolve(JSON.parse(body).Username)


           }else {

                resolve(`An error occured with this action, recieved ${response.statusCode} from server with response [${JSON.parse(body).errors[0].message}]`)

           }
        
        })
        
    })

}