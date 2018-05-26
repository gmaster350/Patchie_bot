///  Role managing module
const fs = require('fs');

var tags = [
	{
		"exclusive":true,
		"prefix":null,
		"roles":["Male","Female","Other"]
	},
	{
		"exclusive":true,
		"prefix":null,
		"roles":["Pred","Prey","Switch"]
	},
	{
		"exclusive":true,
		"prefix":"skin",
		"roles":["Furred","Scaled","Feathered"]
	},
	{
		"exclusive":true,
		"prefix":null,
		"roles":["Anthro","Feral","Taur"]
	},
	{
		"exclusive":true,
		"prefix":"size",
		"roles":["Fine","Diminutive","Tiny","Small","Medium","Large","Huge","Gargantuan","Colossal"]
	},
	{
		"exclusive":true,
		"prefix":null,
		"roles":["Willing","Unwilling"]
	},
	{
		"exclusive":true,
		"prefix":null,
		"roles":["Fatal","Endo"]
	},
	{
		"exclusive":false,
		"prefix":"vore",
		"roles":["Oral","Anal","Unbirth","Soul","Tail","Cock"]
	},
	{
		"exclusive":true,
		"prefix":"misc",
		"roles":["Disposal","Fulltour","Reformation"]
	},
	{
		"exclusive":true,
		"prefix":null,
		"roles":["Lfrp-prey","Lfrp-pred","Lfrp-any"]
	}
];

fs.readFile('./specieslist.json',function(err,file){
	var s = JSON.parse(file);
	tags.push({
		"exclusive":true,
		"prefix":"species",
		"roles":s
	});
});


function getRoleFromGuildByName(guild,name){
	var res = undefined;
	guild.roles.map(function(role,snowflake){
		if(role.name.toLowerCase() == name.toLowerCase())
			res = role;
	});
	return res;
}



function setRole(message,callback,errorCallback,alias=false,aliasRole=""){
	var parameters = message.content.split(" ");
	if(message.channel.type != "text"){
		callback("You can only use that command in guilds.");
	}
	else if(parameters.length == 1){
		var str = "Set a role for yourself.\n";
		tags.forEach(function(t){
			str += "\n" + t.roles.join(" | ") + "  prefix: `" + (t.prefix == null ? "[none]" : t.prefix) + (t.exlusive ? "`  (exclusive)" : "");
		});
		callback(str);
	}
	else{
		var user = message.member;
		var server = message.guild;
		var roleGiven;
		var prefix;
		if(alias){
			roleGiven = aliasRole;
		}
		else if(parameters[1].indexOf(":") >= 0){
			roleGiven = capitalize(parameters[1].substring(parameters[1].indexOf(":")+1).trim());
			prefix = parameters[1].substring(0,parameters[1].indexOf(":"));
		}
		else{
			roleGiven = capitalize(parameters[1]);
		}

		if(user.roles.some(function(r1){
			return r1.name == roleGiven;
		})){
			callback("You already have the role "+roleGiven+".");
		}
		else{
			tags.forEach(function(t){
				if(prefix != undefined && t.prefix == prefix){
					// if the server already has the role, give the user the role
					if(server.roles.some(function(role){
						return role.name == roleGiven;
					})){
						var newRole = getRoleFromGuildByName(server,roleGiven);
						user.addRole(newRole);
					}
					// otherwise, create the new role.
					else{
						server.createRole({"name":roleGiven},"Created via command").then(function(newRole){
							t.roles.push(roleGiven);
							switch(t.prefix){
								case "species":
									fs.writeFile("specieslist.json", JSON.stringify(speciesRoles), function(err){
										if(err) console.log(err);
									});
									break;
							}
							newRole.setColor([231,76,60]).then(function(coloredRole){
								coloredRole.setPosition(23).then(function(positionedRole){
									user.addRole(positionedRole).then(function(member){
										callback("Added role "+roleGiven+".");
									}).catch(function(err){
										console.log(err);
									});
								}).catch(function(err){
									console.log(err);
								});
							}).catch(function(err){
								console.log(err);
							});
						}).catch(function(err){
							console.log(err);
						});
					}
				}
				else if(t.roles.some(function(tr){return tr == roleGiven;})){
					var replaced = ".";
					t.roles.forEach(function(tr){
						user.roles.map(function(r){
							if(t.exclusive && tr == r.name){
								user.removeRole(getRoleFromGuildByName(server,tr)).then(function(ro){}).catch(function(err){
									console.log(err);
								});
								updateCharacter(message,r.name,true,function(res){
									callback(res);
								});
								replaced = ", replacing "+tr+".";
							}
						});
					});
					var role = getRoleFromGuildByName(server,roleGiven);
					if(role === undefined) errorCallback("The role was not found. You should add it.");
					else{
						user.addRole(role).then(function(ro){}).catch(function(err){console.log(err);});
						updateCharacter(message,roleGiven,false,function(res){
							callback(res);
						});
					}
					callback("Added role "+roleGiven+replaced);
				}
			});
		}
	}
}

function removeRole(message,callback,alias=false){
	var user = message.member;
	var server = message.guild;
	if(alias){
		lfrpRoles.forEach(function(lr){
			user.roles.map(function(r){
				if(lr == r.name){
					user.removeRole(getRoleFromGuildByName(server,lr)).then(function(member){
						callback("Removed "+lr+".");
						updateCharacter(message,r.name,true,function(res){
							callback(res);
						});
					}).catch(function(err){
						console.log(err);
					});
				}
			});

		});
	}
	else{
		var parameters = message.content.split(" ");
		var roleGiven;

		if(["lfrp-prey","lfrp-pred","lfrp-any"].some(function(l){
			console.log(l);
			console.log(parameters);
			return parameters[1].toLowerCase() == l;
		})){
			roleGiven = (parameters[1].substr(0,6).toUpperCase() + parameters[1].substr(6).toLowerCase());
		}
		else{
			roleGiven = capitalize(parameters[1].toLowerCase());
		}


		var flag = true;

		user.roles.map(function(r){
			if(r.name == roleGiven){
				user.removeRole(getRoleFromGuildByName(server,roleGiven)).then(function(ro){}).catch(function(err){console.log(err);});
				mc.updateCharacter(message,r.name,true,function(res){
					callback(res);
				});
				callback("Removed role "+roleGiven);
				flag = false;
			}
		});

		if(flag){
			callback("You do not appear to have the "+roleGiven+" role.")
		}
	}
}

function capitalize(str){
	var a = str.charAt(0).toUpperCase();
	var b = str.substring(1).toLowerCase();
	var c = a + b;
	return c;
}

function hasRole(message,callback){
	var found = [];
	var guild = message.guild;
	var roles = message.content.split(" ").slice(1);

	roles.forEach(function(r){
		var r1 = getRoleFromGuildByName(guild,capitalize(r));
		if(r1 !== undefined){
			guild.members.map(function(member){
				member.roles.map(function(r2){
					if(r1 == r2){
						found.push(member.displayName);
					}
				});
			});
		}
		else{
			callback("Could not find role '"+role+"'.");
		}
	});
	callback(found.join("\n"));
}

function lfrp(m,c){
	if(m.content.split(" ").length == 1){
		c("Alias command for LFRP roles.\nUsage: `!!lfrp [ prey | pred | any | stop ]`");
	}
	else{
		switch(m.content.split(" ")[1].toLowerCase()){
			case "prey":
				setRole(m,function(r1){c(r1)},function(r2){console.log(r2)},true,"LFRP-Prey");
				break;
			case "pred":
				setRole(m,function(r1){c(r1)},function(r2){console.log(r2)},true,"LFRP-Pred");
				break;
			case "any":
				setRole(m,function(r1){c(r1)},function(r2){console.log(r2)},true,"LFRP-Any");
				break;
			case "stop":
				removeRole(m,function(r){c(r)},true);
				break;
		}
	}
}


/////////////////////////
//  Multi - Character  //
/////////////////////////

//characterSets =
//  {
//    guild_id:{
//      member_id:{
//        "active": character_name,
//        "characters":[
//          {
//            "name":character_name,
//            roles:[
//              <String>, ...
//            ]
//          }
//        ]
//      }
//    }
//  }
//

var characterSets = {};

function loadCharacters(bot,then){
	fs.readFile("../characterSets.json",function(err,data){
		if(err){
			fs.writeFile("../characterSets.json","{}",function(err){
				if(err) console.log(err);
				else loadCharacters(bot,function(){
					then();
				});
			});
		}
		else{
			var file = JSON.parse(data);
			Object.keys(file).forEach(function(guild_id){
				var discordGuild = bot.guilds.get(guild_id);
				var members = file[guild_id];
				Object.keys(members).forEach(function(member_id){
					var discordMember = discordGuild.members.get(member_id);
					var member = members[member_id];
					var charSet = [];
					var activeChar = member.active;

					member.characters.forEach(function(character){
						charSet.push(new Character(discordMember,character.name,character.roles));
					});

					characterSets[member_id] = new CharacterSet(discordMember,charSet,activeChar);
				});
			});
		}
		then();
	});
}


// Main character class
class Character {
	constructor(member,name,roles=null){
		this.roles = [];
		this.name = name;
		if(roles === null){
			member.roles.map(r1 => {
				if(tags.some(t => {
					return t.roles.some(r2 => {
						return r1.name == r2;
					});
				})) {
					this.roles.push(r1.name);
				}
			});
		}
		else{
			this.roles = roles;
		}
	}
}

// Users each have a character set. Defaulting to contain a single character (with no set roles)
class CharacterSet {
	constructor(member,chars=[],active=undefined){
		this.member = member; //userid of the member.
		this.guild = member.guild; //guild of which member is from.
		this.current = active; //name of the active character in set.
		this.characters = {}; //list of characters in set.
		for(let i = 0; i < chars.length; i++){
			this.characters[chars[i].name] = chars[i];
		}
	}

	addCharacter(member,name,callback){
		this.character[name] = new Character(member,name);
		callback("Info: Created new character '"+name+"'");
		save();
	}

	removeCharacter(name,callback){
		if(name == this.current){
			callback("Error: You cannot remove the character you are currently playing as.");
		}
		delete this.characters[name];
		save();
	}

	switchCharacter(member,name,callback){
		if(name == this.current){
			callback("Info: You are already playing as "+this.current+".");
		}

		else if(name in this.characters){
			tags.forEach(t => {
				t.forEach(availableRole => { //list of available roles.
					var role = getRoleFromGuildByName(member.guild, availableRole);

					oldRoles = this.characters[current].roles;
					newRoles = this.characters[name].roles;

					// if old character lacks role AND new character contains role.
					if(oldRoles.indexOf(availableRole) < 0 && newRoles.indexOf(availableRole) >= 0){
						// then give the user the role.
						member.addRole(role).then(function(role){
							// it did its job.
						}).catch(function(err){
							console.log(err);
						});
					}

					// if old character contains role AND new character lacks role.
					else if(oldRoles.indexOf(availableRole) >= 0 && newRoles.indexOf(availableRole) < 0){
						// then remove the role from the user
						member.removeRole(role).then(function(role){
							// it did its job.
						}).catch(function(err){
							console.log(err);
						});
					}
				});
			});
			this.current = name;
			callback("Info: Switched to "+this.current+".");
			save();
		}
	}

	updateCharacter(role,removing){
		if(!removing){
			this.characters[this.current].push(role);
		}
		else{
			this.characters[this.current].pop(indexOf(role));
		}
		save();
	}

	hasCharacter(name){
		return Object.keys(this.characters).some(char => char == name);
	}

	currentCharacter(){
		return this.characters[this.current];
	}

	renameCharacter(old_name, new_name, callback){
		if(new_name == undefined){
			if(this.hasCharacter(old_name)){
				callback("Error: You already have a character named "+old_name);
			}
			else{
				this.characters[old_name] = this.characters[this.current];
				delete this.characters[this.current];
				this.current = old_name;
			}
		}
		else if(old_name == this.current){
			renameCharacter(new_name);
		}
		else{
			if(this.hasCharacter(new_name)){
				callback("You already have a character named "+new_name);
			}
			else{
				this.characters[new_name] = this.characters[old_name];
				delete this.characters[old_name];
			}
		}
	}
}

/*
Format:
	characterSets: {
		userid: {
			CharacterSet: {
				Character (...)
			}
		}
	}
*/

// When a user joins the guild, automatically give them a character set.
function newUser(member){
	characterSets[member.id] = new CharacterSet(member.id,[
		new Character(member, member.displayName)
	]).current = member.displayName;
	save();
}

// function to be called from the main script, to switch characters.
function switchCharacter(member,name,callback){
	if(characterSets[member.id].hasCharacter(name)){
		characterSets[member.id].switchCharacter(name,function(res){
			callback(res);
		});
	}
	else{
		newCharacter(member,name,function(res){callback(res)});
	}
	save();
}

function listCharacters(message,callback){
	var chars = Object.keys(characterSets[message.member.id].characters);
	var str = "**Your characters:**\n" + chars.join("\n    ");
	callback(str);
}

function listAllCharacters(message,callback){
	var tabWidth = 20;
	var str = "**Character**" + " ".repeat(tabWidth+2) + "**Owner**";
	Object.keys(characterSets).forEach(function(userid){
		var charSet = characterSets[userid];
		var owner = charSet.member.displayName;
		var guild_id = charSet.guild.id;
		if(guild_id == message.guild.id){
			Object.keys(charSet.characters).forEach(function(charName){
				str += "\n" + charName + " " + "-".repeat(tabWidth - charName.length) + " " + owner;
			});
		}
	});
	callback(str);
}

function newCharacter(member,name,callback){
	characterSets[member.id].addCharacter(member,name,function(res){
		callback(res);
	});
	save();
}

function updateCharacter(message,role,removing,callback){
	var member = message.member;
	characterSets[member.id].updateCharacter(role,removing);
	save();
}

function removeCharacter(message,callback){
	var member = message.member;
	var name = message.content.split(" ").slice(1).join(" "); //extract the name given.
	characterSets[member.id].removeCharacter(name,function(res){
		callback(res);
	});
	save();
}

function hasMember(member){
	return Object.keys(characterSets).some(set => set == member.id);
}

function describeCharacter(message,callback){
	var char = characterSets[message.member.id].currentCharacter();
	var str = "**Name:**\n"+char.name+"\n**Roles:**\n"+char.roles.join("\n");
	callback(str);
}

function renameCharacter(message,callback){
	var char = characterSets[message.member.id].currentCharacter();
	var parameters = message.content.split(" ");
	char.renameCharacter(parameters[1],parameters[2]);
}

function getRoleFromGuildByName(guild,name){
	var res = undefined;
	guild.roles.map(function(role,snowflake){
		if(role.name.toLowerCase() == name.toLowerCase())
			res = role;
	});
	return res;
}

// Converts ES6 Objects back to JSON, and then stores them.
function save(){
	var prepared = {};

	Object.keys(characterSets).forEach(function(user_id){
		var charSet = characterSets[user_id];
		if(!(Object.keys(prepared).some(function(g){
			return g == charSet.guild;
		}))){
			prepared[charSet.guild] = {};
		}

		if(Object.keys(prepared[charSet.guild]).some(function(m){
			return m == charSet.member;
		})){
			prepared[charSet.guild][charSet.member] = {};
		}

		prepared[charSet.guild][charSet.member]["active"] = charSet.current;
		prepared[charSet.guild][charSet.member]["characters"] = [];

		Object.keys(charSet.characters).forEach(function(charName){
			var char = charSet.characters[charName];
			var char_obj = {
				"name":char.name,
				"roles":char.roles
			};
			prepared[charSet.guild][charSet.member]["characters"].push(char_obj);
		});
	});

	fs.writeFile("../characterSets.json",JSON.stringify(prepared),function(err){
		console.log(err);
	});
}





module.exports = {
	"setRole":setRole,
	"removeRole":removeRole,
	"hasRole":hasRole,
	"lfrp":lfrp,
	"getRoleFromGuildByName":getRoleFromGuildByName,
	"hasMember": hasMember,
	"describeCharacter": describeCharacter,
	"removeCharacter": removeCharacter,
	"renameCharacter":renameCharacter,
	"updateCharacter": updateCharacter,
	"newCharacter": newCharacter,
	"switchCharacter": switchCharacter,
	"newUser": newUser,
	"loadCharacters": loadCharacters,
	"listCharacters":listCharacters,
	"listAllCharacters":listAllCharacters
};
