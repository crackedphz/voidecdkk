const { MessageEmbed } = require("discord.js")
module.exports = class GuildMemberAddEvent {
    constructor(client) {
        this.client = client
    }

    async run(member, message) {
//tinha um bagui aquikk
        let user = await this.client.database.Users.findById(member.user.id)
        if (!user) {
            new this.client.database.Users({
                _id: member.user.id
            }).save()
        }

        const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setFooter("Obrigada por entrar no servidor.", member.guild.iconURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`Olá **${member.user.tag}**, seja muito bem-vindo(a) ao **${member.guild.name}**, não esqueça de ler as <#704054110932172850> para evitar de ser punido.`)
            .addField("Canal do YouTube", "[Inscreva-se](https://www.youtube.com/channel/UCx_biWFPNIqBEKklRAnwaVg)", true)
            .addField("Twitter", `[@sa_trubano](https://twitter.com/sa_trubano)`, true)
        let server = this.client.guilds.cache.get('423191510381625354')
        if (server) {
        // let channel = this.client.guilds.cache.get("423191510381625354").channels.cache.get("767117198069334027")
        // channel.send(embed)
        }


    }
}