///  Role managing module
const fs = require('fs');
//const //mc = require('./multiCharacter.js');

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
		"prefix":null,
		"roles":["Furred","Scaled","Feathered"]
	},
	{
		"exclusive":true,
		"prefix":null,
		"roles":["Anthro","Feral","Taur"]
	},
	{
		"exclusive":true,
		"prefix":null,
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
		"prefix":null,
		"roles":["Oral","Anal","Unbirth","Soul","Tail","Cock"]
	},
	{
		"exclusive":true,
		"prefix":null,
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
			str += "\n" + t.roles.join(" | ");
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
								//mc.updateCharacter(message,r.name,true,function(res){
								//	callback(res);
								//});
								replaced = ", replacing "+tr+".";
							}
						});
					});
					var role = getRoleFromGuildByName(server,roleGiven);
					if(role === undefined) errorCallback("The role was not found. You should add it.");
					else{
						user.addRole(role).then(function(ro){}).catch(function(err){console.log(err);});
						//mc.updateCharacter(message,roleGiven,false,function(res){
						//	callback(res);
						//});
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
						//mc.updateCharacter(message,r.name,true,function(res){
						//	callback(res);
						//});
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
				//mc.updateCharacter(message,r.name,true,function(res){
				//	callback(res);
				//});
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


/////////////////////////
//  Multi - Character  //
/////////////////////////

/*
fs.readFile("../characterSets.json",function(err,data){
	if(err){
		fs.writeFile("../characterSets.json","",function(err){
			if(err) console.log(err);
		});
	}
	else{
		var file = JSON.parse(data);
		Object.keys(file).forEach(userid => {
			characterSets[userid] = new CharacterSet(userid);
			Object.keys(file[userid]).forEach(character => {
				let roles = file[userid][character];
				let name = character;
				characterSets[userid].addCharacter(null,name,roles);
			});
		});
	}
});
*/

// Main character class
class Character {
	constructor(member,name,roles=null){
		this.roles = [];
		this.name = name;
		if(roles === null){
			member.roles.map(r1 => {
				if(allRoles().some(r2 => {
					return r1.name == r2;
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
	constructor(member,chars=[]){
		this.member = member; //userid of the member.
		this.current; //name of the active character in set.
		this.characters = {}; //list of characters in set.
		for(let i = 0; i < chars.length; i++){
			this.characters[chars[i].name] = chars[i];
		}
	}

	addCharacter(member,name){
		this.character[name] = new Character(member,name);
	}

	removeCharacter(name,callback){
		if(name == this.current){
			callback("You may not remove the character which you are currently playing.");
		}
		delete this.characters[name];
	}

	switchCharacter(member,name,callback){
		if(name == this.current){
			callback("You are alrady playing as "+this.current+".");
		}

		else if(name in this.characters){
			allRoles().forEach(availableRole => { //list of available roles.
				var role = getRoleFromGuildByName(member.guild, availableRole);

				oldRoles = this.characters[current].roles;
				newRoles = this.characters[name].roles;

				// if old character lacks role, new character contains role.
				if(oldRoles.indexOf(availableRole) < 0 && newRoles.indexOf(availableRole) >= 0){
					// then give the user the role.
					member.addRole(role).then(function(role){
						// it did its job.
					}).catch(function(err){
						console.log(err);
					});
				}

				// if old character contains role, new character lacks role.
				else if(oldRoles.indexOf(availableRole) >= 0 && newRoles.indexOf(availableRole) < 0){
					// then remove the role from the user
					member.removeRole(role).then(function(role){
						// it did its job.
					}).catch(function(err){
						console.log(err);
					});
				}
			});
			this.current = name;
			callback("Now playing as "+this.current+".");
		}
	}

	updateCharacter(role,removing){
		if(!removing){
			this.characters[current].push(role);
		}
		else{
			this.characters[current].pop(indexOf(role));
		}

		fs.writeFile("../characterSets.json",JSON.stringify(characterSets),function(err){
			if(err) console.log(err);
		});
	}

	hasCharacter(name){
		return Object.keys(this.characters).some(char => char == name);
	}

	currenCharacter(){
		return this.characters[current];
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

var characterSets = {};

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

function getRoleFromGuildByName(guild,name){
	var res = undefined;
	guild.roles.map(function(role,snowflake){
		if(role.name.toLowerCase() == name.toLowerCase())
			res = role;
	});
	return res;
}

function save(){
	fs.writeFile("../characterSets.json",JSON.stringify(characterSets),function(err){
		console.log(err);
	});
}





module.exports = {
	"setRole":setRole,
	"removeRole":removeRole,
	"hasRole":hasRole,
	"getRoleFromGuildByName":getRoleFromGuildByName,
	"hasMember": hasMember,
	"describeCharacter": describeCharacter,
	"removeCharacter": removeCharacter,
	"updateCharacter": updateCharacter,
	"newCharacter": newCharacter,
	"switchCharacter": switchCharacter,
	"newUser": newUser
};
