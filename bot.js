/*
	Patchie - collective name for all the bots this script controls.

	This bot is made to be versatile with many available tools and utilities.
	Primarily, this bot is made to connect many services together, using
	a range of APIs, including reddit and discord.
*/

const version = "1.4.0";


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

	var enforcePattern = false; //if true, posts are unapproved by bot, otherwise bot posts a comment listing missing tags.
	var getModQueue;
	var getMail;

	// Master Regular Expression
	var titleMatch = new RegExp(/( *\[.+\].+( *[\(\[\{] *.+ *[\)\]\}])+ *)|(.+( *[\(\[\{] *.+ *[\)\]\}])+ *)|( *\[.+\].+)/g);

	var exceptions = ["roleplay","rp","discussion","meta","question","request","survey","written","writing","story"];
	var vorePrepends = ["implied","imminent"];
	var voreTypes = ["soft vore","hard vore","oral vore","anal vore","unbirth","vaginal vore","dick vore","cock vore","urethra vore","tail vore","absorption","alternative vore","mawshot","non vore","non-vore","tongueplay","tongue play","tongue-play"];

	var voreChannel = "360355480490475522";
	var nsfwChannel = "360355651119087618";
	var storyChannel = "385716016497557506";


	// artists or characters that have been requested to be automatically removed.
	// posts with these tags will be rejected by the bot.
	var tagBlacklist;
	fs.readFile("../tagBlacklist.json",function(err,data){
		if(data == undefined){
			fs.writeFile("../tagBlacklist.json","",function(err){
				if(err) console.log(err);
			});
		}
		if(data.length == 0){
			fs.writeFile("../tagBlacklist.json",'{"artist":[],"character":[]}',function(err){
				if(err) console.log(err);
			});
		}
		else{
			tagBlacklist = JSON.parse(data);
		}
	});

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

	function titleCheck(title,callback,post){
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
			if(title.toLowerCase().replace(" ","").startsWith("[" + ex + "]") ||
			title.toLowerCase().replace(" ","").startsWith("(" + ex + ")")){
				if(["writing","written","story"].some(e => ex == e)){
					bot.channels.get(storyChannel).send("New story posted: " +
						"\n\nLink: " + post.link +
						"\nThread: " + "http://www.reddit.com" + post.permalink
					);
				}
				return true;
			}
			else return false;
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
						ErrorMessage += "\n\nNo artist tags found.";
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
								ErrorMessage += "\n\nNo character tags found.";
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
										ErrorMessage += "\n\nNo gender tags found.";
									}
									if(types.length === 0){
										allTagsPresent = false;
										ErrorMessage += "\n\nNo vore tags found.";
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
															var badArtist;
															var badCharacter;
															if(res.characters.some(c1 => {
																return tagBlacklist.character.some(c2 => {
																	if(c1 == c2){
																		badCharacter = c1;
																		return true;
																	}
																	else{
																		return false;
																	}
																});
															})){ // has blacklisted characters //
																reddit.remove(thing,function(err){
																	// Send the user a message about why their post was removed.
																	if(err) console.log(err);
																	else{
																		reddit.message({
																			"to":post.author,
																			"subject":"Your post was automatically removed",
																			"text":"Your post has been removed because the character " + badCharacter + " is blacklisted."
																		},function(err){
																			if(err)console.log(err);
																		});
																	}
																});
															}
															else if(tagBlacklist.artist.some(a => {
																if(a == res.artist){
																	a = badArtist;
																	return true;
																}
																else{
																	return false;
																}
															})){ // has blacklisted artists //
																reddit.remove(thing,function(err){
																	// Send the user a message about why their post was removed.
																	if(err) console.log(err);
																	else{
																		reddit.message({
																			"to":post.author,
																			"subject":"Your post was automatically removed",
																			"text":"Your post has been removed because the artist " + badArtist + " is blacklisted."
																		},function(err){
																			if(err)console.log(err);
																		});
																	}
																});
															}
															else{
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

																	var crossPost = "Artist(s): " + res.artists.join(", ") +
																	"\nCharacter(s): " + res.characters.join(", ") +
																	"\nVore types: " + res.types.join(", ") +
																	"\nOther tags: " + res.content.join(", ") +
																	"\n\nThread: " + "http://www.reddit.com" + post.permalink +
																	"\nLink: " + post.url;

																	if(nsfw){
																		bot.channels.get(nsfwChannel).send(crossPost);
																	}
																	else{
																		bot.channels.get(voreChannel).send(crossPost);
																	}
																}
															}
														}
														else{
															if(enforcePattern){
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
															else{
																reddit.approve(post.name,function(err){
																	if(err) console.log(err);
																	reddit.comment(thing, "Not all types of tags were found in your post titles.\n"+error+"\nIt would be helpful to include these tags in future.",function(err,thisComment){
																		if(err){
																			console.log(err);
																		}
																	});
																});

																var lastIndex = post.title.length-1;
																["(","[","{"].forEach(d => {
																	let i = post.title.indexOf(d);
																	if(i < lastIndex) lastIndex = i;
																});
																var t = post.title.substring(0,lastIndex);

																if(nsfw){
																	bot.channels.get(nsfwChannel).send("http://www.reddit.com"+post.permalink+"\n\n"+post.url+"\n\n**"+t+"**");
																}
																else{
																	bot.channels.get(voreChannel).send("http://www.reddit.com"+post.permalink+"\n\n"+post.url+"\n\n**"+t+"**");
																}
															}
														}
													},post);
												}
												else{
													if(enforcePattern){
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
													else{
														reddit.approve(post.name,function(err){
															if(err) console.log(err);
															reddit.comment(post.name, "Your post's title did not meet the specified pattern, please try to follow the pattern in future.",function(err,thisComment){
																if(err){
																	console.log(err);
																}
															});
														});
														if(post.title.toLowerCase().startsWith("[nsfw]")){
															bot.channels.get(nsfwChannel).send("http://www.reddit.com"+post.permalink+"\n\n"+post.url);
														}
														else{
															bot.channels.get(voreChannel).send("http://www.reddit.com"+post.permalink+"\n\n"+post.url);
														}
													}
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
	const interactives = require("./interactiveStories.js");
	const frequency = require("./frequency.js");
	//const multiCharacter = require("./multiCharacter.js");

	var skins = {};
	var currentSkin = "";
	const bannedIds = ["475013414566232094"];
	const prefix = "!!";
	var info;
	var about =
	"Made by: @Zapp#4885"+
	"\nRepository: <https://github.com/gmaster350/Patchie_bot>"+
	"\nVersion: "+version+
	"\n\n**Icon info**"+
	"\nSource: "+"<http://www.furaffinity.net/view/14462677/>"+
	"\nArtist: "+"<http://www.furaffinity.net/user/sprout/>"+
	"\nCharacter: "+"Samael"+
	"\nOwner: "+"<http://www.furaffinity.net/user/macabredragon>";

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

	var botResponses;
	fs.readFile("botResponses.json",function(err,data){
		if(err)console.log(err);
		else{
			var culprit;
			botResponses = JSON.parse(data);
			if(!(botResponses.every(function(obj){
				culprit = obj;
				return "words" in obj && "responses" in obj;
			}))){
				throw "botResponses.json format is bad! culprit: "+obj.toString();
			}
			console.log("Loaded bot responses.");
		}
	});


/*
	Module handling

	In order to facilitate the submenu module, methods are handled through
	handler functions. Handler functions are passed the raw object, and a callback.
	The handler function then parses the message into a form accepted by a module's method.

	The callback must return a string. If string is non-empty, it will be sent to the
	originating channel as a reply, otherwise it will do nothing.
*/

// Reddit integration

function blacklist(message,callback){
	var parameters = message.content.split(" ");
	if(message.member.hasPermission("MANAGE_CHANNELS")){
		if(parameters.length < 3 || ["artist","character"].every(t => parameters[1] != t)){
			callback("add an artist or character tag to the blacklist\n\nUsage: !!blacklist (artist | character) (name)");
		}
		else{
			tagBlacklist[parameters[1]].push(parameters[2]);

		}
	}
	else{
		callback("Error: That is a restricted command.");
	}
}

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

function hasEach(str,listOfThingsToMatch,callback){
	var exact = false;
	var contiguous = false;
	var ordered = false;
	var disordered = false;
	var strIndex = 0;

	exact = str == listOfThingsToMatch.join(" ");
	contiguous = str.includes(listOfThingsToMatch.join(" "));
	ordered = listOfThingsToMatch.every(function(item){
		if(str.substring(strIndex).includes(item)){
			strIndex = str.substring(strIndex).indexOf(item);
			return true;
		}
		else{
			return false;
		}
	});
	disordered = listOfThingsToMatch.every(function(e1){
		return str.includes(e1);
	});
	callback(exact,contiguous,ordered,disordered);
}
//remove non-alphanumeric characters
String.prototype.clean = function(){
	var ret = "";
	var cleanChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0"," ","'"];
	for(var i = 0; i < this.length; i++){
		if(cleanChars.some(function(c){
			return this.charAt(i) == c;
		},this)){
			ret += this.charAt(i);
		}
	}
	return ret;
}

// Test Module

function echo(message,callback){
	var cut = message.content.substr(prefix.length + 5);
	callback(cut);
}

function reverse(message,callback){
	var result = "";
	for(var i = message.content.length-1; i > "reverse".length+2; i--){
		result += message.content.charAt(i);
	}
	callback(result);
}

// Misc commands

function botRoleplay(words,callback){
	if(!(botResponses.slice(1).some(function(obj){
		var b;
		hasEach(words,obj.words,function(exact,contiguous,ordered,disordered){
			switch(obj.type){
				case "exact":
					if(exact){
						callback(obj.responses[Math.floor(Math.random()*obj.responses.length)]);
						a = true;
					}
					else{
						a = false;
					}
					break;
				case "contiguous":
					if(contiguous){
						callback(obj.responses[Math.floor(Math.random()*obj.responses.length)]);
						a = true;
					}
					else{
						a = false;
					}
					break;
				case "ordered":
					if(ordered){
						callback(obj.responses[Math.floor(Math.random()*obj.responses.length)]);
						a = true;
					}
					else{
						a = false;
					}
					break;
				case "disordered":
					if(disordered){
						callback(obj.responses[Math.floor(Math.random()*obj.responses.length)]);
						a = true;
					}
					else{
						a = false;
					}
					break;
				default:
					a = false;
			}
			b = a;
		});
		return b;
	}))){
		callback(botResponses[0].responses[Math.floor(Math.random()*botResponses[0].responses.length)]);
	}
}

function botAddressed(message){
	return message.cleanContent.startsWith("@") && message.mentions.users.size > 0 && message.mentions.users.some(function(m){
		return m.id == bot.user.id;
	});
}

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

function inspectUser(message, callback){
	if(!(message.member.hasPermission("MANAGE_CHANNELS"))){
		callback("Unsufficient permissions");
		return;
	}
	var member = message.mentions.members.first();
	if(member === undefined){
		callback("Please specify a member.");
		return;
	}
	bot.fetchUser(member.id).then(function(user){
		var str = "Member data:\n";
		var member = message.mentions.members.first();
		Object.keys(member).forEach(function(key){
			var val = member[key];
			console.log(val);
			if(val === undefined || val === null){}
			else if(val.constructor.name == "Date"){
				str += `\n${key} = ${member[key].toString()}`;
			}
			else if(val.constructor !== Object){
				str += `\n${key} = ${member[key]}`;
			}
			else if(val.constructor.name == "Role"){
				str += `\n${key} = ${member[key].name}`;
			}
		});
		str += "\n\nUser data:\n";
		Object.keys(user).forEach(function(key){
			var val = user[key];
			console.log(val);
			if(val === undefined || val === null){}
			else if(val.constructor.name == "Date"){
				str += `\n${key} = ${user[key].toString()}`;
			}
			else if(val.constructor !== Object){
				str += `\n${key} = ${user[key]}`;
			}
		});
		callback(str);
	}).catch(function(err){
		console.log(err);
	});
}

function skin(message,callback){
	if(message.member.permissions.has("MANAGE_GUILD")){
		var parameters = message.content.split(" ");
		if(parameters[1] == "add"){
			var required = ["icon","source","artist","character","owner"];
			info = {};
			var name = parameters[2];
			parameters.slice(3).forEach(p => {
				var key = p.split(":")[0].trim().toLowerCase();
				var value = p.split(":")[1].trim().toLowerCase();
				required.some((r,i)=> {
					if(key === r){
						info[key] = value;
						required.splice(i,1);
						return true;
					}
					else return false;
				});
			});
			if(required.length === 0){
				bot.user.setAvatar(info.icon);

				skins[parameters[2]] = info;
				fs.writeFile("./skins.json",JSON.stringify(skins),function(err){
					if(err) console.log(err);
				});

				about =
				"Made by: @Zapp#4885"+
				"\nRepository: <https://github.com/gmaster350/Patchie_bot>"+
				"\nVersion: "+version+
				"\n\n**Icon info**"+
				"\nSource: "+"<"+info.source+">"+
				"\nArtist: "+"<"+info.artist+">"+
				"\nCharacter: "+info.character+
				"\nOwner: "+"<"+info.owner+">";
			}
		}
		else{
			if(Object.keys(skins).some(s => s == parameters[1])){
				currentSkin = parameters[1];
			}
			info = skins[currentSkin];
			about =
			"Made by: @Zapp#4885"+
			"\nRepository: <https://github.com/gmaster350/Patchie_bot>"+
			"\nVersion: "+version+
			"\n\n**Icon info**"+
			"\nSource: "+"<"+info.source+">"+
			"\nArtist: "+"<"+info.artist+">"+
			"\nCharacter: "+info.character+
			"\nOwner: "+"<"+info.owner+">";
		}
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

function setRole(message,callback){
	manageRoles.setRole(message,function(resp){
		callback(resp);
	},function(error){
		if(error){
			bot.fetchUser("125576692646281216").then(function(user){
				user.send(error);
			}).catch(function(err){
				console.log(err);
			});
		}
	});
}

function retroactiveRead(message,callback){
	if(message.author.id == "360352337274863617"){
		var times = {};
		bot.channels.map(channel => {
			if(channel.type == "text"){
				if(!(channel.guild.id in times)){
					times[channel.guild.id] = {};
				}
				if(!(channel.id in times[channel.guild.id])){
					times[channel.guild.id][channel.id] = [];
				}
				channel.fetchMessages({before:channel.lastMessageID}).then(messages => {
					messages.map(message => {
						times[channel.guild.id][channel.id].push(message.createdAt);
					});
				});
			}
		});
		fs.writeFile("frequencyData.json",times.sort(),err => {
			if(!err){
				callback("done!");
			}
		});
	}
}

function sum(arr){
	var t = 0;
	for(i=0;i<arr.length;i++)t+=arr[i];
	return t;
}

function weightedRandom(array,weights,callback){
	var total = 0;
	if(weights.some(function(w){
		if(w.constructor == Number){
			total += w;
			return false;
		}
		else{
			return true;
		}
	})){
		throw "ALL weights must be numbers; integers or floats.";
	};

	if(array.length != weights.length){
		throw "lengths of arrays must be equal.";
	}

	var ret;
	var point = Math.random()*total;
	for(var i = 0, min = 0, max = array[0]; i < array.length; i++){
		max = sum(weights.slice(0,i+1));
		if(point > min && point < max){
			ret = array[i];
		}
		min = sum(weights.slice(0,i+1));
	}
	callback(ret);
}

function pokeball(m,c){
	var pokemons = [
		{name:"Kommo-o",chance:10},
		{name:"Smeargle",chance:10},
		{name:"Shinx",chance:10},
		{name:"Waillord",chance:10},
		{name:"Meganium",chance:10},
		{name:"Swampert",chance:10},
		{name:"Fennekin",chance:10},
		{name:"Starly",chance:10},
		{name:"Noivern",chance:10},
		{name:"Eevee",chance:10},
		{name:"Pidgey",chance:10},
		{name:"Umbreon",chance:10},
		{name:"Vaporeon",chance:10},
		{name:"Pikachu",chance:10},
		{name:"Lucario",chance:5},
		{name:"Arcanine",chance:5},
		{name:"Cyndaquil",chance:5},
		{name:"Ninetales",chance:5},
		{name:"Furret",chance:5},
		{name:"Ditto",chance:5},
		{name:"Absol",chance:5},
		{name:"Goodra",chance:5},
		{name:"Furret",chance:5},
		{name:"Lugia",chance:1},
		{name:"Mew",chance:1},
	];

	var names = [];
	var chances = [];

	pokemons.forEach(p => {
		names.push(p.name);
		chances.push(p.chance);
	});

	var shiny = Math.floor(Math.random() * 50) === 1 ? "**Shiny** " : "";

	weightedRandom(names,chances,function(pokemon){
		c(`You swallow a pokeball. It releases a ${shiny}${pokemon} in your belly.`);
	});
}

function initializeMultiCharacter(message,callback){
	manageRoles.initialize(message,bot,function(res){
		callback(res);
	});
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
	"editOption":interactives.editOption,
	"potion":potion.generate,
	"potionIgnore":potion.changeSetting,
	"privateRoom":privateRoom.create,
	"createRoom":privateRoom.create,
	"leaveRoom":privateRoom.leave,
	"inviteToRoom":privateRoom.inviteToRoom,
	"blacklist":blacklist,
	"skin":skin,
	"inspectUser": inspectUser,
	"pokeball":pokeball,


	//roles
	"setRole":setRole,
	"removeRole":manageRoles.removeRole,
	"hasRole":manageRoles.hasRole,
	"lfrp":manageRoles.lfrp,

	//interactives
	"addOption":interactives.addOption,
	"branchText":interactives.changeDescription,
	"startStory":interactives.start,

	//characters
//	"describeCharacter":manageRoles.describeCharacter,
//	"renameCharacter":manageRoles.renameCharacter,
//	"characters":manageRoles.listCharacters,
//	"allCharacters":manageRoles.listAllCharacters,
//	"initializeMultiCharacter":initializeMultiCharacter
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

fs.readFile("./skins.json",function(err,data){
	if(err){
		fs.writeFile("./skins.json","{}",function(err){
			if(err) console.log(err);
			else{
				skins = JSON.parse(data);
				Object.keys(skins).some(k => {
					var attributes = skins[k];
					if(attributes["active"]){
						currentSkin = k;
						return true;
					}
					else return false;
				});
				info = skins[currentSkin];

				about =
				"Made by: @Zapp#4885"+
				"\nRepository: <https://github.com/gmaster350/Patchie_bot>"+
				"\nVersion: "+version+
				"\n\n**Icon info**"+
				"\nSource: "+"<"+info.source+">"+
				"\nArtist: "+"<"+info.artist+">"+
				"\nCharacter: "+info.character+
				"\nOwner: "+"<"+info.owner+">";
			}
		});
	}
	else{
		skins = JSON.parse(data);
		Object.keys(skins).some(k => {
			var attributes = skins[k];
			if(attributes["active"]){
				currentSkin = k;
				return true;
			}
			else return false;
		});

		info = skins[currentSkin];
		about =
		"Made by: @Zapp#4885"+
		"\nRepository: <https://github.com/gmaster350/Patchie_bot>"+
		"\nVersion: "+version+
		"\n\n**Icon info**"+
		"\nSource: "+"<"+info.source+">"+
		"\nArtist: "+"<"+info.artist+">"+
		"\nCharacter: "+info.character+
		"\nOwner: "+"<"+info.owner+">";
	}
});


/*
	General functions:

	Any functions not part of any module. These include event handling and command rooting
*/

var errorCodes = ["Error:","Warning:","Note:","Be advised:","Info:"];
var errorTimeout = 30000;

bot.on("ready",function(){
	bot.user.setAvatar(info.icon);
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
	console.log("Set presence");

	// Give all users Member role
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
			var stringS = JSON.stringify(s);
			potion.importSettings(s);
		}
		console.log("Loaded potions data");
	});

	fs.readFile("../interactiveData.txt",function(err,data){
		if(err) console.log(err);
		else{
			var r = JSON.parse(data);
			bot.channels.map(function(c){
				switch(c.type){
					case "text":
						c.members.map(function(m){
							if(Object.keys(r).every(function(k){
								return m.id != k;
							})){
								r[m.id] = [];
							}
						});
						break;
					case "dm":
						if(Object.keys(r).every(function(k){
							return c.recipient.id != k;
						})){
							r[c.recipient.id] = [];
						}
						break;
					case "group":
						c.recipients.map(function(m){
							if(Object.keys(r).every(function(k){
								return m.id != k;
							})){
								r[m.id] = [];
							}
						});
						break;
				}
			});
			interactives.setActive(r);
		}
		console.log("Loaded interactive story position data");
	});
	/*
	manageRoles.loadCharacters(bot,function(){
		bot.guilds.map(guild => {
			guild.members.map(member => {
				if(!manageRoles.hasMember(member)){
					manageRoles.newUser(member);
					console.log("created profile for "+member.displayName);
				}
			})
		});
	});
	*/
});

bot.once("ready",function(){
	bot.guilds.map(function(guild){
		guild.members.map(function(member){
			if(bannedIds.some(bid => member.user.id == bid)){
				member.ban("Banned ID");
			}
		});
	});
});

bot.on("message",function(message){
	try{
		if((message.author.id != bot.user.id) && !(message.author.bot)){
			var send = "";

			if(message.content == (prefix + "ping")){
				message.channel.send("pong");
			}
			else if(message.content.startsWith("@supereveryone")){
				message.channel.send(message.author + " is lookin' quite the *fool* today.");
			}
			else if(message.content.startsWith(prefix+"relay") && message.channel.type == "dm"){
				if(message.author.id == owner){
					var chanid = message.content.split(" ").slice(1,2)[0];
					var msg = message.content.split(" ").slice(2).join(" ");
					var ch = bot.channels.get(chanid);

					if(ch !== undefined){
						ch.send(msg);
					}
					else{
						message.channel.send("Could not find channel.");
					}
				}
				else{
					message.channel.send("You're not my owner! What are you playing at?");
				}
			}
			else if(message.content.startsWith(prefix+"broadcast") && message.author.id == owner){
				var msg = message.content.split(" ").slice(1).join(" ");
				bot.channels.map(function(chan){
					if(chan.type == "text"){
						chan.send(msg);
					}
				});
			}
			else if(message.content == (prefix + "stop") && message.channel.type == "text"){
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
							message.channel.send(response);
						}
					}
				});
			}
			else if(botAddressed(message)){
				botRoleplay(message.content.clean().toLowerCase().split(" ").slice(1).join(" "),function(reply){
					message.channel.send(reply);
				});
			}
			else{
				if(message.channel.id != "360352337274863617" && message.channel.type == "text" && ((Date.now() - message.member.joinedTimestamp) > 352800000)){
					/*spam.process(message,function(response){
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
					*/
				}
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
	finally{
		frequency.record(message);
	}
});

bot.on("guildMemberAdd",function(member){
	if(bannedIds.some(bid => member.user.id == bid)){
		member.ban("Banned ID");
	}
	else{
		member.addRole(getRoleFromGuildByName(member.guild,"Member"));
		submenu.addUser(member.id);
		interactives.addUser(member.id);
		manageRoles.newUser(member);
	}
});

/*
bot.on("guildMemberUpdate",(oldMember, newMember) => {
	if(oldMember.displayName != newMember.displayName){
		manageRoles.switchCharacter(newMember, newMember.displayName, function(res){
			console.log(res);
		});
	}
});
*/

bot.on("guildMemberRemove",function(member){
	member.guild.channels.find("name","general").send("Sorry to see you go, "+member.displayName);
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


function CompleteStringify(obj){
	var str = "{";
	var l = Object.keys(obj).length-1;
	Object.keys(obj).forEach(function(key,index){
		var value = obj[key];
		str += "\"" + key + "\":";
		if(typeof value == "object"){
			if(value.constructor == Array){
				str += "[" + CompleteStringify(value) + "]";
			}
			else{
				str += "{" + CompleteStringify(value) + "}";
			}
		}
		else if(typeof value == "string"){
			value.replace("\"","\\\"");
			str += "\"" + value + "\"";
		}
		else{
			str += value;
		}
		if(index < l){
			str += ",";
		}
	});
	str += "}";
	return str;
}



// Login secret exists in a folder one level about the git folder.

fs.readFile("../botSecret.txt",function(err,secret){
	bot.login(secret.toString());
});
