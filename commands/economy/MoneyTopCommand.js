const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class MoneyTopCommand extends Command {
    constructor (client) {
        super(client, {
            name: "moneytop",
            aliases: ["topmoney", "topPlazaCoins", "PlazaCoinstop"],
            category: "economy",
            description: "Mostra os top 15 mais ricos do servidor.",
            CommandChannel: true
        })
    }

    async run(message, args) {
        let user = await this.client.database.Users.find({})
        let number = 1
        let users = []
        user.filter(user => message.guild.members.cache.get(user._id)).forEach(user => {
            let us = message.guild.members.cache.get(user._id)
            users.push({
                _id: `${us.user.username}#${us.user.discriminator}`,
                PlazaCoins: user.PlazaCoin
            })
        })
        users.sort(function (a, b) {
            return b.PlazaCoins - a.PlazaCoins
        })

        let total = users.map(user => `**${number++}:** ${user._id} - *PlazaCoins: ${Number(user.PlazaCoins).toLocaleString()}*`).slice(0, 15)
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Top ${total.length} pessoas mais ricas`)
        .setDescription(total)

        message.channel.send(embed)
    }
}