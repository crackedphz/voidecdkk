const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 

module.exports = class SayCommand extends Command {
    constructor (client) {
        super(client, {
            name: "dm",
            aliases: ["pv"],
            category: "misc",
            description: "Usa-se para enviar uma mensagem pela DM."
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}dm [menção] [textão]\`\`\n  **Sinônimos:** \`\`${ras.prefix}pv [menção] [textão]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        
    
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send(modouso);
        if (!args.slice(1).join(" "))return message.channel.send("Você não especificou uma mensagem a ser enviada");
        user.user.send(args.slice(1).join(` `)).catch(() => message.channel.send("Esse usuário não pode receber mensagens privadas.")).then(() => message.channel.send(`Mensagem enviada para <@${user.user.id}>`));
        user.user.send(`**-Enviada por** \`\`${message.author.tag}\`\``)
        user.user.send('\`\`Caso leia esta mensagem, não adianta responder aqui, pois o usuário não vê.\`\`')
    }
}