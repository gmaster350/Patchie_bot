/*
	Patchie - collective name for all the bots this script controls.
	
	This bot is made to be versatile with many available tools and utilities.
	Primarily, this bot is made to connect many services together, using
	a range of APIs, including reddit and discord.
*/

const version = "1.2.0";


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
	const reddit = new rawjs("User Agent: dragon_vore_bot/"+version+" by u/K-guy");

	var getModQueue;
	var getMail;
	
	// Master Regular Expression
	var titleMatch = new RegExp(/( *\[.+\].+( *[\(\[\{] *.+ *[\)\]\}])+ *)|(.+( *[\(\[\{] *.+ *[\)\]\}])+ *)|( *\[.+\].+)/g);
	
	var exceptions = ["roleplay","rp","discussion","meta","question","request","survey"];
	var vorePrepends = ["implied","imminent"];
	var voreTypes = ["soft vore","hard vore","oral vore","anal vore","unbirth","vaginal vore","dick vore","cock vore","urethra vore","tail vore","absorption","alternative vore","mawshot","non vore","non-vore","tongueplay","tongue play","tongue-play"];
	
	var voreChannel = "360355480490475522";
	var nsfwChannel = "360355651119087618";
	
	// Splits string using a pair of tokens. returns list of things between token pairs.
	// nested token pairs will return outermost pair.
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
	
	// Split by more than one token.
	function multiSplit(string,tokens,callback){
		if(tokens.length > 0){
			var str = string.split(tokens[0]);
			var r = [];
			str.forEach(function(s){
				multiSplit(s,tokens.slice(1),function(res){
					r = r.concat(res);
				});
			});
			callback(r);
		}
		else callback(string);
	}
	
	function titleCheck(title,callback){
		var is_nsfw = false;
		var artists = [];
		var characters = [];
		var genders = {
			"originals":[],
			"M":0,
			"m":0,
			"F":0,
			"f":0,
			"H":0,
			"h":0,
			"C":0,
			"c":0,
			"o":0,
			"O":0,
			"?":0
		};
		var types = [];
		var content = [];
		
		if(exceptions.some(function(ex){
			return title.startsWith(ex);
		})){
		}

		var check = true;
		
		var checkExceptions = title.replace(" ","").startsWith("[");
		var exceptionsValid = false;
		
		// Check to see if the post is marked as NSFW
		if(title.toLowerCase().replace(" ","").startsWith("[nsfw]")){
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
				"genders":genders,
				"types":types,
				"content":content
			});
		}
		
		if(checkExceptions && !exceptionsValid){
			callback(false,is_nsfw,"Bad tag at start of title.",{});
		}
		
		else if(check){
			var allTagsPresent = true;
			var ErrorMessage = "";
			
			// Collect Artist tags
			doubleSplit(title,"(",")",function(res){
				if(typeof res == "string") console.log(res);
				else{
					res.forEach(function(a){
						artists.push(a)
					});
					if(res.length === 0){
						allTagsPresent = false;
						ErrorMessage += "\nNo artist tags found";
					}
					
					// Collect character tags.
					doubleSplit(title,"{","}",function(res){
						if(typeof res == "string") console.log(res);
						else{
							res.forEach(function(a){
								characters.push(a);
							});
							if(res.length === 0){
								allTagsPresent = false;
								ErrorMessage += "\nNo character tags found";
							}
							
							// Collect type and content tags.
							doubleSplit(title,"[","]",function(res){
								if(typeof res == "string") {
									console.log(res);
								}
								else{
									// This section ensures tags are in the proper order. Order must be: gender, vore, content.
									if(checkExceptions)res.shift();
									res.forEach(function(a){
										if(a.match(/^[mMfFhHcCoO\?]([\/\\][mMfFhHcCoO\?])*$/g)){
											genders.originals.push(a);
											multiSplit(a,["/","\\"],function(gend){
												gend.forEach(function(g){
													genders.g++;
												});
											});
										}
										
										else if(voreTypes.some(function(vt){
											if(a.toLowerCase() == vt){
												return true;
											}
											else{
												return vorePrepends.some(function(vp){
													return a.toLowerCase() == vp + " " + vt;
												});
											}
										})){
											types.push(a);
										}
										
										// If the tag is not a vore tag or a gender tag, it must be a content tag.
										else{
											content.push(a);
										}
									});
									
									
									if(genders.originals.length === 0){
										allTagsPresent = false;
										ErrorMessage += "\nNo gender tags found.";
									}
									if(types.length === 0){
										allTagsPresent = false;
										ErrorMessage += "\nNo vore tags found.";
									}
									
									if(allTagsPresent){
										callback(true,is_nsfw,"",{
											"artists":artists,
											"characters":characters,
											"types":types,
											"content":content
										});
									}
									else{
										callback(false,is_nsfw,ErrorMessage,{});
									}
								}
							});
						}
					});
				}
			});
		}
	}

	fs.readFile("../testingCheck.txt",function(err,isTesting){
		if(!(Boolean(JSON.parse(isTesting)))){
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

								try{
									reddit.unmoderated({"r":"dragonvore","limit":5},function(err,response){
										if(err) console.log(err);
										else{
											response.children.forEach(function(p){
												var post = p.data;
												
												// Regex Filter
												if(post.title.match(titleMatch) != null){

													
													// Collect and gather content.
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
																
																if(nsfw){
																	bot.channels.get(nsfwChannel).send("http://www.reddit.com"+post.permalink+"\n\n"+post.url);
																}
																else{
																	bot.channels.get(voreChannel).send("http://www.reddit.com"+post.permalink+"\n\n"+post.url);
																}														
															}
														}
														else{
															
															// Remove post if it does not follow the guidelines.
															reddit.remove(thing,function(err){
																
																// Send the user a message about why their post was removed.
																if(err)console.log(err);
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
													// remove post if the title format is wrong.
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
								}
								catch(err){
									alertOwner("please help, I'm having some problems.",err);
								}
							},30000);

							/*
							var getMail = setInterval(function(){
								try{
									reddit.unread({"limit":5,"mark":"true"},function(err,response){
										if(err)console.log(err);
										response.children.forEach(function(mail){
											var subject = mail.data.subject;
											var body = mail.data.body;
											var sender = mail.data.author;
											
											if(subject.toLowerCase() == "title check"){
												titlecheck(body,function(errorRes){
													reddit.message({
														"to":sender,
														"subject":"Title Evaluation",
														"text":errorRes
													},function(err){
														if(err)console.log("messaged",err);
													});
												},true);
											}
										});

									});
								}
								catch(err){
									alertOwner("please help, I am having problems.",err);
								}

							},10000);
							*/
						}
					});
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

	const Discord = require("discord.js");
	const bot = new Discord.Client();
	const spam = require("./spam.js");
	const potion = require("./potion.js");
	const privateRoom = require("./privateRoom.js");
	const manageRoles = require("./manageRoles.js");
	
	const prefix = "!!";
	const about = 
	"Made by: @Zapp#4885"+
	"\nRepository: https://github.com/gmaster350/Patchie_bot"+
	"\nVersion: "+version+
	"\n\n**Icon info**"+
	"\nSource: "+"http://www.furaffinity.net/view/14462677/"+
	"\nArtist: "+"http://www.furaffinity.net/user/sprout/"+
	"\nCharacter: "+"Samael"+
	"\nOwner: "+"http://www.furaffinity.net/user/macabredragon";

	var owner;
	fs.readFile("../discordBotOwnerId.txt",function(err,data){
		if(err)console.log(err);
		else{owner = data.toString();}
	});

	function getRoleFromGuildByName(guild,name){
		var res = undefined;
		guild.roles.map(function(role,snowflake){
			if(role.name.toLowerCase() == name.toLowerCase())
				res = role;
		});
		return res;
	}


/*
	Module handling
	
	In order to facilitate the submenu module, methods are handled through
	handler functions. Handler functions are passed the raw object, and a callback.
	The handler function then parses the message into a form accepted by a module's method. 
	
	The callback must return a string. If string is non-empty, it will be sent to the
	originating channel as a reply, otherwise it will do nothing.
*/

// Reddit integration

function titlecheck(m,callback,fromReddit){
	var title = fromReddit ? m : m.content.substr(prefix.length+"titlecheck".length+1);
	if(title.match(titleMatch) != null){
		titleCheck(title,function(is_valid,nsfw,error,res){
			if(is_valid){
				callback("Your title contains no errors :white_check_mark:");
			}
			else{
				callback(error + " :x:");
			}
		});
	}
	else{
		callback("Title format did not match expected pattern.");
	}
}


function alertOwner(msg,error){
	bot.fetchUser(owner).then(function(zapp){
		bot.channels.get("360352337274863617").send(zapp + " " + msg);
		owner.send(error);
	});
}


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

// Misc commands

function giveRole(message,callback){
	var parameters = message.content.substr(prefix.length).split(" ");
	var roleToGive = parameters[1];
	if(["pred","prey","switch"].some(function(r){
		return roleToGive.toLowerCase() == r;
	})){
		if(getGuildRoleByName(roleToGive) != undefined){
			var removedRole;
			message.member.roles.map(function(role){
				["pred","prey","switch"].forEach(function(r){
					if(role.name.toLowerCase() == r){
						removedRole = role.name;
						message.member.removeRole(role);
					}
				});
			});
			message.member.addRole(getGuildRoleByName(roleToGive));
			callback("Info: " + removeRole ? "Removed role "+removeRole+", added role "+roleToGive+"." : "Added role "+roleToGive+".");
		}
		else{
			callback("Info: Could not find matching role");
		}
	}
}

function removeRole(message,callback){
	var parameters = message.content.substr(prefix.length).split(" ");
	var roleToRemove = parameters[1];
	if(getGuildRoleByName(roleToTake) != undefined){
		var removedRole;
			message.member.roles.map(function(role){
				["pred","prey","switch"].forEach(function(r){
					if(role.name.toLowerCase() == r){
						removedRole = role.name;
						message.member.removeRole(role);
					}
				});
				callback("Info: Removed role "+removeRole+".");
			});
	}
	else{
		callback("Info: Could not find matching role");
	}
}

function wipe(message,callback){
	var parameters = message.content.split(" ");
	var mentions = message.mentions.members;
	if(message.member.permissions.has("MANAGE_GUILD")){
		message.guild.channels.map(function(channel,channelId){
			channel.messages.map(function(msg,msgId){
				if(mentions.some(function(m){
					return m == msg.author;
				})){
					msg.delete();
				}
			});
		});
	}
}

// Submenu Module

var commandTree = {
	"test":{
		"echo":echo,
		"reverse":reverse,
		"back":submenu.up, //returns to upper command tree
		"help":submenu.list, //print commands present at current location
		"forceError":function(m,c){if(m.author.id == owner){c(UndefinedVariable);}}, // Will divide by zero.
		"whereami":submenu.place
	},
	"back":submenu.up,
	"help":submenu.list,
	"whereami":submenu.place,
	"about":function(m,c){c(about)},
	"reddit":{
		"back":submenu.up,
		"help":submenu.list,
		"checkTitle":titlecheck
	},
	"checkTitle":titlecheck,
//	"addRole":giveRole,
//	"removeRole":removeRole,
	"potion":potion.generate,
	"potionIgnore":potion.changeSetting,
	"createRoom":privateRoom.create,
	"leaveRoom":privateRoom.leave,
	"inviteToRoom":privateRoom.inviteToRoom,
//	"potionCustom":potion.addCustom,
	"setRole":manageRoles.setRole,
	"removeRole":manageRoles.removeRole
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
		user.setGame(prefix+"help").then(function(usr){
			console.log("Dragon vore bot is ready!");
		},
		function(err){
			console.log(err);
		});
	},function(err){
		console.log(err);
	});
	
	bot.channels.map(function(channel,channelIndex,channelArray){
		if(channel.type == "text"){
			var role = getRoleFromGuildByName(channel.guild,"Member");
			channel.members.map(function(member,memberIndex,memberArray){
				submenu.addUser(member.id);
				member.addRole(role);
			});
		}
	});
	
	fs.readFile("./potionSettings.txt",function(err,data){
		if(err)console.log(err);
		else{
			var s = JSON.parse(data);
			bot.guilds.map(function(g){
				g.members.map(function(m,id){
					if(Object.keys(s).every(function(mid){
						return mid != id;
					})){ //if member does not exist in settings.
						s[m.id] = false;
					}
				});
			});
			fs.writeFile("./potionSettings.txt",JSON.stringify(s));
			potion.importSettings(s);
		}
	});
});

bot.on("message",function(message){
	try{
		if((message.author.id != bot.user.id) && !(message.author.bot)){
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
					if(typeof response == "string" && response.length > 0){
						if(errorCodes.some(function(code){return response.startsWith(code)})){
							send += response + "\n`This is a temporary message.` `("+String(errorTimeout/1000)+" seconds)`";
							message.channel.send(send).then(function(msg){
								msg.delete(errorTimeout);
								if(message.channel.type == "text")
									message.delete(errorTimeout);
							});
						}
						else{
							send += response;
							message.channel.send(send);
						}
					}
				});
			}
			else{
				spam.process(message,function(response){
					if(typeof response == "string" && response.length > 0){
						if(errorCodes.some(function(code){return response.startsWith(code)})){
							send += response + "\n`This is a temporary message.` `("+String(errorTimeout/1000)+" seconds)`";
							message.channel.send(send).then(function(msg){
								msg.delete(errorTimeout);
								if(message.channel.type == "text")
									message.delete(errorTimeout);
							}).catch(function(err){
								console.log(err);
							});
						}
						else{
							send += response;
							message.channel.send(send);
						}
					}
				});
			}
			/*
			filter.evaluate(message,function(res){
				send += res;
				message.channel.send(send);
			});
			*/
		}
	}
	catch(err){
		message.channel.send("Something went wrong. Try again?");
		bot.fetchUser("125576692646281216").then(function(user){
			user.send("`"+message.content+"`\n\nError:\n"+err+"\n\nStack Trace:\n"+err.stack);
		}).catch(function(err){
			console.log(err);
		});
	}
});

bot.on("guildMemberAdd",function(member){
	member.addRole(getRoleFromGuildByName(member.guild,"Member"));
	submenu.addUser(member.id);
});

/*
bot.on("messageUpdate",function(message){
	filter.evaluate(message,function(res){
		if(res){
			var send = res + "\n`This is a temporary message.` `("+String(errorTimeout/1000)+" seconds)`";
			message.channel.send(send).then(function(msg){
				msg.delete(errorTimeout);
				if(message.channel.type == "text")
					message.delete(errorTimeout);
			});
		}
	});
})
*/
// Login secret exists in a folder one level about the git folder.

fs.readFile("../botSecret.txt",function(err,secret){
	bot.login(secret.toString());
});