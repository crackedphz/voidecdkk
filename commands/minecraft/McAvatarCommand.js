const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')

module.exports = class McAvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mcavatar",
            aliases: [],
            category: "minecraft",
            description: "Veja o rosto da skin de algum jogador de minecraft."
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}mcavatar [Nome do Player]\`\`\n  **Atenção:**\n \`\`O nick deve ser de um player do Minecraft.\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        
        const img = `https://mc-heads.net/avatar/${args[0]}/256.png`
        if (!img) return message.channel.send(modouso)

        let embed = new MessageEmbed()
        .setDescription(`Baixe clicando [aqui](${img})`)
        .setColor('#FF0000')
        .setImage(img)

        message.channel.send(embed)
    }
}