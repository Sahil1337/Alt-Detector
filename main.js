//importing
const Discord = require('discord.js');;
const client = new Discord.Client();
const config = require('./config.json')
const fs = require('fs');
const moment = require('moment')

//one more important thing i used quick mongo to make this bot not quick.db

const { Database } = require("quickmongo");
const db = new Database(" ");//upload ur mongoose cluster or local host

//ready event
client.on('ready', () => {
    client.user.setActivity('a!help' , {type: 'STREAMING'}).catch(console.error);
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("Couldn't find any commands");
    return;
  }
  jsfile.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${f} Loaded`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./events/", (err, files) => {
  if(err) return console.log(err);
  files.forEach(f => {
    const event = require(`./events/${f}`);
    let eventName = f.split(".")[0];
    console.log(`Event Loaded: ${f}`);
    client.on(eventName, event.bind(null, client));
  });
});

   //guildMemberadd event started
   client.on("guildMemberAdd", async member => {

    //getting loggingcChannel
     let LoggingChannel = await db.get(`LoggingChannel_${member.guild.id}`)
 
     //if no channel found in the specific guild
     if (!LoggingChannel) {
         console.log(`Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} (channel not found)`)
     }
 
     //getting notify role
     let notifyRole = await db.get(`notifyRole_${member.guild.id}`)
 
     //if no role found in the specific guild
     if (!notifyRole) {
       return console.log(`Setup Is Not Done in ${member.guild.id} (${member.guild.name}) (role not found)`)
     }
 
     //to get created date in days format
     let x = Date.now() - member.user.createdAt;
     let created = Math.floor(x / 86400000);

     //creation date
     let creationDate = moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss");

     //joindate
     let joiningDate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
 
     //only sends message when alt found
     if (created < 31) {
 
     //embed
         let altEmbed = new Discord.MessageEmbed()
         .setTitle('ALT FOUND')
         .setColor('RANDOM')
         //main alt message
         .setDescription(`**__Alt Name__** \n${member.user} (${member.user.username}) \n**__ID__** \n${member.user.id}\n**__Account Created__** \n${created} days ago \n**__Account Creation Date__** \n${creationDate} \n__**Join Position**__ \n${member.guild.memberCount} \n __**Join Date**__ \n${joiningDate}`)
   
         member.guild.channels.cache.get(LoggingChannel).send(`<@&${notifyRole}>`, altEmbed)
 
       }
 })

client.login(config.token);
