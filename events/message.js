const { prefix } = require("../config");

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;

  if (!message.content.toLowerCase().startsWith(prefix)) return;
  if (message.content === prefix) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  if (message.channel.type === "dm") return false;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args).catch(console.log);
  if (!command) return;
  client.capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
};
