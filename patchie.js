/*
	Patchie - collective name for all the bots this script controls.
	
	This bot is made to be versatile with many available tools and utilities.
	Primarily, this bot is made to connect many services together, using
	a range of APIs, including reddit and discord.
*/




////// Module import and setup //////

// Standard nodejs modules
	const fs = require("fs");
	const process = require("process");
	

// Custom modules
	const submenu = require("./submenu.js");
	const test = require("./test.js");
	const mysql = require("./mysql");
	const oh = require("./objectHelper");

	
///////////////////////////////////////////////
//  _____               _       _   _   _    //
// |  __ \             | |     | | (_) | |   //
// | |__) |   ___    __| |   __| |  _  | |_  //
// |  _  /   / _ \  / _` |  / _` | | | | __| //
// | | \ \  |  __/ | (_| | | (_| | | | | |_  //
// |_|  \_\  \___|  \__,_|  \__,_| |_|  \__| //
//                                           //
///////////////////////////////////////////////


	const rawjs = require("raw.js");
	const reddit = new rawjs("User Agent: dragon_vore_bot/1.0 by u/K-guy");

	var getModQueue;	
	var titleMatch = new RegExp(/^(\[.+\])? ?[^\[\]]+ (\(.+\))+ ?(\{.+\})+ ?(\[.+\])+$/g);
	var vorePrepends = ["implied","imminent"];
	var voreTypes = ["soft vore","hard vore","oral vore","anal vore","unbirth","vaginal vore","dick vore","cock vore","urethra vore","tail vore","absorption","alternative vore","mawshot","non vore","non-vore","tongueplay","tongue play","tongue-play"];
	
	function doubleSplit(string,str1,str2,callback){
		if(str1 != str2 && str1 !== undefined && str2 !== undefined){
			str1_indices = [];
			str2_indices = [];
			for(var i=0,offset=0;i<string.length;i++){
				if(string.charAt(i) == str1){
					if(offset === 0)
						str1_indices.push(i);
					offset++;
				}
				if(string.charAt(i) == str2){
					offset--;
					if(offset === 0)
						str2_indices.push(i);
				}
			}
			if(str1_indices.length == str2_indices.length){
				var result = [];
				for(var s1 = 0, s2 = 0; s1 < str1_indices.length && s2 < str2_indices.length; s1++, s2++){
					result.push(string.substring(str1_indices[s1]+1,str2_indices[s2]));
				}
				callback(result);
			}
			else{
				callback("Token count mismatch. \n'"+str1+"': "+String(str1_indices.length)+"\n'"+str2+"': "+String(str2_indices.length));
			}
		}
		else{
			callback("You must provide two different token characters");
		}
	}
	
	function titleCheck(title,callback){
		var is_nsfw = false;
		var artists = [];
		var characters = [];
		var types = [];
		var content = [];
		
		if(title.startsWith("[")){
			if(title.startsWith("[NSFW]")){
				is_nsfw = true;
			}
			else{
				callback(false,null,"Malformed [NSFW] tag.",{});
			}
		}
		
		var opened = "";
		var index = 0;

		doubleSplit(title,"(",")",function(res){
			if(typeof res == "string"){
				callback(false,is_nsfw,res,{});
			}
			else{
				res.forEach(function(a){
					artists.push(a)
				});
				doubleSplit(title,"{","}",function(res){
					if(typeof res == "string"){
						callback(false,is_nsfw,res,{});
					}
					else{
						res.forEach(function(a){
							characters.push(a);
						});
						doubleSplit(title,"[","]",function(res){
							if(typeof res == "string"){
								callback(false,is_nsfw,res,{});
							}
							else{
								res.some(function(a){
									if(voreTypes.some(function(vt){
										return vorePrepends.some(function(vp){
											return a == vp + " " + vt;
										});
									})){
										if(content.length == 0){
											types.push(a);
											return true;
										}
										else{
											callback(false,is_nsfw,"Vore Type tag ('"+a+"') found within content tags.",{});
											return false
										}
									}
									content.push(a);
									return true;
								});
								callback(true,is_nsfw,"",{
									"artists":artists,
									"characters":characters,
									"types":types,
									"content":content
								});
							}
						});
					}
				});
			}
		});
	}
	
	fs.readFile("../redditSecrets.txt",function(err,res){
		var data = JSON.parse(res);
		if(!err){
			reddit.setupOAuth2(data.clientId, data.secret, "https://github.com/gmaster350/Patchie_bot");
			reddit.auth({"username": data.username, "password": data.password}, function(err, response) {
				if(!err) {
					console.log("Successfully logged into reddit.");
					
					getModQueue = setTimeout(function(){
						reddit.unmoderated({"r":"dragonvore","limit":1},function(err,response){
							if(!err){
								response.children.forEach(function(p){
									var post = p.data;
									if(post.title.match(titleMatch) != null){
										titleCheck(post.title,function(is_valid,nsfw,error,res){
											if(is_valid){
												// approve post
												
											}
											else{
												console.log(error);
											}
										});
									}
								});
							}
							else{
								console.log(err);
							}
						});
					},10000);
					
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
	











//////////////////////////////////////////////////////
//  _____    _                                   _  //
// |  __ \  (_)                                 | | //
// | |  | |  _   ___    ___    ___    _ __    __| | //
// | |  | | | | / __|  / __|  / _ \  | '__|  / _` | //
// | |__| | | | \__ \ | (__  | (_) | | |    | (_| | //
// |_____/  |_| |___/  \___|  \___/  |_|     \__,_| //
//                                                  //
//////////////////////////////////////////////////////

	const Discord = require("Discord.js");
	const bot = new Discord.Client();
	const prefix = "~!";



/*
	Module handling
	
	In order to facilitate the submenu module, methods are handled through
	handler functions. Handler functions are passed the raw object, and a callback.
	The handler function then parses the message into a form accepted by a module's method. 
	
	The callback must return a string. If string is non-empty, it will be sent to the
	originating channel as a reply, otherwise it will do nothing.
*/
	


// Test Module

function echo(message,callback){
	var cut = message.content.substr(prefix.length + 5);
	callback(cut);
}

function reverse(message,callback){
	result = "";
	for(var i = message.content.length-1; i > "reverse".length+2; i--){
		result += message.content.charAt(i);
	}
	callback(result);
}



// Submenu Module

var commandTree = {
	"test":{
		"echo":echo,
		"reverse":reverse,
		"back":submenu.up, //returns to upper command tree
		"help":submenu.list, //print commands present at current location
		"whereami":submenu.place
	},
	"back":submenu.up,
	"help":submenu.list,
	"whereami":submenu.place
}

fs.readFile("../submenuData.txt",function(err,data){
	if(err){
		console.log(err);
	}
	else{
		submenu.importActive(JSON.parse(data),function(){
			console.log("Loaded Submenu data");
			submenu.setTree(commandTree);
		});
	}
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
									callback(res);
								});
							}
						});
					}
					else{
						callback("Error: No command or menu exists with that name.");
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

var errorCodes = ["Error:","Warning:","Note:","Be advised:","Info:"];
var errorTimeout = 30000;

bot.once("ready",function(){
	bot.user.setPresence("online").then(function(user){
		user.setGame("prefix: " + prefix).then(function(usr){
			console.log("I'm ready!");
		},
		function(err){
			console.log(err);
		});
	},function(err){
		console.log(err);
	});
});


bot.on("message",function(message){
	var send = "";
	
	if(message.content == (prefix + "ping")){
		message.channel.send("pong");
	}
	
	if(message.content == (prefix + "stop") && message.channel.type == "text"){
		if(message.member.permissions.has("MANAGE_GUILD")){
			message.channel.send("Bye!").then(function(msg){
				setTimeout(function(){
					msg.delete();
						bot.user.setStatus("invisible").then(function(user){
							bot.destroy().then(function(){
							console.log("\n\n\n\n\n\n\nClean exit.");
						},function(err){
							console.log(err);
						});
					});
				},1000);
			});
		}
		else{
			message.channel.send("Insufficient Permissions.\n`this is a temporary message`").then(function(msg){msg.delete(5000)});
		}
	}
	
	/*
	
	submenu.evaluate(prefix,message,function(response){
		message.channel.send(response);
	});
	
	*/
	
	else if(message.content.startsWith(prefix)){
		command(message,function(response){
			if(typeof response == "string" && response.length > 0){
				if(errorCodes.some(function(code){return response.startsWith(code)})){
					send += response + "\n`this is a temporary message` `("+String(errorTimeout/1000)+" seconds)`";
					message.channel.send(send).then(function(msg){
						msg.delete(errorTimeout);
					});
				}
				else{
					send += response;
					message.channel.send(send);
				}
			}
		});
	}
});

// Login secret exists in a folder one level about the git folder.
fs.readFile("../discordSecret.txt",function(err,secret){
	bot.login(secret.toString());
});