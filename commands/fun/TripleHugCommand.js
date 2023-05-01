const Command = require("../../src/structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class TripleKissCommand extends Command {
    constructor (client) {
        super(client, {
            name: "triplehug",
            aliases: ["abraçotriplo"],
            category: "fun",
            description: "Usa-se para abraçar duas pessoas.",
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}triplehug [Usuário] [Outro Usuário]\`\`\n  **Sinônimos:** \`\`${ras.prefix}abraçotriplo [Usuário] [Outro Usuário]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)

        let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
        let member2 = args[1]
        if (!member) return message.channel.send(modouso)
        if (!member2) return message.channel.send(`${message.author}, você se esqueceu de mencionar a segunda pessoa!`)
        //let img = await neko.sfw.kiss()
        let gifs = [
            'http://3.bp.blogspot.com/-qvAupogljLw/Tboa1NDlSuI/AAAAAAAAAmU/yME8xEDMvpw/s1600/tumblr_lk8ew701el1qg2iaao1_500.gif',
            'https://uploads.spiritfanfiction.com/fanfics/capitulos/201609/a-vida-de-uma-youtuber-6479738-140920161946.gif'
            
          ]

        let randomgifs = gifs[Math.floor(Math.random() * gifs.length)]
		const embed = new Discord.MessageEmbed()
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setColor('#FF0000')
			.setDescription(`:kiss_woman_man: ${message.author} deu um abraço triplo com\n${member} e ${member2}!`)
			.setImage(randomgifs)

		message.channel.send(embed)
    
       
    }
}