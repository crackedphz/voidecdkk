const snekfetch = require('snekfetch');
const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')

module.exports = class McAchievements extends Command {
    constructor(client) {
        super(client, {
            name: "achievement",
            aliases: ['conquista'],
            category: "minecraft",
            description: "Faça uma conquista personalizada do minecraft!"
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
            .setDescription(`**┏━━━━━━━━━━━━━━━━━┓**\n\n  **Comando utilizado de forma errada!**\n\n  **Forma de uso:** \`\`${ras.prefix}achievement [texto]\`\`\n  **Sinônimos:** \`\`${ras.prefix}conquista [texto]\`\`\n\n**┗━━━━━━━━━━━━━━━━━┛**`)
        let title = ('Achievement Get!')
        let contents = args.slice(0).join(" ")
        if(!contents) return message.channel.send(modouso);

  
        let rnd = Math.floor((Math.random() * 39) + 1);
        if(title.toLowerCase().includes("burn")) rnd = 38;
        if(title.toLowerCase().includes("cookie")) rnd = 21;
        if(title.toLowerCase().includes("cake")) rnd = 10;
  
        if(title.length > 22 || contents.length > 22) {
          return message.channel.send("Você só pode utilizar apenas 22 caracteres!");
        }
        const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
        const achievement = new Discord.MessageEmbed() 
            .setTitle('Cardinal System™')
            .setURL('https://discord.com/oauth2/authorize?client_id=729660122846199840&permissions=473001191&scope=bot')
            .setColor("RED")
            .setImage(url)
            .setFooter(`Comando utilizado pelo usuário ${message.author.tag} | Hoje às ${horario}`, message.author.avatarURL({ dynamic:true }))
        message.channel.send(achievement)
        
        
      }
  };