const GetUserThumbnail = require('./Modules/User/GetUserThumbnail.js')
const GetRobuxBalance = require('./Modules/User/GetRobuxBalance.js')
const DeleteAssetFromInventory = require('./Modules/Assets/DeleteAssetFromInventory.js')

async function Test(ID) {

    const Response = await DeleteAssetFromInventory.func(ID)

    console.log(Response)

}