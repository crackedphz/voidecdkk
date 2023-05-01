const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 

module.exports = class GuildIconCommand extends Command {
    constructor (client) {
        super(client, {
            name: "guildicon",
            aliases: ['servericon'],
            category: "util",
            description: "Usa-se para ver a foto da guild."
        })
    }
	 run(message, args) {

        let guild = this.client.guilds.cache.get(args[0])
		if (!guild) {
			guild = message.guild
		}
		if (!guild.icon) return message.channel.send('Esta guild não possui um icone.')
		const img = guild.icon.startsWith("a_") ? guild.iconURL({ format: "gif", size: 2048 }) : guild.iconURL({ format: "webp", size: 2048 })
		const embed = new Discord.MessageEmbed() 
            .setColor('RED')
            .setImage(img)
            .setTitle(guild)
            .setURL(img)

		message.channel.send(embed)

	}
}