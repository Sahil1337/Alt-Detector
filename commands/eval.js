let { owner } = require("../config")

module.exports.run = async(client, message, args) => {
    if (owner.includes(message.author.id)) return
    
    let ev = args.join(" ")
    
    try {
        let sendMessage = (text) => message.channel.send("```\n"+text+"\n```")
        let evaled = await eval(`async function yes(){\n${ev}\n}\nyes()`)
    } catch(e) {
        return message.channel.send(e.message)
    } 
  } 
  module.exports.help = {
    name: "eval",
    aliases: ['e'],
    description: "eval command owner only"
  }
  
