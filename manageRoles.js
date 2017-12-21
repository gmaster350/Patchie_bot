///  Role managing module

var genderRoles = ["Male","Female","Other"];
var voreRoles = ["Pred","Prey","Switch"];
var speciesRoles = ["Dragon","Human","Furry","Scalie","Avian"];
var miscRoles = ["Disposal"];


function getRoleFromGuildByName(guild,name){
	var res = undefined;
	guild.roles.map(function(role,snowflake){
		if(role.name.toLowerCase() == name.toLowerCase())
			res = role;
	});
	return res;
}

function setRole(message,callback){
	var parameters = message.content.split(" ");
	console.log(parameters);
	
	if(parameters.length == 1){
		callback("Set a role for yourself. \n**Roles:**\nPrey | Pred | Switch\nMale | Female | Other\nDragon | Human | Furry | Scalie | Avian\nDisposal");
	}
	else{
		var roleGiven = capitalize(parameters[1].toLowerCase());
		var user = message.member;
		var server = message.guild;
		
		if(genderRoles.some(function(gr){return gr == roleGiven;})){
			// removes any and all gender roles, then adds the new one.
			var replaced = ".";
			genderRoles.forEach(function(gr){
				user.roles.map(function(r){
					if(r.name == roleGiven){
						callback("You already have the role "+roleGiven+".");
					}
					if(gr == r.name){
						user.removeRole(getRoleFromGuildByName(server,r));
					}
				});
			});
			user.addRole(getRoleFromGuildByName(server,roleGiven));
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
			user.addRole(getRoleFromGuildByName(server,roleGiven));
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
			user.addRole(getRoleFromGuildByName(server,roleGiven));
			callback("Added role "+roleGiven+replaced);
		}
		else if(miscRoles.some(function(mr){console.log(mr,roleGiven); return mr == roleGiven;})){
			// misc roles are not mutually exclusive, and will be added.
			miscRoles.forEach(function(mr){
				user.roles.map(function(r){
					if(mr == r.name){
						callback("You already have the role "+roleGiven+".");
					}
				});
			});
			
			user.addRole(getRoleFromGuildByName(server,roleGiven));
			callback("Added role "+roleGiven);
		}
		else{
			callback("Error: No role by that name found.");
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
	var ret = str.substring(1);
	var chr;
	switch(str.charAt(0)){
		case "a":
			chr = "A";
			break;
		case "b":
			chr = "B";
			break;
		case "c":
			chr = "C";
			break;
		case "d":
			chr = "D";
			break;
		case "e":
			chr = "E";
			break;
		case "f":
			chr = "F";
			break;
		case "g":
			chr = "G";
			break;
		case "h":
			chr = "H";
			break;
		case "i":
			chr = "I";
			break;
		case "j":
			chr = "J";
			break;
		case "k":
			chr = "K";
			break;
		case "l":
			chr = "L";
			break;
		case "m":
			chr = "M";
			break;
		case "n":
			chr = "N";
			break;
		case "o":
			chr = "O";
			break;
		case "p":
			chr = "P";
			break;
		case "q":
			chr = "Q";
			break;
		case "r":
			chr = "R";
			break;
		case "s":
			chr = "S";
			break;
		case "t":
			chr = "T";
			break;
		case "u":
			chr = "U";
			break;
		case "v":
			chr = "V";
			break;
		case "w":
			chr = "W";
			break;
		case "x":
			chr = "X";
			break;
		case "y":
			chr = "Y";
			break;
		case "z":
			chr = "Z";
			break;
	}
	return chr + ret;
}

module.exports = {
	"setRole":setRole,
	"removeRole":removeRole
}