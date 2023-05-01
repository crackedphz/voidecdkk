const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class KickCommand extends Command {
    constructor (client) {
        super(client, {
            name: "kick",
            aliases: ["expulsar"],
            category: "mod",
            description: "Expulsa um membro do servidor.",
            UserPermission: ["KICK_MEMBERS"],
            CommandChannel: true
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        if(!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply("Você não tem permissões para usar este comando.");
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        const modouso = new Discord.MessageEmbed() 
           
            .setColor("#FF8C00")
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}kick [Pessoa] [Motivo]\`\`\n  **Sinônimos:** \`\`${ras.prefix}expulsar [Pessoa] [Motivo]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`) 
        
        if (!args[0]) return message.channel.send(modouso)
        let member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
        let inGuild = message.guild.members.cache.get(member.id)
        if (!inGuild) return message.reply("este usuário não está no servidor.")
        if (!message.guild.member(member).kickable) return message.reply('Eu não tenho permissão pra kickar esta pessoa :person_shrugging: ');
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "Nenhum motivo"
        }

        inGuild.kick(reason).then(() => {
            message.reply("usuário expulso com sucesso.")
           
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(`Expulso | ${member.tag}`, member.displayAvatarURL())
            .setThumbnail(member.displayAvatarURL())
            .addField("Usuário expulso", `\`${member.tag}\``, true)
            .addField("ID do usuário", `\`${member.id}\``, true)
            .addField("Quem puniu", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)
            
            
            let channel = this.client.guilds.cache.get("945857241888731147").channels.cache.get("1012118335489585255")
            channel.send(embed)

        })
    }
}