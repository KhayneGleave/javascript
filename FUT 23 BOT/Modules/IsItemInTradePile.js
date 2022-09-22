const request = require('request');
const Config = require('./config.json').Settings;
const GetTradePile = require('./GetTradePile.js')

async function IsItemInTradePile(Item_ID){

    var Found = false

    return await new Promise(async resolve => {

        const TradePile = await GetTradePile.func()

        let len = TradePile.auctionInfo.length

        for (let i = 0; i < len; i++) {

            const Item = TradePile.auctionInfo[i].itemData

            Found = Item.id == Item_ID

            console.log( Item.id, Item_ID, Found)

            if (Found) {

                break

            }

        }

        resolve(Found)

    })

}

exports.func = async(Item_ID) => {

    return await IsItemInTradePile(Item_ID)

}