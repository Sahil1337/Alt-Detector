const discord = require('discord.js')
const db = require('../database')
const chalk = require('chalk')


    module.exports.run = async(client, message) => {

        let logChannel = await db.get(`LoggingChannel_${message.guild.id}`)
        let NotifyRole = await db.get(`notifyRole_${message.guild.id}`)
        let AltAge = await db.get(`altAge_${message.guild.id}`)

        let channel = `<#${logChannel}>`
        let role = `<@&${NotifyRole}>`
        let age = `${AltAge} Days`

        if (logChannel === null) {
            channel = "NO CHANNEL FOUND"
        }

        if (NotifyRole === null) {
            role = "NO ROLE FOUND"
        }

        if (AltAge === null) {
            age = "**31 [BY DEFAULT]**"
        }

        let embed = new discord.MessageEmbed()
        .setTitle(`CONFIG SETTINGS`)
        .setDescription(`
        __**ALT LOG CHANNEL**__ - ${channel}
        __**ALT NOTIFY ROLE**__ - ${role}
        __**ALT ACCOUNT AGE**__ - ${age}
        `)
       

        message.channel.send(embed)
}

module.exports.help = {
    name: "settings",
    aliases: ['setting'],
    description: "shows settings"
  }
  
