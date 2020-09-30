const moment = require("moment");
let db = require("../database")

module.exports = async (client, member) => {
  //getting loggingcChannel
  let LoggingChannel = await db.get(`LoggingChannel_${member.guild.id}`);

  //if no channel found in the specific guild
  if (!LoggingChannel)console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} (channel not found)`);

  //getting notify role
  let notifyRole = await db.get(`notifyRole_${member.guild.id}`);

  //if no role found in the specific guild
  if (!notifyRole)return console.log(`Setup Is Not Done in ${member.guild.id} (${member.guild.name}) (role not found)`);

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

  //only sends message when alt found
  if (created < 31) {
    //embed
    let altEmbed = //main alt message
    new Discord.MessageEmbed().setTitle("Alt Found!").setColor("RANDOM")
      .setDescription(`
**__Alt Name__**: ${member.user} (${member.user.username})
**ID**: ${member.user.id}
**Account Created**: ${created} days ago
**Account Creation Date**: ${creationDate}
**Join Position**: ${member.guild.memberCount}
**Join Date**: ${joiningDate}
`);

    member.guild.channels.cache
      .get(LoggingChannel)
      .send(`Notification: <@&${notifyRole}>`, altEmbed);
  }
};
