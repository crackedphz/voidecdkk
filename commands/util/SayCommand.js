const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 

module.exports = class SayCommand extends Command {
    constructor (client) {
        super(client, {
            name: "say",
            aliases: ["falar"],
            category: "util",
            description: "Usa-se para fazer o bot falar."
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}say [textão]\`\`\n  **Sinônimos:** \`\`${ras.prefix}falar [textão]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        
    
          let msgbot = args.join(" ");
          if(!msgbot) return message.channel.send(modouso);
          if(!message.member.hasPermission("SEND_MESSAGES")) return message.reply("Você não tem permissão para utilizar este comando.")
      

      message.delete().catch();
      message.channel.send(msgbot);
    }
}