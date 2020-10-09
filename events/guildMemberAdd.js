const Discord = require('discord.js');
const moment = require("moment");
const db = require('../database');
const message = require('./message');

module.exports = async (client, member) => {

  //getting loggingcChannel
  let LoggingChannel = await db.get(`LoggingChannel_${member.guild.id}`);
  if (!LoggingChannel)return console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (channel not found)`);

  //getting notify role
  let notifyRole = await db.get(`notifyRole_${member.guild.id}`);
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
  if (!AltAge) return db.set(`altAge_${member.guild.id}`, 31)

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


let AutoKick = await db.fetch(`AutoKick_${member.guild.id}`);
if (!AutoKick)return console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (AutoKick Isn't Enabled)`);

let AutoKickAge = await db.get(`AutokickAge_${member.guild.id}`)
if (!AutoKickAge) return db.set(`AutokickAge_${member.guild.id}`, 8)

  if (AutoKick === true) {

 let checking = await db.get(`WhiteListed_${member.guild.id}`)

  if (checking === member.user.id) {
   let embed = new Discord.MessageEmbed()
   .setTitle(`Auto Kick System Stucked On`)
   .setDescription(`
**__NAME__** - ${member.user} (${member.user.username})
**__KICKED__** - NO
**__REASON__** - WhiteListed User`)
.setColor("RANDM");
member.guild.channels.cache.get(LoggingChannel).send(embed)

  } else {

    if (created < AutoKickAge) {
    let embed = new Discord.MessageEmbed()
    .setTitle(`Auto Kick System Kicked SomeOne`)
    .setDescription(`
**__NAME__** - ${member.user} (${member.user.username})
**__ID__** - ${member.user.id}
**__KICKED FROM GUILD NAME__** - ${member.guild.name}
**__KICKED REASON__** - ALT ( Created ${created} Days Ago)
`)
    .setColor('RANDOM')
      member.kick()
      console.log(`kicked`)
      member.guild.channels.cache.get(LoggingChannel).send(embed)

  } 
}

  } else {
    console.log(`Autokick Isnt Disabled in ${memeber.guild.name}`)

  }

   }
}
