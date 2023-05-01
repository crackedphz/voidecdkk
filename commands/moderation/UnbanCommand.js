const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class UnbanCommand extends Command {
    constructor (client) {
        super(client, {
            name: "unban",
            aliases: ["desbanir", "pardon"],
            category: "mod",
            description: "Desbane o usuário do servidor.",
            UserPermission: ["BAN_MEMBERS"],
            CommandChannel: true
        })
    }

    async run(message, args) {
        if(!message.member.hasPermission('BAN_MEMBERS'))
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}unban [ID da pessoa] [Motivo]\`\`\n  **Sinônimos:** \`\`${ras.prefix}desbanir [ID da pessoa] [Motivo]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`) 

        if (!args[0]) return message.channel.send(modouso)
        let member = await message.guild.fetchBans()
        let ban
        ban = member.get(`${args[0]}`.replace(/[<@!>]/g, ""))
        if (!ban) return message.reply("este usuário não está banido.")
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "Nenhum motivo"
        }
        message.guild.members.unban(ban.user.id).then(user => {
            message.reply("usuário desbanido com sucesso.")

            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(`Desbanido | ${user.tag}`, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .addField("Usuário desbanido", `\`${user.tag}\``, true)
            .addField("ID do usuário", `\`${user.id}\``, true)
            .addField("Desbanido por", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)

            let channel = this.client.guilds.cache.get("945857241888731147").channels.cache.get("1012118335489585255")
            channel.send(embed)

        })
    }
}