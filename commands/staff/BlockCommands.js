const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 
module.exports = class PrefixCommand extends Command {
    constructor (client) {
        super(client, {
            name: "blockcommands",
            aliases: ["bcomandos"],
            category: "staff",
            description: "Comando para bloquear comandos em um certo canal",
            CommandChannel: true,
            UserPermission: ["MANAGE_GUILD"]
        })
    }

    async run(message, args) {
        let db = require('../../src/structures/database')
        if(!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply("Você não tem permissões para usar este comando.");
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        const modouso = new Discord.MessageEmbed() 
            .setColor("#FF8C00")
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}blockcommands [ID do canal]\`\`\n  **Sinônimos:** \`\`${ras.prefix}bcomandos [ID do canal]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if (!channel) return message.channel.send(modouso)
            const res = await db.Guilds.findOneAndUpdate({_id: message.guild.id}, {$set: {channelid: message.channel.id}  } , {new: true});
            const resBoolean = await db.Guilds.findOneAndUpdate({_id: message.guild.id}, {$set: {commandinchannel: "true"}}, {new: true})
            message.channel.send(`Certo, os comandos foram bloqueados nesse chat!`)

		
    }
} 