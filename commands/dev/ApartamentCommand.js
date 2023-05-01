const Command = require("../../src/structures/command")
const moment = require("moment")
require("moment-duration-format")
module.exports = class ApartamentCommand extends Command {
    constructor (client) {
        super(client, {
            name: "apartament",
            aliases: ["apartamento", "daily"],
            category: "dev",
            description: "Pegue o daily do seu apartamento (caso tenha um).",
            CommandChannel: true,
            OnlyDevs: true
        })
    }

    async run(message, args) {
        if (!["702661740890030110", "702661896700166256"].some(role => message.member.roles.cache.has(role))) return message.reply("você não possui um `apartamento` ou `triplex`.")

        let user = await this.client.database.Users.findById(message.author.id)
        let time = moment.duration.format([moment.duration(parseInt(user.apartamenttime) + 86400000 - Date.now())], "hh:mm:ss")
        if (parseInt(user.apartamenttime) < Date.now()) {
            if (message.member.roles.cache.has("702661740890030110")) {
                user.PlazaCoin += Number(100000)
		user.apartamenttime = 86400000 + Date.now()
                user.save()
                message.reply(`você coletou \`${Number(100000).toLocaleString()}\` PlazaCoins do seu apartamento.`)
                return;
            }
    
            if (message.member.roles.cache.has("702661896700166256")) {
                user.PlazaCoin += Number(350000)
		user.apartamenttime = 86400000 + Date.now()
                user.save()
                message.reply(`você coletou \`${Number(350000).toLocaleString()}\` PlazaCoins do seu triplex.`)
                return;
            }
        } else {
            message.reply(`você já pegou os PlazaCoins do seu **apartamento/triplex**, espere mais \`${time}\` para pegar novamente.`)
        }
    }
}