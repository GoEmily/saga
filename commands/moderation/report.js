const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention, id>",
    run: async (client, message, args) => {

        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Can't report that member").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));

        const logChannel = message.guild.channels.find(c => c.name === "reports") || message.channel;

        if (!logChannel)
            return message.channel.send("Couldn't find a \`#reports`\ channel").then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.user.id})
            **> Reported by:** ${message.member}
            **> Reported in:** ${message.logChannel}
            **> Reason:** ${args.slice(1).join(" ")}`);

        return logChannel.send(embed);
    }
}
