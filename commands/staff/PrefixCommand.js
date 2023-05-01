const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 
module.exports = class PrefixCommand extends Command {
    constructor (client) {
        super(client, {
            name: "prefix",
            aliases: ["prefixo"],
            category: "staff",
            description: "Comando alterar a prefix do servidor!",
            CommandChannel: true,
            UserPermission: ["MANAGE_GUILD"]
        })
    }

    async run(message, args) {
        if(!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply("Você não tem permissões para usar este comando.");
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}prefix [prefix]\`\`\n  **Sinônimos:** \`\`${ras.prefix}prefixo [prefix]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        if (!args[0]) return message.channel.send(modouso)
        if (args[0].length > 3) return message.channel.send('O prefix só pode conter 3 caracteres.')
        const res = await db.Guilds.findOneAndUpdate({_id: message.guild.id}, {$set: {prefix: args[0]}  } , {new: true});
            message.channel.send(`Certo, o prefix foi alterado para \`${res.prefix}\``)

		
    }
} 