const Discord = require('discord.js');
const moment = require("moment");
const db = require('../database');

module.exports = async (client, member) => {
  //getting loggingcChannel
  let LoggingChannel = await db.get(`LoggingChannel_${member.guild.id}`);

  //if no channel found in the specific guild
  if (!LoggingChannel)console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (channel not found)`);

  //getting notify role
  let notifyRole = await db.get(`notifyRole_${member.guild.id}`);

  //if no role found in the specific guild
  if (!notifyRole)return console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (role not found)`);

  //to get created date in days format
  let x = Date.now() - member.user.createdAt;
  let created = Math.floor(x / 86400000);

  //creation date
  let creationDate = moment
    .utc(member.user.createdAt)
    .format("dddd, MMMM Do YYYY, HH:mm:ss");

  //joindate
  let joiningDate = moment
    .utc(member.joinedAt)
    .format("dddd, MMMM Do YYYY, HH:mm:ss");

  //joinposition
  let joinPosition = member.guild.memberCount

  //altdate
  let AltAge = await db.get(`altAge_${member.guild.id}`)

  //only sends message when alt found
  if (created < AltAge) {
    //embed
    let altEmbed = //main alt message
    new Discord.MessageEmbed().setTitle("Alt Found!").setColor("RANDOM").setFooter("Bot Made By ItzCutePihcu#0001")
      .setDescription(`
**__Alt Name__**: ${member.user} (${member.user.username})

**__ID__**: ${member.user.id}

**__Account Created__**: ${created} days ago

**__Account Creation Date__**: ${creationDate}

**__Join Position__**: ${joinPosition}

**__Join Date__**: ${joiningDate}
`);

    member.guild.channels.cache.get(LoggingChannel).send(`__Notification:__ <@&${notifyRole}>`, altEmbed);
  }
};
