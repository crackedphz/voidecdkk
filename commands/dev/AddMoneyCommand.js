const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')

module.exports = class AddMoneyCommand extends Command {
    constructor (client) {
        super(client, {
            name: "addmoney",
            aliases: ["addplazacoin", "addcoins"],
            category: "dev",
            description: "Adiciona PlazaCoins para o usuário desejado.",
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}addmoney [Usuário] [Quantia]\`\`\n  **Sinônimos:** \`\`${ras.prefix}addcoins [Usuário] [Quantia]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
 
        let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
        if (!member) return message.channel.send(modouso)
        let user = await this.client.database.Users.findById(member.id)
        if (!user) {
            new this.client.database.Users({
                _id: member.id
            }).save()
        }
        let value = args[1]
        let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
        if (invalidValue) return message.reply("o valor informado é inválido.")
        user.PlazaCoin += Number(value)
        user.save()

        message.reply(`foi adicionado \`${Number(value).toLocaleString()}\` PlazaCoins na conta do **${member.username}**.`)
    }
}