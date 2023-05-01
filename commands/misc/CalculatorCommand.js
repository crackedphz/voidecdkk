const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 

module.exports = class CalcCommand extends Command {
    constructor (client) {
        super(client, {
            name: "calcular",
            aliases: ["calc"],
            category: "misc",
            description: "Usa-se para fazer um calculo matemático."
        })
    }

    async run(message, args) {

        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let math = require("mathjs")
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        const modouso = new Discord.MessageEmbed() 
           
            .setColor('#FF0000')
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail('https://www.pikpng.com/pngl/b/200-2007801_diythonk-discord-emoji-discord-thonk-thinking-emoji-clipart.png')
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}calc 1 + 1\`\`\n  **Sinônimos:** \`\`${ras.prefix}calcular 1 + 1\`\`\n\n**Tipos de contas**\n\`\`(+) Soma\`\`\n\`\`(-) Subtração\`\`\n\`\`(/) Divisão\`\`\n\`\`(*) Multiplicação\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        
            let question = args.join(" ")
            if (!question) return message.channel.send(modouso)
            function calc(expression) {
                'use strict';
                return math.evaluate(expression)
            }
        
        let resposta = calc(question)
        const embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Calculadora Matemática')
            .addField('Conta',`\`\`\`js\n${args.join(" ")}\`\`\``)
            .addField('Resposta', `\`\`\`js\n${resposta}\`\`\``)
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            
            message.channel.send(embed)
    }
}