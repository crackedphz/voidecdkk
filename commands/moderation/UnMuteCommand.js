const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
const config = require('../../config.json')
module.exports = class UnMuteCommand extends Command {
    constructor (client) {
        super(client, {
            name: "unmute",
            aliases: ["desmutar"],
            category: "mod",
            description: "Retira o silenciamento do usuário desejado.",
            UserPermission: ["MUTE_MEMBERS", "KICK_MEMBERS"],
            CommandChannel: true
        })
    }

    async run(message, args) {
        let db = require('../../src/structures/database')
        if (!message.member.hasPermission('KICK_MEMBERS'))
      return message.reply("você não tem permissões para usar este comando.");
    let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
    let horario = data[1]
    let diamesano = data[0].split("/")
    const ras = await db.Guilds.findOne({ _id: message.guild.id })
    const modouso = new Discord.MessageEmbed()
      .setColor("#FF8C00")
      .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic: true }))
      .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
      .setTitle('Atlantis Bot™')
      .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
      .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}unmute [usuario] [motivo]\`\`\n  **Sinônimos:** \`\`${ras.prefix}desmutar [usuario] [motivo]\`\`\n\n\`\`(Não é obrigatório um motivo)\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)


    if (!args[0]) return message.channel.send(modouso)
    const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
    if (!member) return message.reply("este usuário não está no servidor.")
    const role = message.guild.roles.cache.find(r => r.name === "「❗」Muted")
    if (!member.roles.cache.has(role.id)) return message.reply("Este usuário não está silenciado.")
    let reason = args.slice(1).join(" ")
    if (!reason) {
      reason = "Nenhum motivo"
    }

    // let channel2 = this.client.guilds.cache.get("945857241888731147").channels.cache.get("752702046137745498")

    member.roles.remove(role.id).then(() => {
      message.reply("O usuário pode falar novamente!")

      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(`Desmutado | ${member.user.tag}`, member.user.displayAvatarURL())
        .setThumbnail('https://i.pinimg.com/originals/a1/1f/a3/a11fa3cdbfd567f934b6c0151c6a6d8b.gif')
        .addField("Usuário desmutado", `\`${member.user.tag}\``, true)
        .addField("ID do usuário", `\`${member.id}\``, true)
        .addField("Mutado por", `\`${message.author.tag}\``, true)
        .addField("ID do(a) staff", `\`${message.author.id}\``, true)
        .addField("Motivo", reason, true)

      let channel = this.client.guilds.cache.get(config.guildId).channels.cache.get(config.canais.unmute)
      channel.send(embed)
      // channel2.send(`\`\`\`ini\n[Logs] O usuário [${member.user.tag}] foi desmutado.\n\`\`\``)
    })
    }
}