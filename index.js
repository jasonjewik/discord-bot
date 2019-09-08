// require node.js's file system module
const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');

// gets the bot's prefix and token
const {prefix, token} = require('./config.json');
// create a new Discord client
const client = new Discord.Client();
//gets the commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
// command cooldowns
const cooldowns = new Discord.Collection();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
     client.user.setActivity('Ferret and Carrot', {type: 'PLAYING'})
     .then(presence => {console.log("Activity set to 'Playing Ferret and Carrot'.")})
     .catch(console.error());
     console.log('Ready!');
});

// messages
client.on('message', message => {
     // exits early if the message doesn't have the prefix or if the message was sent by a bot
     if (!message.content.startsWith(prefix) || message.author.bot) return;

     // splits based on spaces into an array
     const args = message.content.slice(prefix.length).split(/ +/); // / +/ is to ensure all spaces are skipped
     // converts the first element of the array (the command) to lower case just in case
     const commandName = args.shift().toLowerCase();

     // if the command does not exist, exit early
     if (!client.commands.has(commandName)) return;
     const command = client.commands.get(commandName)

     // check cooldowns
     if (!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Discord.Collection());
     }
     const now = Date.now();
     const timestamps = cooldowns.get(command.name);
     const cooldownAmount = (command.cooldown || 2) * 1000; // defaults cd to 3 sec just in case
     // adds the cooldown to the user who last used a command
     if (!timestamps.has(message.author.id)) {
          timestamps.set(message.author.id, now); // sets the time of last command used
          // allows the user to use commands again after a cooldown
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
     } else { // tells users who try to exceed the cooldown to wait
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
               return message.reply(`please wait before using ${command.name} again.`);
          }

          timestamps.set(message.author.id, now);
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
     }

     try { //otherwise, execute the command
          command.execute(message, args);
     }
     catch (error) { // in case of error
          console.error(error);
          message.reply('error trying to execute command!')
     }
})

// update status
client.setInterval(updateStatus, 1000 * 60);

// updates status based on random chance after a message is sent
function updateStatus() {
     let updateChance = Math.floor((Math.random() * 100) + 1);
     if (updateChance >= 80) {
          client.user.setActivity('Anime', {type: 'WATCHING'})
          .then(presence => console.log("Activity set to 'Watching Anime'."))
          .catch(console.error());
     } else if (updateChance >= 60) {
          client.user.setActivity('Ferret and Carrot', {type: 'PLAYING'})
          .then(presence => console.log("Activity set to 'Playing Ferret and Carrot'."))
          .catch(console.error());
     } else if (updateChance >= 40) {
          client.user.setActivity('Jim World', {type: 'PLAYING'})
          .then(presence => console.log("Activity set to 'Playing Jim World'."))
          .catch(console.error());
     } else if (updateChance >= 20) {
          client.user.setActivity('Chinese Cartoons', {type: 'WATCHING'})
          .then(presence => console.log("Activity set to 'Watching Chinese Cartoons'."))
          .catch(console.error());
     } else {
          client.user.setActivity('Pokémon', {type: 'PLAYING'})
          .then(presence => console.log("Activity set to 'Playing Pokémon'."))
          .catch(console.error());
     }
}

// login to Discord with your app's token
client.login(token);
