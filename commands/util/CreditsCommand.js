const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 
module.exports = class CreditsCommand extends Command {
    constructor (client) {
        super(client, {
            name: "creditos",
            aliases: ["credits"],
            category: "util",
            description: "Mostra os créditos.",
            CommandChannel: true
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        let embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
            .setThumbnail(this.client.user.avatarURL({ dynamic:true }))
            .setTitle('Créditos pela criação da Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setDescription(`**┏━━━━━━━━━━━━━━━━━━━━━┓**\n\n **📋 Samuto#5352**\n **💻 Habilidades**: Javascript Programmer, FiveM Server Manager, Electrical and Electronic Maintenance Electrician, Python Programmer, 2D Artist and Arduino Programmer.\n\n**Declarações Finais:**`)
            .addField('Sem essa equipe nada disso seria possível, eterna gratidão! 😍', '**┗━━━━━━━━━━━━━━━━━━━━━┛**')
        message.channel.send(embed)
    }
}