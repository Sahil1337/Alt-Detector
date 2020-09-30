const { mongoURL } = require("./config")
const { Database } = require("quickmongo");

const db = new Database(mongoURL);

module.exports = db