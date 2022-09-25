const SignalR = require('signalr-client').client
const events = require('events')
const Config = require('../config.json')

exports.func  = async() => {

    return await new Promise(resolve => {

        const notifications = new events.EventEmitter()
        const client = new SignalR('wss://realtime.roblox.com/notifications', ['usernotificationhub'], 3, true) // wss for https
        client.headers.Cookie = `.ROBLOSECURITY=${Config.ROBLOSECURITY}`

        client.on('usernotificationhub', 'notification', function (name, message) {

            notifications.emit('data', name, JSON.parse(message))
        
        })

        client.start()
        resolve(notifications)

    })

}