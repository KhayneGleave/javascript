const request = require('request');
const { REST, Client, GatewayIntentBits, SlashCommandBuilder, Routes, EmbedBuilder } = require('discord.js');
const Config = require('./config.json').Settings;
const SendToTransferList = require('./SendToTransferList.js')
const IsItemInTradePile = require('./IsItemInTradePile.js');
const SendBotMessage = require('../main.js')

const exampleEmbed = new EmbedBuilder().setColor(0x0099FF).setTimestamp().setFooter({ text: 'Made by Khayne Gleave', iconURL: 'https://cdn.discordapp.com/avatars/1022425579095605328/f0f8ca1c342357e236d9e420d1ab8932.webp?size=80' });

async function ListItem(Item_ID, Min, Max, Asset_ID) {

    Min = Min || 150
    Max = Max || 200

    console.log(Asset_ID)
    console.log('https://www.ea.com/fifa/ultimate-team/web-app/content/23DF3AC5-9539-438B-8414-146FAFDE3FF2/2023/fut/items/images/mobile/portraits/' + Asset_ID.toString() + '.png')

    return await new Promise(async resolve => {

        const IsItemInCurrentTradePile = await IsItemInTradePile.func(Item_ID)

        if (!IsItemInCurrentTradePile) {

                await SendToTransferList.func(Item_ID)

        }

        request({

            url: 'https://www.fifaindex.com/player/' + Asset_ID

        }, async (error, response, body) => {

            let PlayerName = null

            if (response.statusCode == 200) {

                PlayerName = body.split('href="/ar/player/' + Asset_ID + '/')[1].split('/')[0].replace('-', ' ')

            }else {

                PlayerName = 'unknown player'

            }

            request({

                url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/auctionhouse',
                method: 'POST',
                body: '{"buyNowPrice":' + Max + ',"duration":3600,"itemData":{"id":' + Item_ID + '},"startingBid":' + Min + '}',
                headers: {'X-UT-SID': Config.SESSION_ID}
        
            }, async (error, response, body) => {

                try{

                    const channel = await Config.Client.channels.fetch(Config.ADMIN_CHANNEL);

                    exampleEmbed.setFields({ name: 'Status', value: (response.statusCode == 200 && 'Listed item: ' + PlayerName + ' For Max: ' + Max + ', Min: ' + Min) || response.statusCode + ': ' + body, inline: false })
                    exampleEmbed.setThumbnail('https://www.ea.com/fifa/ultimate-team/web-app/content/23DF3AC5-9539-438B-8414-146FAFDE3FF2/2023/fut/items/images/mobile/portraits/' + Asset_ID.toString() + '.png')
                    channel.send({ embeds: [exampleEmbed] });
                    
                }catch {

                    console.log('An error occured: ' + response.statusCode + ': ' + body)
        
                } finally {

                    resolve();
                }

            })

       })


    })

    // console.log(Config.Client)




}

exports.func = async(Item_ID, Min, Max, Asset_ID) => {

    return await ListItem(Item_ID, Min, Max, Asset_ID)

}