const Command = require("../../src/structures/command")
const parse = require("parse-duration")
const ms = require("ms");
const config = require('../../config.json')
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class MuteCommand extends Command {
    constructor (client) {
        super(client, {
            name: "mute",
            aliases: ['mutar'],
            category: "mod",
            description: "Silencia o usuário permanentemente (até que seja retirado).",
            UserPermission: ["KICK_MEMBERS", "MUTE_MEMBERS"],
            CommandChannel: true
        })
    }

    async run(message, args) {
        let db = require('../../src/structures/database')
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("você não tem permissões para usar este comando.");
        const ras = await db.Guilds.findOne({ _id: message.guild.id })
        const modouso = new Discord.MessageEmbed()
    
          .setColor("#FF8C00")
          .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic: true }))
          .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
          .setTitle('Atlantis Bot™')
          .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
          .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}mute [usuario] [motivo]\`\`\n  **Sinônimos:** \`\`${ras.prefix}mutar [usuario] [motivo]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
    
    
        const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
        if (!args[0]) return message.channel.send(modouso)
        let guild = message.guild.members.cache.get(member.id)
        if (!guild) return message.reply("este usuário não está no servidor.")
        let reason = args.slice(2).join(" ")
        if (!reason) {
          reason = "Nenhum motivo"
        }
    
    
        let role = message.guild.roles.cache.find(r => r.name === "「❗」Muted")
        if (!role) {
          role = await message.guild.roles.create({
            data: {
              name: "「❗」Muted",
              color: "#FF0000",
              permissions: []
            }
          })
          message.guild.channels.cache.forEach(async channel => {
            await channel.createOverwrite(role.id, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false,
              CONNECT: false
            })
          })
        }
    
        // let channel2 = this.client.guilds.cache.get("663436717423984695").channels.cache.get("753075030082060389")
    
        member.roles.add(role.id).then(() => {
          message.reply("O usuário foi silenciado até que alguém retire seu mute.")
    
          const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`Silenciado`, member.user.displayAvatarURL())
            .setThumbnail('https://i.pinimg.com/originals/a1/1f/a3/a11fa3cdbfd567f934b6c0151c6a6d8b.gif')
            .addField("Usuário silenciado", `\`${member.user.tag}\``, true)
            .addField("ID do usuário", `\`${member.id}\``, true)
            .addField("Mutado por", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)
    
            let channel = this.client.guilds.cache.get(config.guildId).channels.cache.get(config.canais.mute)
            channel.send(`\`\`\`ini\n[Logs] O usuário [${member.user.tag}] foi mutado hoje às ${horario}.\n\`\`\``)
        })
    }
}