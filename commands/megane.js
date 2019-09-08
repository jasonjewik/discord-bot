// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');
// gets node's XML request
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
     name: 'megane',
     description: "Sends a pic of a random anime girl with glasses.",
     cooldown: 3,
     usage: `\`${prefix}megane\``,
     execute(message, args) {
          var data = null;
          var url = "https://api.imgur.com/3/album/FgMyA";

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;

          xhr.addEventListener("readystatechange", function () {
               if (this.readyState === 4) {
                    var arr = JSON.parse(this.responseText).data;
                    var rand = Math.floor(Math.random() * arr.images_count);
                    var img = arr.images[rand];
                    message.channel.send(new Discord.RichEmbed()
                         .setImage(img.link)
                         .addField("Title", img.title, true)
                         .addField("Views", img.views, true)
                    );
               }
          });

          xhr.open("GET", url);
          xhr.setRequestHeader("Authorization", "Client-ID 723620f0c4b829e");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Postman-Token", "af1bdd3b-48c7-4b6d-89e0-dca6999e693a");

          xhr.send(data);
     }
}
