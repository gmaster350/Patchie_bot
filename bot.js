/*
	Patchie - collective name for all the bots this script controls.
	
	This bot is made to be versatile with many available tools and utilities.
	Primarily, this bot is made to connect many services together, using
	a range of APIs, including reddit and discord.
*/
const version = "1.0.3 BETA";



////// Module import and setup //////

// Standard nodejs modules
	const fs = require("fs");
	const process = require("process");
	

// Custom modules
	const submenu = require("./submenu.js");
	const test = require("./test.js");
	const mysql = require("./mysql");
	const oh = require("./objectHelper");

	
/*	
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
	var titleMatch = new RegExp(/^(\[.+\])? ?[^\[\]]+( (\(.+\))+ ?(\{.+\})+ ?(\[.+\])+)?$/g);
	var exceptions = ["roleplay","rp","discussion","meta","question","request","survey"];
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
		
		if(exceptions.some(function(ex){
			return title.startsWith
		})){
		}

		var check = true;
		
		var checkExceptions = title.replace(" ","").startsWith("[");
		var exceptionsValid = false;
		
		// Check to see if the post is marked as NSFW
		if(title.toLowerCase().replace(" ","").startsWith("[NSFW]")){
			is_nsfw = true;
			exceptionsValid = true;
		}
		
		// If the title begins with one of the exceptions, we do not need to check for tags set check as false.
		else if(exceptions.some(function(ex){
			return title.toLowerCase().replace(" ","").startsWith("[" + ex + "]");
		})){
			check = false;
			exceptionsValid = true;
			callback(true,is_nsfw,"",{
				"artists":artists,
				"characters":characters,
				"types":types,
				"content":content
			});
		}
		
		if(checkExceptions && !exceptionsValid){
			callback(false,is_nsfw,"Bad tag at start of title.",{});
		}
		
		else if(check){
		
			// Collect Artist tags
			doubleSplit(title,"(",")",function(res){
				if(typeof res == "string") console.log(res);
				else{
					res.forEach(function(a){
						artists.push(a)
					});
					
					// Collect character tags.
					doubleSplit(title,"{","}",function(res){
						if(typeof res == "string") console.log(res);
						else{
							res.forEach(function(a){
								characters.push(a);
							});
							
							// Collect type and content tags.
							doubleSplit(title,"[","]",function(res){
								if(typeof res == "string") console.log(res);
								else{
									if(checkExceptions){
										res.shift();
									}
									var errorRes = "";
									if(res.some(function(a){
										if(voreTypes.some(function(vt){
											return vorePrepends.some(function(vp){
												return a == vp + " " + vt;
											});
										})){
											if(content.length == 0){
												types.push(a);
												return false;
											}
											else{
												//short circuit Array.some() if a vore tag is discovered after some content tags are added.
												errorRes = "Vore Type tag ('"+a+"') found within content tags.";
												return true; 
											}
										}
										else{
											content.push(a);
											return false;
										}
									})){
										callback(false,is_nsfw,errorRes,{});
									}
									else{
										callback(true,is_nsfw,"",{
											"artists":artists,
											"characters":characters,
											"types":types,
											"content":content
										});
									}
								}
							});
						}
					});
				}
			});
		}
	}
	
	fs.readFile("../redditSecrets.txt",function(err,res){
		var data = JSON.parse(res);
		if(err) console.log("Could not read file: " +err);
		else{
			reddit.setupOAuth2(data.clientId, data.secret, "https://github.com/gmaster350/Patchie_bot");
			reddit.auth({"username": data.username, "password": data.password}, function(err, response) {
				if(err) console.log("Unable to authenticate user: " + err);
				else{
					console.log("Successfully logged into reddit.");
					
					getModQueue = setInterval(function(){
						reddit.unmoderated({"r":"dragonvore","limit":5},function(err,response){
							if(err) console.log(err);
							else{
								response.children.forEach(function(p){
									var post = p.data;
									if(post.title.match(titleMatch) != null){
										titleCheck(post.title,function(is_valid,nsfw,error,res){
											
											var thing = post.name;
											console.log(String(is_valid) + " ==> " + post.title);
											
											if(is_valid){
												
												// approve post //
												if(nsfw){
													reddit.nsfw(thing,function(err){
														if(err) console.log(err);
														else{
															reddit.approve(thing,function(err){
																if(err){
																	console.log(err);
																}
															});
														}
													});
												}
												else{
													reddit.approve(thing,function(err){
														if(err) console.log(err);
													});
												}
												
												// archive posts if it is a link type.
												if(post.name.startsWith("t3")){
													fs.readFile("./postHistory.txt",function(err,file){
														if(err) console.log(err);
														else{
															data = JSON.parse(file);
															data.push({
																"fulldata":post,
																"permalink":"http://www.reddit.com"+post.permalink,
																"link":post.url,
																"thumbnail":post.thumbnail,
																"artists":res.artist,
																"characters":res.characters,
																"types":res.types,
																"content":res.content,
																"nsfw":nsfw
															});
															fs.writeFile("./postHistory",JSON.stringify(data),function(err){
																if(err) console.log(err);
															});
														}
													});
												}
											}
											else{
												
												// Remove post if it does not follow the guidelines.
												reddit.remove(thing,function(err){
													
													// Send the user a message about why their post was removed.
													if(!err)console.log(err);
													else{
														reddit.message({
															"to":post.author,
															"subject":"Your post was automatically removed",
															"text":"Your post has been removed for the following reason: \n\n" + error + "\n\nif you think this is an error, contact Zapp in our discord."
														},function(err){
															if(err)console.log(err);
														});
													}
												});
											}
										});
									}
									else{
										console.log("false ==> " + post.title);
										// remove post is the title format is wrong.
										reddit.remove(post.name,function(err){
											if(err) console.log(err);
											else{
												reddit.message({
													"to":post.author,
													"subject":"Your post was automatically removed",
													"text":"Your post has been removed for the following reason: \n\nTitle format did not match expected pattern."
												},function(err){
													if(err) console.log(err);
												});
											}
										});
									}
								});
							}
						});
					},30000);
				}
			});
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
	const prefix = "!!";



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
	"whereami":submenu.place,
	"about":function(m,c){c("Made by: @Zapp#4885 \nSource: https://github.com/gmaster350/Patchie_bot \nVersion: "+version+"b")}
}

fs.readFile("../submenuData.txt",function(err,data){
	if(err) console.log(err);
	else{
		submenu.importActive(JSON.parse(data),function(){
			console.log("Loaded Submenu data");
			submenu.setTree(commandTree);
		});
	}
});


/*
	General functions:
	
	Any functions not part of any module. These include event handling and command rooting
*/

var errorCodes = ["Error:","Warning:","Note:","Be advised:","Info:"];
var errorTimeout = 30000;

bot.on("ready",function(){
	bot.user.setPresence("online").then(function(user){
		user.setGame("prefix: " + prefix).then(function(usr){
			console.log("Dragon vore bot is ready!");
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
	

	else if(message.content.startsWith(prefix)){
		submenu.evaluate(prefix,message,function(response){
			message.channel.send(response);
		});
	}
*/
});

// Login secret exists in a folder one level about the git folder.

fs.readFile("../botSecret.txt",function(err,secret){
	bot.login(secret.toString());
});