///  Role managing module

var genderRoles = ["Male","Female","Other"];
var voreRoles = ["Pred","Prey","Switch"];
var speciesRoles = ["Dragon","Human"];
var descRoles = ["Furry","Scalie","Avian"];
var feetRoles = ["Anthro","Feral"];
var sizeRoles = ["Fine","Diminutive","Tiny","Small","Medium","Large","Huge","Gargantuan","Colossal"];
var miscRoles = ["Disposal"];


function getRoleFromGuildByName(guild,name){
	var res = undefined;
	guild.roles.map(function(role,snowflake){
		if(role.name.toLowerCase() == name.toLowerCase())
			res = role;
	});
	return res;
}

function setRole(message,callback,errorCallback){
	var parameters = message.content.split(" ");

	
	if(parameters.length == 1){
		callback("Set a role for yourself. \n**Roles:**\nPrey | Pred | Switch\nMale | Female | Other\nDragon | Human\nFurry | Scalie | Avian\nAnthro | Feral\nFine | Diminutve | Tiny | Small | Medium | Large | Huge | Gargantuan | Colossal\nDisposal");
	}
	else{
		var roleGiven = capitalize(parameters[1].toLowerCase());
		var user = message.member;
		var server = message.guild;
		
		if(user.roles.some(function(r){
			return r.name == roleGiven;
		})){
			callback("You already have the role "+roleGiven+".");
		}
		else{
			if(genderRoles.some(function(gr){return gr == roleGiven;})){
				// removes any and all gender roles, then adds the new one.
				var replaced = ".";
				
				genderRoles.forEach(function(gr){
					user.roles.map(function(r){
						if(gr == r.name){
							user.removeRole(getRoleFromGuildByName(server,gr));
							replaced = ", replacing "+gr+".";
						}
					});
				});
				var role = getRoleFromGuildByName(server,roleGiven);
				if(role === undefined) errorCallback("The role was not found. You should add it.");
				else{
					user.addRole(role);
				}
				callback("Added role "+roleGiven+replaced);
			}
			else if(voreRoles.some(function(vr){return vr == roleGiven;})){
				// removes any and all vore roles, then adds the new one.
				var replaced = ".";
				voreRoles.forEach(function(vr){
					user.roles.map(function(r){
						if(vr == r.name){
							user.removeRole(getRoleFromGuildByName(server,vr));
							replaced = ", replacing "+vr+".";
						}
					});
				});
				var role = getRoleFromGuildByName(server,roleGiven);
				if(role === undefined) errorCallback("The role was not found. You should add it.");
				else{
					user.addRole(role);
				}
				callback("Added role "+roleGiven+replaced);
			}
			else if(speciesRoles.some(function(sr){return sr == roleGiven;})){
				var replaced = ".";
				speciesRoles.forEach(function(sr){
					user.roles.map(function(r){
						if(sr == r.name){
							user.removeRole(getRoleFromGuildByName(server,sr));
							replaced = ", replacing "+sr+".";
						}
					});
				});
				var role = getRoleFromGuildByName(server,roleGiven);
				if(role === undefined) errorCallback("The role was not found. You should add it.");
				else{
					user.addRole(role);
				}
				callback("Added role "+roleGiven+replaced);
			}
			else if(descRoles.some(function(dr){return dr == roleGiven;})){
				var replaced = ".";
				descRoles.forEach(function(dr){
					user.roles.map(function(r){
						if(dr == r.name){
							user.removeRole(getRoleFromGuildByName(server,dr));
							replaced = ", replacing "+dr+".";
						}
					});
				});
				var role = getRoleFromGuildByName(server,roleGiven);
				if(role === undefined) errorCallback("The role was not found. You should add it.");
				else{
					user.addRole(role);
				}
				callback("Added role "+roleGiven+replaced);
			}
			else if(feetRoles.some(function(fr){return fr == roleGiven;})){
				var replaced = ".";
				feetRoles.forEach(function(fr){
					user.roles.map(function(r){
						if(fr == r.name){
							user.removeRole(getRoleFromGuildByName(server,fr));
							replaced = ", replacing "+fr+".";
						}
					});
				});
				var role = getRoleFromGuildByName(server,roleGiven);
				if(role === undefined) errorCallback("The role was not found. fix something.");
				else{
					user.addRole(role);
				}
				callback("Added role "+roleGiven+replaced);
			}
			else if(sizeRoles.some(function(zr){return zr == roleGiven;})){
				var replaced = ".";
				sizeRoles.forEach(function(zr){
					user.roles.map(function(r){
						if(zr == r.name){
							user.removeRole(getRoleFromGuildByName(server,zr));
							replaced = ", replacing "+zr+".";
						}
					});
				});
				var role = getRoleFromGuildByName(server,roleGiven);
				if(role === undefined) errorCallback("The role was not found. fix something.");
				else{
					user.addRole(role);
				}
				callback("Added role "+roleGiven+replaced);
			}
			else if(miscRoles.some(function(mr){console.log(mr,roleGiven); return mr == roleGiven;})){
				// misc roles are not mutually exclusive, and will be added.
				
				user.addRole(getRoleFromGuildByName(server,roleGiven));
				callback("Added role "+roleGiven);
			}
			else{
				callback("Error: No role by that name found.");
			}
		}
	}
}

function removeRole(message,callback){
	var parameters = message.content.split(" ").slice(1);
	var roleGiven = capitalize(parameters[0].toLowerCase());
	var user = message.member;
	var server = message.guild;
	
	var flag = true;
	
	user.roles.map(function(r){
		if(r.name == roleGiven){
			user.removeRole(getRoleFromGuildByName(server,roleGiven));
			callback("Removed role "+roleGiven);
			flag = false;
		}
	});
	
	if(flag){
		callback("You do not appear to have the "+roleGiven+" role.")
	}
}

function capitalize(str){
	var a = str.charAt(0).toUpperCase();
	var b = str.substring(1).toLowerCase();
	return a + b;
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

module.exports = {
	"setRole":setRole,
	"removeRole":removeRole
}