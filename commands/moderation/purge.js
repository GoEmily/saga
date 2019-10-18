const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "clear",
    aliases: ["delete", "purge", "p", "c"],
    category: "moderation",
    description: "Delete message",
    usage: "<number>",
    run: async (client, message, args) => {

      const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

      if (message.deletable) message.delete();

      if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("❌You don't have permission to use this command")
        .then(msg => msg.delete(5000));

      }

      if(!args[0]){
        return message.channel.send("Please specify the number of messages to clear ``ex: _clear 10``")
        .then(msg => msg.delete(5000));
      }

      message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`🗑️ I have deleted \`${args[0]} messages\`!`).then(msg => msg.delete(5000));
    })
    }
}
