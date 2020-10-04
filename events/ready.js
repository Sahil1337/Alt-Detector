const { prefix } = require('../config')
const chalk = require('chalk')

module.exports = async(client) => {
    await client.user.setActivity(`${prefix}help` , {type: 'STREAMING'}).catch(console.error);
    console.log(chalk.cyanBright("Logged in to discord as" + " " + client.user.username))
}
