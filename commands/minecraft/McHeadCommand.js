const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class McHeadCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mchead",
            aliases: [],
            category: "minecraft",
            description: "Pegue a cabeça da skin de algum jogador de minecraft."
        })
    }

    async run(message, args) {
        const img = `https://mc-heads.net/head/${args[0]}/256.png`
        if (!img) return message.reply("você não informou o nickname do jogador.")

        let embed = new MessageEmbed()
        .setDescription(`Baixe clicando [aqui](${img})`)
        .setColor('#FF0000')
        .setImage(img)

        message.channel.send(embed)
    }
}