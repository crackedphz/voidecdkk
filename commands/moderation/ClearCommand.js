const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class ClearCommand extends Command {
    constructor (client) {
        super(client, {
            name: "clear",
            aliases: ["clean", "limpar"],
            category: "mod",
            description: "Limpa o chat desejado pelo usuário.",
            UserPermission: ["MANAGE_MESSAGES"],
            CommandChannel: true
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.reply("Você não tem permissões para usar este comando.");
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        const modouso = new Discord.MessageEmbed() 
           
            .setColor("#FF8C00")
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}clear [Quantidade de Mensagens]\`\`\n  **Sinônimos:** \`\`${ras.prefix}limpar [Quantidade de Mensagens]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`) 

        if (!args[0]) return message.channel.send(modouso)
        if (args[0] > Number(100)) return message.reply("eu só posso limpar até `100` mensagens.")
        if (args[0] < Number(2)) return message.reply("não tem sentido eu limpar somente a sua mensagem, por isso você só pode escolher de `2` pra cima.")

        message.channel.bulkDelete(args[0]).then(msg => {
            message.reply(`foram deletadas \`${msg.size}\` mensagens.`)
        }).catch(() => {
            message.reply("eu não consegui deletar algumas mensagens, pois elas têm mais de `14` dias.")
        })
    }
}