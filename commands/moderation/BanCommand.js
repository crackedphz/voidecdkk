const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class BanCommand extends Command {
    constructor (client) {
        super(client, {
            name: "ban",
            aliases: ["banir"],
            category: "mod",
            description: "Bane o usuário do servidor",
            UserPermission: ["BAN_MEMBERS"],
            CommandChannel: true
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        if(!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply("Você não tem permissões para usar este comando.");
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        const modouso = new Discord.MessageEmbed() 
           
            .setColor("#FF8C00")
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}ban [Pessoa] [Motivo]\`\`\n  **Sinônimos:** \`\`${ras.prefix}banir [Pessoa] [Motivo]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)

        if (!args[0]) return message.channel.send(modouso)
        let member = await this.client.users.fetch(`${args[0]}`.replace(/[<@!>]/g, ""))
        let ban
        ban = message.guild.members.cache.get(member.id)
        if (!ban) {
            ban = member
        }
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "Nenhum motivo."
        }
        if (ban.id === message.author.id) return message.channel.send(`${message.author}, Eu não tenho permissão pra banir esta pessoa :person_shrugging: `)
        message.guild.members.ban(ban.id, {
            days: 7,
            reason: `Punido por: ${message.author.tag} - Motivo: ${reason}`
        }).then(user => {
            message.reply("usuário banido com sucesso.")
            
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(`Banido | ${user.tag}`, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .addField("Usuário banido", `\`${user.tag}\``, true)
            .addField("ID do usuário", `\`${user.id}\``, true)
            .addField("Quem puniu", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)

            let channel = this.client.guilds.cache.get("945857241888731147").channels.cache.get("1012118335489585255")
            channel.send(embed)
            
        })
    }
}