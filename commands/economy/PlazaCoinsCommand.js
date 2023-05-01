const Command = require("../../src/structures/command")
module.exports = class PlazaCoinsCommand extends Command {
    constructor (client) {
        super(client, {
            name: "PlazaCoin",
            aliases: ["PlazaCoin", "coins", "atm", "money"],
            category: "economy",
            description: "Veja quantos PlazaCoins que você ou algum usuário tenha.",
            CommandChannel: true
        })
    }

    async run(message, args) {
        let member = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author
        let user = await this.client.database.Users.findById(member.id)
        if (!user || user === null) {
            let novoUser = new this.client.database.Users({
                _id: member.id
            })
            novoUser.save()
        }

        if (message.author.id === member.id) {
            message.reply(`você possui \`${user.PlazaCoin.toLocaleString()}\` PlazaCoins`)
        } else {
            message.reply(`o usuário **${member.username}** possui \`${user.PlazaCoin.toLocaleString()}\` PlazaCoin`)
        }
    }
}