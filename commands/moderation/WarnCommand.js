const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class BanCommand extends Command {
    constructor (client) {
        super(client, {
            name: "warn",
            aliases: ["warnar"],
            category: "mod",
            description: "Aplica um aviso ao membro.",
            UserPermission: ["BAN_MEMBERS"],
            CommandChannel: true
        })
    }

    async run(message, args) {
        if(!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply("Você não tem permissões para usar este comando.");
        message.author.delete;
       //alterar channel para funcionamento
        let channel = this.client.guilds.cache.get("663436717423984695").channels.cache.get("700667812426809425")
            try {
                let memberMention = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
                if(!memberMention) return message.reply(`você esqueceu de mencionar alguém.`)
                let motivo = args.slice(1).join(' ');
                if(!motivo) {
                  motivo = 'Indefinido'
                }
        
        
                let adv = message.guild.roles.cache.find(r => r.name === "「❗」Warning 01");
                let adv2 = message.guild.roles.cache.find(r => r.name === "「❗」Warning 02");
                if (!adv) {
                  role = await message.guild.roles.create({
                    data: {
                      name: "「❗」Warning 01",
                      color: "#FF0000",
                      permissions: []
                    }
                  })
                }
                if (!adv2) {
                  role = await message.guild.roles.create({
                    data: {
                      name: "「❗」Warning 02",
                      color: "#FF0000",
                      permissions: []
                    }
                  })
                }
                let hasAdv = memberMention.roles.cache.some(r => r.name === "「❗」Warning 01");
                let hasAdv2 = memberMention.roles.cache.some(r => r.name === "「❗」Warning 02");
        
                if (!hasAdv) {
                  if(!hasAdv2) {
                    memberMention.roles.add(adv).catch(console.error);
        
                    const embed = new MessageEmbed()
                        .setTitle('** :no_entry: Nova Advertência Registrada :no_entry:**')   
                        .setColor('#FF0000')
                        .setThumbnail('https://i.pinimg.com/originals/a1/1f/a3/a11fa3cdbfd567f934b6c0151c6a6d8b.gif')
                        .addField("**Usuário:**", `<@${memberMention.id}>`, true)
                        .addField("**Advertido por:**", `<@${message.author.id}>`, true)
                        .addField("**Advertência:**", "**1**/3", true)
                        .addField("Motivo", motivo, true)
                    channel.send(embed)
                    message.channel.send(`${message.author}, usuário advertido com sucesso.`)
                  }
                } 
                
                if (hasAdv) {
                  memberMention.roles.remove(adv).catch(console.error);
                  memberMention.roles.add(adv2).catch(console.error);
        
                    const embed2 = new MessageEmbed()
                        .setTitle('** :no_entry: Nova Advertência Registrada :no_entry:**')   
                        .setColor('#FF0000')
                        .setThumbnail('https://i.pinimg.com/originals/a1/1f/a3/a11fa3cdbfd567f934b6c0151c6a6d8b.gif')
                        .addField("**Usuário:**", `<@${memberMention.id}>`, true)
                        .addField("**Advertido por:**", `<@${message.author.id}>`, true)
                        .addField("**Advertência:**", "**2**/3", true)
                        .addField("Motivo", motivo, true)
                    channel.send(embed2)
                    message.channel.send(`${message.author}, usuário advertido com sucesso.`)
                 } 
                 
                if (hasAdv2) {
                    let ban
                    ban = message.guild.members.cache.get(memberMention.id)
                    if (!ban) {
                        ban = memberMention
                    }
                    if (ban.id === message.author.id) return message.channel.send(`${message.author}, Eu não tenho permissão pra banir esta pessoa :person_shrugging: `)
                    message.guild.members.ban(ban.id, {
                        days: 7,
                        reason: `Punido por: ${message.author.tag} - Motivo: ${motivo}`
                    })

                    const embed3 = new MessageEmbed()
                        .setTitle('** :no_entry: Novo Banimento Registrado :no_entry:**')   
                        .setColor('#FF0000')
                        .setThumbnail('https://media1.tenor.com/images/de413d89fff5502df7cff9f68b24dca5/tenor.gif')
                        .addField("**Usuário:**", `<@${memberMention.id}>`, true)
                        .addField("**Banido por:**", `<@${message.author.id}>`, true)
                        .addField("**Motivo:**", `Ultrapassou 3 Advertências.\n**(${motivo})**`, true)
                        .setFooter('Atlantis Team 💙')
                    
                    channel.send(embed3)
                    memberMention.send(embed3)
                    message.channel.send(`${message.author}, usuário advertido e banido com sucesso.`)
                } 
        
              
            } catch (e) {
              console.log(e);
            }
    }
}