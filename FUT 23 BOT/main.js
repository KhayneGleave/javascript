//DISCORD BOT

const { REST, Client, GatewayIntentBits, SlashCommandBuilder, Routes, EmbedBuilder } = require('discord.js');
const Config = require('./Modules/config.json').Settings;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// const QuicksellItem = require('./Modules/QuicksellItem.js')
const PurchasePack = require('./Modules/PurchasePack.js')
const GetCredits = require('./Modules/GetCredits.js');
const SortUnassigned = require('./Modules/SortUnassigned.js')
const SetSessionKey = require('./Modules/SetSessionKey.js')
const ListItem = require('./Modules/ListItem.js')

const exampleEmbed = new EmbedBuilder().setColor(0x0099FF).setTimestamp().setFooter({ text: 'Made by Khayne Gleave', iconURL: 'https://cdn.discordapp.com/avatars/1022425579095605328/f0f8ca1c342357e236d9e420d1ab8932.webp?size=80' });
const commands = [

    new SlashCommandBuilder().setName('quicksellitem').setDescription('quicksells a player with the given ID.'),
    new SlashCommandBuilder().setName('getcredits').setDescription('quicksells a player with the given ID.'),
    new SlashCommandBuilder().setName('purchasepack').setDescription('quicksells a player with the given ID.'),
    new SlashCommandBuilder().setName('sortunassigned').setDescription('quicksells a player with the given ID.'),
    new SlashCommandBuilder().setName('setsessionkey').setDescription('quicksells a player with the given ID.').addStringOption(option=>option.setName('key').setDescription('Changes the session ID to fix any invalidity error').setRequired(true)),
    new SlashCommandBuilder().setName('listitem').setDescription('lists the item with the given ID on the transfer market.').addStringOption(option=>option.setName('input').setDescription('Lists the provided item on the transfer market').setRequired(true))

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(Config.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(Config.CLIENT_ID_TOKEN, Config.BOT_ID), { body: commands }).then((data) => console.log(`Successfully registered ${data.length} application commands.`)).catch(console.error);

client.on("ready", () => {client.user.setActivity('+help', {type: "PLAYING"});});

client.on('interactionCreate', async interaction => {

    if (interaction.user.id !== Config.CLIENT_ID) {

        exampleEmbed.setFields({ name: 'Error', value: 'You\'re not whitelisted for this bot.', inline: false })

        return interaction.reply({ embeds: [exampleEmbed] });

    }

	if (!interaction.isChatInputCommand()) return

	const { commandName } = interaction;

	if (commandName === 'getcredits') {

        let Credits = await GetCredits.func()

        exampleEmbed.setFields({ name: 'Credits', value: Credits, inline: false })

		await interaction.reply({ embeds: [exampleEmbed] });

	} else if (commandName === 'purchasepack') {

		let Response = await PurchasePack.func()
        exampleEmbed.setFields({ name: 'Status', value: Response, inline: false })

        await interaction.reply({ embeds: [exampleEmbed] });

	} else if (commandName === 'sortunassigned') {

		let Response = await SortUnassigned.func()
        exampleEmbed.setFields({ name: 'Status', value: Response, inline: false })

        await interaction.reply({ embeds: [exampleEmbed] });
 
	} else if (commandName === 'setsessionkey') {

		let Response = await SetSessionKey.func(interaction.options.getString('key'))
        exampleEmbed.setFields({ name: 'Status', value: Response, inline: false })

        await interaction.reply({ embeds: [exampleEmbed] });

	} else if (commandName === 'listitem') {

		let Response = await ListItem.func(interaction.options.getString('input'))
        exampleEmbed.setFields({ name: 'Status', value: Response, inline: false })

        await interaction.reply({ embeds: [exampleEmbed] });

	}
});

// Login to Discord with your client's token

client.login(Config.BOT_TOKEN)