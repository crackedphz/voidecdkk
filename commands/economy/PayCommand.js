const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class PayCommand extends Command {
    constructor (client) {
        super(client, {
            name: "pay",
            aliases: ["pagar"],
            category: "economy",
            description: "Doe PlazaCoins para algum usuário.",
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}pay [Usuário] [Quantia de PlazaCoins]\`\`\n  **Sinônimos:** \`\`${ras.prefix}pagar [Usuário] [Quantia de PlazaCoins]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)

        let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
        if (!member) return message.channel.send(modouso)
        let donator = await this.client.database.Users.findById(message.author.id)
        let receptor = await this.client.database.Users.findById(member.id)
        if (member.id === message.author.id) return message.reply("você não pode pagar para você mesmo.")
        let value = args[1]
        if (!value) return message.reply("você precisa informar o valor que deseja transferir.")
        let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
        if (invalidValue) return message.reply("o valor informado é inválido.")
        if (donator.PlazaCoin < value) return message.reply("você não tem PlazaCoins o suficiente.")
        receptor.PlazaCoin += Number(value)
        donator.PlazaCoin -= Number(value)
        receptor.save()
        donator.save()

        message.reply(`você transferiu \`${Number(value).toLocaleString()}\` PlazaCoins para **${member.username}** com sucesso.`)
    }
}