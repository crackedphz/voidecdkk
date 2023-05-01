const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const moment = require('moment')
const { readdirSync } = require('fs')
//const cmddev = readdirSync('./commands/dev')
const cmdeco = readdirSync('./commands/economy')
const cmdfun = readdirSync('./commands/fun')
const cmdmine = readdirSync('./commands/minecraft')
const cmdmisc = readdirSync('./commands/misc')
const cmdmod = readdirSync('./commands/moderation')
const cmdstaff = readdirSync('./commands/staff')
const cmdutil = readdirSync('./commands/util')

module.exports = class CommandList extends Command {
    constructor (client) {
        super(client, {
            name: "commandlist",
            aliases:[],
            category: "dev",
			description: "Mostra todos os comandos para o ser mencionado.",
            CommandChannel: true,
            OnlyDevs: true
        })
    }

    async run(message, args) {
		let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        let misc = this.client.commands.filter(c => c.config.category === "misc").map(c => `<a:seta:713636135527514173>\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let economy = this.client.commands.filter(c => c.config.category === "economy").map(c => `<a:seta:713636135527514173>\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let staff = this.client.commands.filter(c => c.config.category === "staff").map(c => `<a:seta:713636135527514173>\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let minecraft = this.client.commands.filter(c => c.config.category === "minecraft").map(c => `<a:seta:713636135527514173>\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let mod = this.client.commands.filter(c => c.config.category === "mod").map(c => `<a:seta:713636135527514173>\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let fun = this.client.commands.filter(c => c.config.category === "fun").map(c => `<a:seta:713636135527514173>\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let util = this.client.commands.filter(c => c.config.category === "util").map(c => `<a:seta:713636135527514173>\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
		let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
		//======================================================================================================================================================
		const a1 = new Discord.MessageEmbed() 
			.setTitle('<a:help:713640237972062208> **Menu de ajuda** <a:help:713640237972062208>')
			.setColor("RED")
            .setDescription(`**<a:musicalpepe:751921099591122954> **\`\`Úteis (${cmdutil.length})\`\`** <a:musicalpepe:751921099591122954>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${util}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**\n\n**<a:misce:713637192311767050> **\`\`Miscelânia (${cmdmisc.length})\`\`** <a:misce:713637192311767050>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${misc}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**\n\n**<a:economy:713637121809973319> **\`\`Economia (${cmdeco.length})\`\`** <a:economy:713637121809973319>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${economy}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**`)
            .setFooter("Para passar para as próximas categorias, pressione: ▶️")
		//======================================================================================================================================================
		const a2 = new Discord.MessageEmbed() 
           
			.setColor("ORANGE")
            .setDescription(`**<a:staff:713637406586175549> **\`\`Staff (${cmdstaff.length})\`\`** <a:staff:713637406586175549>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${staff}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**\n\n**<a:mine:713637275245871145> **\`\`Minecraft (${cmdmine.length})\`\`** <a:mine:713637275245871145>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${minecraft}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**`)
            .setFooter("Para passar para as próximas categorias, pressione: ▶️")
		//======================================================================================================================================================
		const a3 = new Discord.MessageEmbed() 
           
			.setColor("YELLOW")
            .setDescription(`**<a:mod:713639760975102024> **\`\`Moderação (${cmdmod.length})\`\`** <a:mod:713639760975102024>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${mod}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**\n\n**<a:fun:713637338592444466> **\`\`Diversão (${cmdfun.length})\`\`** <a:fun:713637338592444466>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${fun}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**`)
            .setFooter("Para passar para as próximas categorias, pressione: ▶️")
		//======================================================================================================================================================
			
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send('Sem menção.');
        user.user.send(a1)
        user.user.send(a2)
        user.user.send(a3)

  
	}
}
