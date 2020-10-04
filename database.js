const { Database } = require('quickmongo');
const chalk = require('chalk')
const db = new Database('ur_mongo_url');

db.on('ready', () => {
    console.log(chalk.yellowBright(`Connected to database`))
})

module.exports = db;
