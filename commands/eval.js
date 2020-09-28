const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    let owner = ['ur ids', 'ur ids']

    if (owner.includes(message.author.id)) return
    
    let ev = args.join(" ")
    
    try {
      message.channel.send(await eval(ev)) 
    } catch(e) {
      return message.channel.send(e.message) 
    } 
  } 
  module.exports.help = {
    name: "eval",
    aliases: ['e'],
    description: "eval command owner only"
  }
  
