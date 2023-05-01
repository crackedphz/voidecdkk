const Command = require("../../src/structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class PokeCommand extends Command {
    constructor (client) {
        super(client, {
            name: "poke",
            aliases: ["cutucar"],
            category: "fun",
            description: "Usa-se para cutucar uma pessoa.",
            CommandChannel: true
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        const modouso = new Discord.MessageEmbed() 
           
            .setColor('#FF0000')
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}poke [Usuário]\`\`\n  **Sinônimos:** \`\`${ras.prefix}cutucar [Usuário]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)

        let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
        if (!member) return message.channel.send(modouso)
		let img = await neko.sfw.poke()
		const embed = new Discord.MessageEmbed()
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setColor('#FF0000')
			.setDescription(`:point_left: ${message.author} cutucou ${member}!`)
			.setImage(img.url)

		message.channel.send(embed)
    
       
    }
}