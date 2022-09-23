const request = require('request');
const { REST, Client, GatewayIntentBits, SlashCommandBuilder, Routes, EmbedBuilder } = require('discord.js');
const Config = require('./config.json').Settings;

const exampleEmbed = new EmbedBuilder().setColor(0x0099FF).setTimestamp().setFooter({ text: 'Made by Khayne Gleave', iconURL: 'https://cdn.discordapp.com/avatars/1022425579095605328/f0f8ca1c342357e236d9e420d1ab8932.webp?size=80' });

async function QuicksellItem(Item_ID, Discard_Value) {

    return await new Promise(resolve =>{

        request({

            url: 'https://utas.mob.v1.fut.ea.com/ut/game/fifa23/item/' + Item_ID.toString(),
            method: 'DELETE',
            headers: {'X-UT-SID': Config.SESSION_ID}

        }, async (error, response, body) => {

            try{

                const channel = await Config.Client.channels.fetch(Config.ADMIN_CHANNEL);

                exampleEmbed.setFields({ name: 'Status', value: (response.statusCode == 200 && 'Quick Sold Item For: ' + Discard_Value) || 'An error occured: ' + response.statusCode + ': ' + body, inline: false })
                // exampleEmbed.setThumbnail('https://www.ea.com/fifa/ultimate-team/web-app/content/23DF3AC5-9539-438B-8414-146FAFDE3FF2/2023/fut/items/images/mobile/portraits/' + Asset_ID.toString() + '.png')
                channel.send({ embeds: [exampleEmbed] });

            }catch {

                resolve('An error occured: ' + response.statusCode + ': ' + body)

            }finally {

                resolve()

            }

        })

    })

}

exports.func = async (Item_ID, Discard_Value) => {

    return await QuicksellItem(Item_ID, Discard_Value)

}