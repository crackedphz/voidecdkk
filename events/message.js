const { MessageEmbed } = require("discord.js")
const { Client, Collection } = require("discord.js")
module.exports = class MessageEvent {
    constructor (client) {
        this.client = client
    }

    async run(message, client) {
        let db = require('../src/structures/database')
		if (message.channel.type === "dm") return
		if (message.author.bot) return
		let server = await this.client.database.Guilds.findById(message.guild.id)
		if (!server) {
			this.client.database.Guilds({
				_id: message.guild.id
			}).save()
		}


        if (message.content === message.guild.me.toString()) return message.reply(`meu prefix é \`${process.env.PREFIX}\`, se quiser saber dos meus comandos, use \`${process.env.PREFIX}ajuda\`.`)
        let user = await this.client.database.Users.findById(message.author.id)
        if (!user) {
            user = new this.client.database.Users({
                _id: message.author.id
            })
            user.save()
        }
        
       //Prefix Info
        if (message.mentions.has(this.client.user)) { 
            if(message.mentions.has('here')) return 
            if(message.mentions.has('everyone')) return
                const ras = await db.Guilds.findOne({ _id: message.guild.id })
                message.channel.send(`Olá, caso esteja com dúvidas sobre minha prefix, ela é \`\`${ras.prefix}\`\` neste servidor! <:safadinhaon:770463264005816331>`)
            }

            
        const ras = await db.Guilds.findOne({_id: message.guild.id}) 
        if (!message.content.startsWith(ras.prefix)) {
            if(message.content.startsWith('!!!')){
                message.channel.send(`A prefix deste servidor é \`\`${ras.prefix}\`\` portanto só irei ouvi-lo.`)
            }
            return
        }
        let args = message.content.slice(ras.prefix.length).trim().split(" ")
        let command = args.shift().toLowerCase()
        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
        if (!cmd) return
        let data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }).split(" ")
        let horario = data[1]
        let diamesano = data[0].split("/")
        
        //logs
        const chatlog = this.client.guilds.cache.get("423191510381625354").channels.cache.get("767117201987338291")
        chatlog.send(` \`\`\`ini\n\[Usuário\]: ${message.author.tag}\n\[ID do Usuário\]: ${message.author.id}\n\[Comando\]: ${ras.prefix}${cmd.config.name}\n\[Guild\]: ${message.guild.name} (${message.guild.id})\n\[Canal\]: ${message.channel.name} (${message.channel.id})\n\[Mensagem\]: ${message.content}\n\[Data\]: ${diamesano[1]}/${diamesano[0]}/${diamesano[2].replace(",", "")} \[Hora\]: ${horario}\n\`\`\``)
        //

        let userPermission = cmd.config.userPermission
        if (userPermission !== null) {
            if (!message.member.hasPermission(userPermission)) { 
                let perm = userPermission.map(value => value).join(", ")
                return message.reply(`você não pode executar este comando, pois não tem permissão para \`${perm}\``)
            }
        }
        
    
        let devs = ["311296198931644416", "258267984051699712"].includes(message.author.id)
        if (cmd.config.OnlyDevs) {
            if (!devs) return message.channel.send("Este comando foi feito apenas para pessoas especiais.").then(msg => msg.delete({ timeout: 6000 }))
            
        }

        const res = await db.Guilds.findOne({_id: message.guild.id})    

        if (cmd.config.CommandChannel) {
            if(res.channelid === message.channel.id) {
                if (res.commandinchannel === 'true'){
                db.Guilds.findOneAndUpdate({})
                if (!devs) {
                    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`${message.author}, você não tem permissão para executar comandos neste canal.`).then(msg => msg.delete({ timeout: 6000 }))
                }
            }
        }
        
}



        try {
            new Promise((res, rej) => {
                message.channel.startTyping()
                res(cmd.run(message, args))
            }).then(() => message.channel.stopTyping()).catch(err => {
                console.error(err.stack)
                message.channel.stopTyping()
                let embed = new MessageEmbed()
                .setColor(this.client.colors.error)
                .setTitle("Alô Cleytinho, a casa caiu 😨")
                .setDescription(`\`\`\`js\n${err.stack.slice(0, 2045)}\`\`\``)

                message.channel.send(embed)
            })
        } catch (err) {

        }
    }
}
