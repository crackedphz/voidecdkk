const Command = require("../../src/structures/command")
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
const client = new Discord.Client(); 
module.exports = class PingCommand extends Command {
    constructor (client) {
        super(client, {
            name: "ping",
            aliases: ["pang", "peng", "pong", "pung"],
            category: "util",
            description: "Mostra a minha latência com o WebSocket.",
            CommandChannel: true
            
        })
    }

    async run(message, args) {
       const m = message.channel.send("Ping? 🏓").then(m => m.edit(`Pong!🏓\nA Latência da API é **${Math.round(this.client.ws.ping)}ms!!**`));
    }
}