// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');
// gets node's XML request
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
     name: 'fang',
     description: "Pulls up an image of an anime girl with f a n g.",
     cooldown: 3,
     usage: `\`${prefix}loli\``,
     execute(message, args) {
          var data = null;
          var url = "https://api.imgur.com/3/gallery/r/cutelittlefangs/time/";
          /*var albums = ["gLUGw", "V2cR5r3", "9NuC4", "8MqPd", "bbD7Z", "Fy7Dm", "2Hcev"];
          var randA = Math.floor(Math.random() * albums.length);
          var url = "https://api.imgur.com/3/album/" + albums[randA];*/

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;

          xhr.addEventListener("readystatechange", function () {
               if (this.readyState === 4) {
                    var arr = JSON.parse(this.responseText).data;
                    var rand = Math.floor(Math.random() * arr.length)
                    //var rand = Math.floor(Math.random() * arr.images_count);
                    var img = arr[rand];
                    //var img = arr.images[rand];
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
