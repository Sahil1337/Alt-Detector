const Discord = require("discord.js");
const ms = require("ms");
const db = require('../database');

module.exports.run = async (client, message) => {
  //args
  const args = message.content.split(" ").slice(1);

if(message.member.hasPermission("ADMINISTRATOR")) {

  const config = new Discord.MessageEmbed()
  .setTitle(`CONFIG`)
  .setDescription(`
  \`a!config logChannel\` - **__Sets The logging Channel__**
  \`a!config notifyRole\` - **__Sets The Notify Role__**
  \`a!config altAge\`    - **__Sets The Alt Age__**
  `)
  .setColor(`RANDOM`)

  if (args[0] === undefined) {
    return message.channel.send(config)
  }

  if (args[0].toLowerCase() === "logchannel") {
    args.shift();

    let LoggingChannel = message.mentions.channels.first();

    if (!LoggingChannel)
      return message.channel.send(`**PLEASE MENTION A VALID CHANNEL**`);

    var guildicon = message.guild.iconURL();

    const succes = new Discord.MessageEmbed()
      .setTitle(`Alt Logging Channel has been Setted!`)
      .setDescription(`New Channel is ${LoggingChannel}`)
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


  } else if(args[0].toLowerCase() === "altage") {
    args.shift();

    let altage = Number(args[0])

    if (!altage) {
        return message.channel.send(`**Please Specify The AltAge \n__IN FORMAT__ : 30 [FOR 30 DAYS]**`)
    }
 
    if (altage > 120) {
        return message.channel.send(`**Huh ! ${message.author} You Can't Set Age Above __\`120\`__ Days**`)
    }
    var guildicon = message.guild.iconURL();
 
     const succes = new Discord.MessageEmbed()
       .setTitle(`AltAge has been Setted!`)
       .setDescription(`New AltAge is \`${altage}\` Days`)
       .setThumbnail(guildicon)
       .setFooter("Bot Made By ItzCutePichu#0001");
 
     message.channel.send(succes);

     db.delete(`altAge_${message.guild.id}`)
     db.set(`altAge_${message.guild.id}`, altage)
  } 
 
  else message.channel.send("Unknown config variable...")
}
};

module.exports.help = {
  name: "config",
  aliases: ["config"],
  description: "sets config like loggingChannel , NotifyRole , AltAge",
};
