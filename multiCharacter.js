const fs = require('fs');


var genderRoles = ["Male","Female","Other"];
var voreRoles = ["Pred","Prey","Switch"];
var speciesRoles;
var descRoles = ["Furred","Scaled","Feathered"];
var feetRoles = ["Anthro","Feral"];
var sizeRoles = ["Fine","Diminutive","Tiny","Small","Medium","Large","Huge","Gargantuan","Colossal"];
var willRoles = ["Willing","Unwilling"];
var miscRoles = ["Disposal"];
var lfrpRoles = ["LFRP-Prey","LFRP-Pred","LFRP-Any"];

fs.readFile('specieslist.json',function(err,file){
	speciesRoles = JSON.parse(file);
});

function allRoles(){
	return [].concat(miscRoles,descRoles,feetRoles,lfrpRoles,sizeRoles,voreRoles,willRoles,genderRoles,speciesRoles);
}

// reinstance all objects from file upon start
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

function capitalize(str){
	var a = str.charAt(0).toUpperCase();
	var b = str.substring(1).toLowerCase();
	return a + b;
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
	"hasMember": hasMember,
	"describeCharacter": describeCharacter,
	"removeCharacter": removeCharacter,
	"updateCharacter": updateCharacter,
	"newCharacter": newCharacter,
	"switchCharacter": switchCharacter,
	"newUser": newUser
};
