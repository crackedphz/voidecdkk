const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class AnnounceCommand extends Command {
    constructor (client) {
        super(client, {
            name: "anuncio",
            aliases: ['announce'],
            category: "staff",
            description: "Envia um embed no canal de texto desejado.",
            UserPermission: ["MANAGE_GUILD"],
            CommandChannel: true
        })
    }

    async run(message, args) {
        if(!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply("Você não tem permissões para usar este comando.");
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        const modouso = new Discord.MessageEmbed() 
           
            .setColor("#FF8C00")
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}anuncio [chat desejado] [anuncio]\`\`\n  **Sinônimos:** \`\`${ras.prefix}announce [chat desejado] [anuncio]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)

        
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if (!channel) return message.channel.send(modouso)
        let msg = args.slice(1).join(" ")
        if (!msg) return message.reply("você precisa informar o que irá ter no embed")
        let embed = new MessageEmbed()
        .setColor(this.client.colors.default)
        .setDescription(msg)
        .setFooter(`Enviado por ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp(new Date())

        message.channel.send(`**${message.author.username}**, você deseja mencionar todo mundo?`).then(msg => {
			setTimeout(() => {
				msg.react("👍")
			}, 500)
			setTimeout(() => {
				msg.react("👎")
			}, 1000)

            const collector = msg.createReactionCollector((reaction, user) => (reaction.emoji.name === "👍", "👎") && (user.id !== this.client.user.id && user.id === message.author.id))
            collector.on("collect", r => {
                switch (r.emoji.name) {
                    case "👍":
                    channel.send("@everyone", embed, {disableEveryone: false})
                    msg.delete()
                    message.reply("certo, embed enviado com sucesso.")
                    break;
                    case "👎":
                    channel.send(embed)
                    msg.delete()
                    message.reply("certo, embed enviado com sucesso.")
                }
            })
        })
    }
}