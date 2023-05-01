const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')

module.exports = class DropCommand extends Command {
    constructor (client) {
        super(client, {
            name: "drop",
            aliases: ["dropar"],
            category: "dev",
            description: "Gera um drop no canal de texto desejado.",
            UserPermission: ["MANAGE_GUILD"],
            OnlyDevs: true,
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
           
            .setColor("#FF8C00")
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}drop [Id ou # do canal]\`\`\n  **Sinônimos:** \`\`${ras.prefix}dropar [Id ou # do canal]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)

        if (!args[0]) return message.channel.send(modouso)
        let channel = message.guild.channels.cache.get(`${args[0]}`.replace(/[<#>]/g, ""))
        let value = Math.round(Math.random() * 5000)
        let embed = new MessageEmbed()
        .setThumbnail(message.guild.iconURL())
        .setColor(this.client.colors.default)
        .addField("Parece que surgiu dinheiro do céu", `Seja o primeiro a pegar o prêmio de \`${Number(value).toLocaleString()}\` PlazaCoins, pegue o prêmio usando \`${ras.prefix}pegar\`.`)

        channel.send(embed).then(msg => {
            message.reply("drop enviado com sucesso, boa sorte para quem pegar.")
            const filter = m => m.content.startsWith(`${ras.prefix}pegar`)
            const collector = msg.channel.createMessageCollector(filter, {
                max: 1,
                time: 300000
            })

            collector.on("collect", async m => {
                let user = await this.client.database.Users.findById(m.author.id)

                user.PlazaCoin += Number(value)
                user.save()
                m.reply(`parabéns, você ganhou \`${Number(value).toLocaleString()}\` PlazaCoins.`)
            })
        })
    }
}