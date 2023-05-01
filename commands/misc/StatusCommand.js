const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client();
const { version, MessageEmbed } = require("discord.js")
require("moment-duration-format")
let os = require("os")
let cpuStat = require("cpu-stat")



module.exports = class BotinfoCommand extends Command {
    constructor (client) {
        super(client, {
            name: "status",
            aliases: ["dedicado"],
            category: "misc",
            description: "Usa-se para ver o status do dedicado do bot.",
            CommandChannel: true
        })
    }

    async run(message, args) {
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
	cpuStat.usagePercent(function (err, percent, seconds) {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member,
    user = member.user;
    const statusEmbed = new Discord.MessageEmbed() 
        .setColor('#FF0000')
        .setTitle(("Status do Dedicado\n┏━━━━━━━━━━━━━━━━━━┓"))
        .setDescription(`\n\n💻 Versão:\`\`\`${require("../../package.json").version}\`\`\`\n📑 Versão do Discord.js:\`\`\`${version}\`\`\`\n👩🏻‍💻 Memória RAM:\`\`\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB\`\`\`\n🧮 Status da CPU:\`\`\`${percent.toFixed(2)}%\`\`\`\n📟 Sistema:\`\`\`${os.platform()} ${os.arch()}\`\`\`\n💾 CPU:\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\`\n**┗━━━━━━━━━━━━━━━━━━━━┛**`)
        .setThumbnail('https://cdn.discordapp.com/attachments/685561851953938483/704377287054983189/Charlotte-Nao-Mai.png')
        .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
    message.channel.startTyping()
    message.channel.stopTyping(true)
    message.channel.send(statusEmbed);
        })
    }
}