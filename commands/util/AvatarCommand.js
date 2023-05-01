const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 

module.exports = class AvatarCommand extends Command {
    constructor (client) {
        super(client, {
            name: "avatar",
            aliases: [],
            category: "util",
            description: "Usa-se para ver o avatar da pessoa."
        })
    }
	 run(message, args) {

		let member = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author
		let avatar
		if (member.avatar) {
			if (!member.avatar.startsWith("a_")) {
				avatar = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`
			} else {
				avatar = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.gif?size=2048`
			}
		} else {
			avatar = member.displayAvatarURL()
		}



        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        let db = require('../../src/structures/database')

		const embed = new Discord.MessageEmbed() 
			.setColor('RED')
			.setImage(avatar)
			.setFooter(`Avatar do usuário \[${member.tag}\]`, message.author.avatarURL({ dynamic:true }))
            .setTitle((`Download do Avatar`))
            .setURL(avatar)
		message.channel.send(embed)

	}
}