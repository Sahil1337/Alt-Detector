  
const Discord = require("discord.js")
const db = require('../database');
let cooldown = new Set();
const config = require('../config')

module.exports.run = async(client, message, member) => {

 if (!message.member.hasPermission("MANAGE_GUILD")) {
    await message.delete()
    return message.channel.send(`**You Dont Have Permission To Use This Command**`)
  }

  if(cooldown.has(message.author.id)) {
    message = await
    message.channel.send({embed: {color: "#10de47", description: `**You need to wait __${config.COOLDOWN}__ minutes to use this command again!**`}});
    setTimeout(() => {
      message.delete();
      }, 3000);
} else {

let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle("AUTO SETUP")
  .setTimestamp()
  .setFooter("Bot Made By ItzCutePichu#0001");
  
  let xd = await message.channel.send(embed)
  xd.react("✅")
  xd.react("❌")

const filter = (reaction, user) => {
    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
};

xd.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(async collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '✅') {
            let channel = client.channels.cache.find(x => x.name === "alt-logging")
  if (channel) {
    channel.delete().catch(console.log)
  }
  await message.guild.channels.create('alt-logging', {
    type: 'text',
    permissionsOverwrites: [{
    id: message.guild.id,
    deny: ['SEND_MESSAGES'],
    allow: ['VIEW_CHANNEL']
    }]
  })
let role = message.guild.roles.cache.find(role => role.name === "alt-notify")
if (role) {
  role.delete().catch(console.log)
} 
  await message.guild.roles.create({
    data: {
      name: 'alt-notify',
      color: 'RANDOM',
    }
    }) 

    let LoggingChannel = client.channels.cache.find(x => x.name === "alt-logging")
  await db.delete(`LoggingChannel_${message.guild.id}`)         
  await db.set(`LoggingChannel_${message.guild.id}`, LoggingChannel.id)

  let notifyRole = message.guild.roles.cache.find(role => role.name === "alt-notify")
   await db.delete(`notifyRole_${message.guild.id}`) 
   await db.set(`notifyRole_${message.guild.id}`, notifyRole)

  let AutoSetupEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**__DOING AUTOSETUP__** \n **Please Wait For While ....**`)
  .setFooter("Bot Made By ItzCutePichu#0001");

  let AutoSetupDoneEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**__AUTO SETUP DONE__** \n **Now Alt Logging Channel is ${LoggingChannel} \n And Alt Notify Role is ${notifyRole}**`)
  .setFooter("Bot Made By ItzCutePichu#0001");
  
  message = await
  message.channel.send(AutoSetupEmbed)
  setTimeout(() => {
    message.edit(AutoSetupDoneEmbed);
    }, 1000);
} else {
    message.reply('Alright ! Process Has Been Cancelled');
  } 
})
.catch(collected => {
if(xd.reactions.cache.size !== null) return
  else message.reply(`Time Up ! You Didn't Reacted`);
    })
  }
  cooldown.add(message.author.id);
  setTimeout(() => {
      cooldown.delete(message.author.id);
  }, config.COOLDOWN * 60 * 1000);
  } 
  module.exports.help = {
      name: "auto-setup",
      aliases: ['autosetup'],
      description: "autosetup the bot"
    }
