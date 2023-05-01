const { MessageEmbed } = require("discord.js")
module.exports = class GuildMemberRemoveEvent {
    constructor(client) {
        this.client = client
    }

    async run(member, message) {
     
        
        await this.client.database.Users.findByIdAndDelete(member.user.id)
        let embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setFooter(`É uma pena mesmo.`, member.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`Adeus **${member.user.tag}**, espero que nada de errado tenha acontecido.\n\n Com a saída de **${member.user.tag}**, nós ficamos com **${member.guild.memberCount}** membros.`)

        let server = this.client.guilds.cache.get('423191510381625354')
        if (server) {
        // let channel = this.client.guilds.cache.get("423191510381625354").channels.cache.get("767117198069334027")
        // channel.send(embed)
        }
    }
}