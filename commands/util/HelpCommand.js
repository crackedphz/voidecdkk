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

module.exports = class HelpCommand extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            aliases:["ajuda", "comandos", "commands"],
            category: "util",
			description: "Mostra essa lista atual. v3",
			CommandChannel: true
        })
    }

    async run(message, args) {
		let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        let misc = this.client.commands.filter(c => c.config.category === "misc").map(c => `⏩\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let economy = this.client.commands.filter(c => c.config.category === "economy").map(c => `⏩\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let staff = this.client.commands.filter(c => c.config.category === "staff").map(c => `⏩\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let minecraft = this.client.commands.filter(c => c.config.category === "minecraft").map(c => `⏩\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let mod = this.client.commands.filter(c => c.config.category === "mod").map(c => `⏩\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let fun = this.client.commands.filter(c => c.config.category === "fun").map(c => `⏩\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
        let util = this.client.commands.filter(c => c.config.category === "util").map(c => `⏩\`\`${ras.prefix}${c.config.name}\`\` :: **${c.config.description}**`).join("\n")
		let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
		//======================================================================================================================================================
		const a1 = new Discord.MessageEmbed() 
			.setTitle('💻 **Menu de ajuda** 💻')
			.setColor("RED")
            .setDescription(`**👾 **\`\`Úteis (${cmdutil.length})\`\`** 👾\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${util}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**\n\n**👽 **\`\`Miscelânia (${cmdmisc.length})\`\`** 👽\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${misc}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**\n\n**<a:money:767264510737907752> **\`\`Economia (${cmdeco.length})\`\`** <a:money:767264510737907752>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${economy}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**`)
            .setFooter("Para passar para as próximas categorias, pressione: ▶️")
		//======================================================================================================================================================
		const a2 = new Discord.MessageEmbed() 
           
			.setColor("ORANGE")
            .setDescription(`**😎 **\`\`Staff (${cmdstaff.length})\`\`** 😎\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${staff}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**\n\n**<a:aPES3_MinecraftHover:767404712676294656> **\`\`Minecraft (${cmdmine.length})\`\`** <a:aPES3_MinecraftHover:767404712676294656>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${minecraft}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**`)
            .setFooter("Para passar para as próximas categorias, pressione: ▶️")
		//======================================================================================================================================================
		const a3 = new Discord.MessageEmbed() 
           
			.setColor("YELLOW")
            .setDescription(`**<:WILL_vsf_ban:767404949562458134> **\`\`Moderação (${cmdmod.length})\`\`** <:WILL_vsf_ban:767404949562458134>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${mod}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**\n\n**<:Garfinhowave:767405212297461801> **\`\`Diversão (${cmdfun.length})\`\`** <:Garfinhowave:767405212297461801>\n\n┏━━━━━━━━━━━━━━━━━━━━━━━━┓**\n\n${fun}\n\n**┗━━━━━━━━━━━━━━━━━━━━━━━━┛**`)
            .setFooter("Para passar para as próximas categorias, pressione: ▶️")
		//======================================================================================================================================================
            
            const rm = require('discord.js-reaction-menu')
            new rm.menu({
                channel: message.channel,
                userID: message.author.id,
                pages: [a1, a2, a3],
                time: 180000
            })

  
	}
}
