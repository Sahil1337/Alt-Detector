const Discord = require("discord.js");
const ms = require("ms");
const db = require("../database");
module.exports.run = async (client, message) => {
  //args
  const args = message.content.split(" ").slice(1);

  if (args[0].toLowerCase() === "logchannel") {
    args.shift();

    let LoggingChannel = message.mentions.channels.first();

    if (!LoggingChannel)
      return message.channel.send(`**PLEASE MENTION A VALID CHANNEL**`);

    var guildicon = message.guild.iconURL();

    const succes = new Discord.MessageEmbed()
      .setTitle(`Alt Logging Channel has been Setted!`)
      .setThumbnail(guildicon)
      .setFooter("Bot Made By ItzCutePichu#0001");
    message.channel.send(succes);

    db.delete(`LoggingChannel_${message.guild.id}`);

    db.set(`LoggingChannel_${message.guild.id}`, LoggingChannel.id);

    let embed2 = new Discord.MessageEmbed()
      .setTitle(`:white_check_mark: Everything Ready!`)
      .setFooter("Bot Made By ItzCutePichu#0001");

    message.channel.send(embed2);
  } else if (args[0].toLowerCase() === "notifyrole") {
    args.shift();

    let notifyRole = message.mentions.roles.first();

    if (!notifyRole)
      return message.channel.send(`**PLEASE MENTION A VALID ROLE**`);

    var guildicon = message.guild.iconURL();

    const succes = new Discord.MessageEmbed()
      .setTitle(`Alt Notify Role has been Setted!`)
      .setDescription(`New Role is ${notifyRole}`)
      .setThumbnail(guildicon)
      .setFooter("Bot Made By ItzCutePichu#0001");

    message.guild.roles.cache.get(notifyRole);
    message.channel.send(succes);

    db.delete(`notifyRole_${message.guild.id}`);

    db.set(`notifyRole_${message.guild.id}`, notifyRole);

    let embed = new Discord.MessageEmbed()
      .setTitle(`:white_check_mark: Everything Ready!`)
      .setFooter("Bot Made By ItzCutePichu#0001");

    message.channel.send(embed);
  }else message.channel.send("Unknown config variable...")
};

module.exports.help = {
  name: "config",
  aliases: ["config"],
  description: "sets config like loggingChannel , NotifyRole",
};
