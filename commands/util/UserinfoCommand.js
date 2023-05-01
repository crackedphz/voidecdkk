const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 

module.exports = class UserinfoCommand extends Command {
    constructor (client) {
        super(client, {
            name: "userinfo",
            aliases: ["infouser"],
            category: "util",
            description: "Usa-se para ver as informações de uma pessoa."
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        let member
		if (args[0]) {
			member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
		} else {
			member = message.author
        }
        console.log()
    var botTraduzido = {
        "false":"❌ Não",
        "true":"✅ Sim"
    }

    var statusTraduzido = {
        "online":"🟢 Online",
        "dnd":"🔴 Ocupado",
        "idle":"🌙 Ausente",
        "offline":"⚪ Offline"
    }
    let embed = new Discord.MessageEmbed()
        .setColor("#FF8C00")
        .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
        .setThumbnail(member.avatarURL({ dynamic:true }))
        .setTitle("Informações Gerais")
        .setDescription(`**┏━━━━━━━━━━━━━━━━━━━━━┓**\n\n **📋 Nome**: ${member.tag}\n **💻 ID**: ${member.id}\n\n **📆 Primeira entrada no Discord**: ${moment.utc(member.createdAt).format("DD [de] MMMM [de] YYYY")}\n**📆 Primeira entrada no Servidor**: ${message.guild.member(member) ? moment.utc(message.guild.member(member).joinedAt).format("LLLL") : ("O membro não está no servidor.")}\n\n**BOT**: ${botTraduzido[member.bot]}\n**Status**: ${statusTraduzido[member.presence.status]}\n\n**┗━━━━━━━━━━━━━━━━━━━━━┛**`)
    message.channel.startTyping()
    message.channel.stopTyping(true)
    message.channel.send(embed);
    }
}