const manageRoles = require('manageRoles');
const fs = require('fs');

// reinstance all objects from file upon start
fs.readFile("../characterSets.json",function(err,file){
	Object.keys(file).forEach(userid => {
		characterSets[userid] = new CharacterSet(userid);
		Object.keys(file[userid]).forEach(character => {
			let roles = file[userid][character];
			let name = character;
			characterSets[userid].addCharacter(null,name,roles);
		});
	});
});


// Main character class
class Character {
	constructor(member,name,roles=null){
		this.roles = [];
		this.name = name;
		if(roles === null){
			member.roles.forEach(r1 => {
				if(manageRoles.roles.some(r2 => {
					return r1.name == r2;
				})){
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
			manageRoles.roles.forEach(availableRole => { //list of available roles.
				var role = manageRoles.getRoleFromGuildByName(member.guild, availableRole);

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

		fs.readFile("../characterSets.json",function(err,file){

		});
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

// setup all profiles for the first time.
function initialize(message,bot,callback){
	if(message.member.permissions.has("ADMINISTRATOR")){
		callback("Preparing MultiCharacter module for the first time...");
		callback("Generating profiles for all guild members...");
		bot.guilds.map(guild => {
			guild.members.map(member => {
				if(!(member.id in characterSets)){
					characterSets[member.id] = new CharacterSet(member.id,[
						new Character(member, member.displayName);
					]).current = member.displayName;
				}
			});
		});
		callback("Done.");
	}
	else{
		callback("This is an administrator-only function.");
	}
}

// When a user joins the guild, automatically give them a character set.
function newUser(member){
	characterSets[member.id] = new CharacterSet(member.id,[
		new Character(member, member.displayName);
	]).current = member.displayName;
}

// function to be called from the main script, to switch characters.
function switchCharacter(message,callback){
	var member = message.member;
	var name = message.content.split(" ").slice(1).join(" "); //extract the name given.
	characterSets[member.id].switchCharacter(name,function(res){
		callback(res);
	});
}

function newCharacter(message,callback){
	var member = message.member;
	var name = message.content.split(" ").slice(1).join(" "); //extract the name given.
	characterSets[member.id].addCharacter(member,name,function(res){
		callback(res);
	});
}

function updateCharacter(message,removing,callback){
	var role = capitalize(parameters[1].substring(8).trim());
	var member = message.member;

	characterSets[member.id].updateCharacter(role,removing);
}

function removeCharacter(message,callback){
	var member = message.member;
	var name = message.content.split(" ").slice(1).join(" "); //extract the name given.
	characterSets[member.id].removeCharacter(name,function(res){
		callback(res);
	});
}

function capitalize(str){
	var a = str.charAt(0).toUpperCase();
	var b = str.substring(1).toLowerCase();
	return a + b;
}
