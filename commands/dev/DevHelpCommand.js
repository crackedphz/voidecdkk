const Command = require("../../src/structures/command")
module.exports = class HelpCommand extends Command {
    constructor (client) {
        super(client, {
            name: "devhelp",
            aliases:["ajudadev", "helpdev"],
            category: "dev",
            description: "Mostra a lista de comandos DEV.",
            OnlyDev: true,
            CommandChannel: true
        })
    }

    async run(message, args) {
        let db = require('../../src/structures/database')
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        let dev = this.client.commands.filter(c => c.config.category === "dev").map(c => `${ras.prefix}${c.config.name} :: ${c.config.description}`).join("\n")
        
        let list = `= COMANDOS DEV =\n\n${dev}`

        message.author.send(`**Lista de comandos (Developer)**\n\n\`\`\`asciidoc\n${list}\`\`\``).then(() => message.reply("Não se preocupe, te enviei ajuda no seu privado!😗✌️")).catch(err => {
            message.reply("O Seu privado está fechado, então não consegui te enviar ajuda 😭")
        })
    }
}