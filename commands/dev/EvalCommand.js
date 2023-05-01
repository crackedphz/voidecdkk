const Command = require('../../src/structures/command')
const { MessageEmbed } = require("discord.js")
module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["evaluate", "e"],
            category: "dev",
            description: "Comando de eval.",
            OnlyDevs: true,
            CommandChannel: true
        })
    }

    async run(message, args) {
        const code = args.join(' ')

        try {
         
          const evaluated = await Promise.resolve(eval(code))
    
          message.channel.send((evaluated, { depth: 0 }), { code: 'js' })
        } catch (err) {
          const embed = new MessageEmbed()
            .setTitle('Algo de errado não está certo 🤔')
            .setDescription('```' + err.stack + '```')
            .setColor('#c62b1d')
            .setTimestamp(new Date())
    
          message.channel.send({ embed })
        }
        }
    }