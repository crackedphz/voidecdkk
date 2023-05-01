const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 

module.exports = class TranslateCommand extends Command {
    constructor (client) {
        super(client, {
            name: "translate",
            aliases: ["traduzir"],
            category: "misc",
            description: "Usa-se fazer uma tradução."
        })
    }

    async run(message, args) {

        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        const request = require("request")
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        const modouso = new Discord.MessageEmbed() 
           
            .setColor('#FF0000')
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}translate [linguagem] [textão]\`\`\n  **Sinônimos:** \`\`${ras.prefix}traduzir [linguagem] [textão]\`\`\n**Exemplo:** \`\`${ras.prefix}translate pt i love you\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        
            if (!args[1]) return message.channel.send(modouso)
            let url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${args[0]}&dt=t&q=${args.slice(1).join("+")}&ie=UTF-8&oe=UTF-8`
            request(encodeURI(url), function (err, response, body) {
                if (err) {
                    args[0] = "en"
                }
               
                let translate = body.match(/^\[\[\[".+?",/)[0]
                translate = translate.substring(4, translate.length - 2)
                
            const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Tradutor Rápido')
                .setURL('https://translate.google.com.br/?hl=pt-BR')
                .addField('Sua frase',`\`\`\`fix\n${args.slice(1).join(' ')}\`\`\``)
                .addField('Linguagem Escolhida',`\`\`\`css\n${args[0]}\`\`\``)
                .addField('Tradução', `\`\`\`fix\n${translate}\`\`\``)
                .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))

            message.channel.send(embed)
        })
    }
}