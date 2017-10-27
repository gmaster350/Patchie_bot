/*
	Patchie - collective name for all the bots this script controls.
	
	This bot is made to be versatile with many available tools and utilities.
	Primarily, this bot is made to connect many services together, using
	a range of APIs, including reddit and discord.
*/




////// Module import and setup //////

// Standard nodejs modules
	const fs = require("fs");

// Discord
	const Discord = require("Discord.js");
	const bot = new Discord.Client();
	const prefix = "~!";

// Reddit
	const rawjs = require("raw.js");
	const reddit = new rawjs("User Agent: dragon_vore_bot/1.0 by u/K-guy");
	/*
	fs.readFile("../redditClientId.txt",function(err,clientID){
		if(!err){
			fs.readFile("../redditSecret.txt",function(err,secret){
				if(!err){
					fs.readFile("../password.txt",function(err,pass){
						if(!err){
							reddit.setupOAuth2(clientID.toString(), secret.toString(), "https://github.com/gmaster350/dragon_vore_bot");
							reddit.auth({"username": "dragon_vore_bot", "password": pass.toString()}, function(err, response) {
								if(!err) {
									// The user is now authenticated. If you want the temporary bearer token, it's available as response.access_token
									// and will be valid for response.expires_in seconds.
									// raw.js will automatically refresh the bearer token as it expires. Unlike web apps, no refresh tokens are available.
								}
								else{
									console.log("Unable to authenticate user: " + err);
								}
							});
							
						}
						else{
							console.log("Could not read file: " +err);
						}
					});
				}
				else{
					console.log("Could not read file: " +err);
				}
			});
		}
		else{
			console.log("Could not read file: " +err);
		}
	});
	*/

// Custom modules
	const submenu = require("./submenu.js");
	const test = require("./test.js");
	const mysql = require("./mysql");
	const oh = require("./objectHelper");
	const privateRoom = require("./privateRoom.js");

	
///////////////////////////////////////////////
//  _____               _       _   _   _    //
// |  __ \             | |     | | (_) | |   //
// | |__) |   ___    __| |   __| |  _  | |_  //
// |  _  /   / _ \  / _` |  / _` | | | | __| //
// | | \ \  |  __/ | (_| | | (_| | | | | |_  //
// |_|  \_\  \___|  \__,_|  \__,_| |_|  \__| //
//                                           //
///////////////////////////////////////////////



//////////////////////////////////////////////////////
//  _____    _                                   _  //
// |  __ \  (_)                                 | | //
// | |  | |  _   ___    ___    ___    _ __    __| | //
// | |  | | | | / __|  / __|  / _ \  | '__|  / _` | //
// | |__| | | | \__ \ | (__  | (_) | | |    | (_| | //
// |_____/  |_| |___/  \___|  \___/  |_|     \__,_| //
//                                                  //
//////////////////////////////////////////////////////



/*
	Module handling
	
	In order to facilitate the submenu module, methods are handled through
	handler functions. Handler functions are passed the raw object, and a callback.
	The handler function then parses the message into a form accepted by a module's method. 
	
	The callback must return a string. If string is non-empty, it will be sent to the
	originating channel as a reply, otherwise it will do nothing.
*/
	

// Private Room Module

function createRoom(message,callback){
	var parameters = message.substr(prefix.length).split(" ");
	var name = parameters[1];
	var userlist = [];
	oh.forEach(message.mentions.members.map,function(user,index,self){
		
	},function(){
		privateRoom.create(message.guild,name,userlist,function(){
			
		});
	});
}





// Test Module

function echo(message,callback){
	callback(message.substr(prefix.length + "echo".length + 1));
}





// Submenu Module

submenu.setTree({
	"test":{
		"echo":echo,
		"back":submenu.up, //returns to upper command tree
		"help":submenu.list
	},
	"help":submenu.list
});

function command(message,callback){
	// Split parameters sans prefix
	var parameters = message.content.substr(prefix.length).split(" ");
	
	/* If the (sub)object 
	// present at the user's active node 
	// of the menu tree
	// contains a key
	// matching the first parameter...*/
	submenu.getTree(function(submenu_tree){
		submenu.getActive(message.author.id,function(submenu_active){
			oh.subObject(submenu_tree,submenu_active,function(menu){
				oh.hasKey(menu,parameters[0],function(has_key){
					if(has_key){
						
						/* ...then move the user down the tree
						// such that the user's new active node
						// within the command tree
						// is the submenu they gave*/
						
						submenu.down(message.author.id,parameters[0],function(response){
							
							/* The response given is what the value of the 
							// key-value pair in the subobject at the 
							// current location, which will be either a 
							// string or a function.
							
							// The string response exists for the purpose of responsiveness.
							
							// If the value of the key-value pair with the key whose string-value
							// is equal to the first command parameter 
							// is another sub-object, 
							// it means that the command they entered was the name of a submenu, 
							// and must then be moved down the subtree.
							// Their active node will be changed 
							// to reflect their current location
							// in the submenu tree. */
							
							if(typeof response == "string"){
								callback(response);
							}	
							
							/* If however the response's type is a function
							// it indicates that the value of the key-value pair 
							// with the key whose string-value
							// is equal to the first command parameter
							// references a function.
							// In this case, the user remains where they are in the submenu tree
							// and the function is called.
							
							// The function will be defined above, likely to handle the imput,
							// processing the raw Message object so that it can be used by another
							// method or function, of which will likely have its own formal parameter format. */
							
							else if(typeof response == "function"){
								response(message,function(res){
									if(res instanceof String && res.length > 0){
										callback(res);
									}
								});
							}
						});
					}
				});
			});
		});
	});
}




/*
	General functions:
	
	Any functions not part of any module. These include event handling and command rooting
*/

var errorCodes = ["Error:","Warning:","Note:","Be advised:"];
var errorTimeout = 5000;

bot.once("ready",function(){
	console.log("I'm ready!");
	bot.user.setGame("prefix: " + prefix);
	
	oh.forEach(bot.guilds,function(guild,guildSnowflake,self){
		oh.forEach(guild.members,function(member,memberSnowflake,self){
			submenu.addUser(member.id);
		});
	});
});


bot.on("message",function(message){
	var send = "";
	submenu.getActive(message.author.id,function(submenu_active){
		oh.forEach(submenu_active,function(node){
			send += node + "> ";
		});
	});
	
	if(message.content.startsWith(prefix)){
		command(message,function(response){
			if(response){
				if(errorCodes.some(function(code){return response.startsWith(code)})){
					message.channel.send(response + "\n`this is a temporary message`").then(function(msg){
						msg.delete(errorTimeout);
					});
				}
				else{
					message.channel.send(response);
				}
			}
		});
	}
});

// Login secret exists in a folder one level about the git folder.
fs.readFile("../discordSecret.txt",function(err,secret){
	bot.login(secret.toString());
});