const OnNotification = require('../Util/OnNotification.js')
const events = require('events')
const GetUsernameFromID = require('../User/GetUsernameFromId.js')

exports.func = async () => {

    return await new Promise(async resolve => {

        const notifications = await OnNotification.func()
        const newEvent = new events.EventEmitter()
    
        notifications.on('data', (name, message) => {
    
            if (name == 'ChatNotifications' && message.Type == 'ParticipantTyping') {
    
                newEvent.emit('data', {
    
                    UserId: message.UserId,
                    ConversationId: message.ConversationId,
                    IsTyping: message.IsTyping
    
                })
    
            }
    
        })

        resolve(newEvent)

    })

}

// async function example() {

// const userTyping = await exports.func()

//     userTyping.on("data", async function(data) {

//         const User = await GetUsernameFromID.func(data.UserId)

//         console.log(`${User} ${(data.IsTyping && 'started') || 'stopped'} typing...`)

//     })

// }

// example()
