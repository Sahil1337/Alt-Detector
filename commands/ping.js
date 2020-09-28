const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    
    message.channel.send(`Pinging...`)
    .then(messageTime => {
      messageTime.edit(`Pong!I am running with ${messageTime.createdTimestamp - message.createdTimestamp}ms`) 
    }) 
    //end
}

module.exports.help = {
    name: "ping",
    aliases: ['ping'],
    description: "gives the bot ping"
  }
  
