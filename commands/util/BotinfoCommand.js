const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 

module.exports = class BotinfoCommand extends Command {
    constructor (client) {
        super(client, {
            name: "botinfo",
            aliases: ["infobot"],
            category: "util",
            description: "Usa-se para ver as informações do bot."
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member,
    user = member.user;

    var botTraduzido = {
        "false":"❌ Não",
        "true":"🟢 Sim"
    }

    var statusTraduzido = {
        "online":"🟢 Online",
        "dnd":"🔴 Ocupado",
        "idle":"🌙 Ausente",
        "offline":"⚪ Offline"
    }
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
    .setThumbnail(this.client.user.avatarURL({ dynamic:true }))
    .setTitle('Cardinal System™')
    .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
    .setDescription(`**┏━━━━━━━━━━━━━━━━━━━━━┓**\n\n **📋 Criador do Bot**: Samuto#5352\n **💻 ID**: ${this.client.user.id}\n\n **📆 Primeira entrada no Discord**: ${moment.utc(message.guild.members.cache.get(this.client.user.id).user.createdAt).format("DD [de] MMMM [de] YYYY")}\n**📅 Primeira entrada no Servidor**: ${moment.utc(message.guild.members.cache.get(this.client.user.id).joinedAt).format("DD [de] MMMM [de] YYYY")}\n\n**Status**: ${statusTraduzido[client.presence.status]}\n\n**Estou em** ${this.client.guilds.cache.size} **servidores.**\n **Ajudando a** ${this.client.users.cache.size} **usuários.** \n\n**Descrições Gerais**\nUm bot criado para usos diversos, como ajuda em administração, economia de servidor e etc.\n\n**┗━━━━━━━━━━━━━━━━━━━━━┛**`)
    message.channel.startTyping()
    message.channel.stopTyping(true)
    message.channel.send(embed);
    }
}