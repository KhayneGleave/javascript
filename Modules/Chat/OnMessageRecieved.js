const OnNotification = require('../Util/OnNotification.js')
const events = require('events')
const GetUsernameFromID = require('../User/GetUsernameFromId.js')
const GetUserIDFromConversationID = require('../User/GetUserIDFromConversationID.js')
const GetLatestMessageFromConversationID = require('../Chat/GetLatestMessageFromConversationID.js')

exports.func = async () => {

    return await new Promise(async resolve => {

        const notifications = await OnNotification.func()
        const newEvent = new events.EventEmitter()
    
        notifications.on('data', (name, message) => {

            if (name === 'ChatNotifications' && message.Type === 'NewMessage') {

                newEvent.emit('data', message.ConversationId)

            }
        
        })

        resolve(newEvent)

    })

}



// async function example() {

// const Message_Received = await exports.func()

//     Message_Received.on("data", async function(data) {

//         const User_ID = await GetUserIDFromConversationID.func(data)

//         const User_Name = await GetUsernameFromID.func(User_ID)

//         const Message = await GetLatestMessageFromConversationID.func(data)

//         console.log(`You received a new message from ${User_Name}. Message: ${Message}`)

//     })

// }

// example()
