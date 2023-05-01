const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 


module.exports = class BuyCommand extends Command {
    constructor (client) {
        super(client, {
            name: "buy",
            aliases: ["comprar"],
            category: "dev",
            description: "Compre algo que esteja em nossa loja.",
            CommandChannel: true,
            OnlyDevs: true
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        var modouso = new Discord.MessageEmbed() 
           
            .setColor('#FF0000')
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}buy [item do shop]\`\`\n  **Sinônimos:** \`\`${ras.prefix}comprar [item do shop]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        
        if (!args[0]) return message.channel.send(modouso)
        let user = await this.client.database.Users.findById(message.author.id)
        let item = await this.client.database.Loja.findById(args.join(" "))

        if (!item) {
            item = await this.client.database.Vips.findById(args.join(" ").toLowerCase())
            if (user.PlazaCoin < Number(item.custo)) return message.reply("você não tem PlazaCoins o suficiente.")

                
            if (item) {
                user.PlazaCoin -= item.custo
                user.save()

                message.member.roles.add(item.vipID)

                message.reply(item.resposta ? `${tiem.resposta.replace("{item}", item._id)}` : `você comprou o ${item._id}`)
            } else {
                message.reply("este item não se encontra na loja.")
            }
        } else {
            if (user.PlazaCoin < item.custo) return message.reply("você não tem PlazaCoins o suficiente.")
            if (item.giverole) {
                message.member.roles.add(item.roleid)
            } 

            user.PlazaCoin -= item.custo
            user.save()

            message.reply(item.resposta ? `${item.resposta.replace("{item}", item._id)}` : `você comprou o ${item._id}`)
        }
    }
}