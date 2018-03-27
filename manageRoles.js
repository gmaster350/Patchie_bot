///  Role managing module
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


function getRoleFromGuildByName(guild,name){
	var res = undefined;
	guild.roles.map(function(role,snowflake){
		if(role.name.toLowerCase() == name.toLowerCase())
			res = role;
	});
	return res;
}

function setRole(message,callback,errorCallback,alias=false){
	var parameters = message.content.split(" ");


	if(parameters.length == 1){
		var str = "Set a role for yourself.\n";
		str += "\n" + genderRoles.join(" | ");
		str += "\n" + voreRoles.join(" | ");
		str += "\n" + speciesRoles.join(" | ");
		str += "\n" + descRoles.join(" | ");
		str += "\n" + feetRoles.join(" | ");
		str += "\n" + sizeRoles.join(" | ");
		str += "\n" + willRoles.join(" | ");
		str += "\n" + lfrpRoles.join(" | ");
		str += "\n" + miscRoles.join(" | ");
		str += "\n\nNew species roles can be created on-demand, by prefixing the role with `species:`";
		str += "\ne.g: `!!setRole species:my_species`";
		callback(str);
	}
	else{
		var user = message.member;
		var server = message.guild;
		var roleGiven;
		if(parameters[1].startsWith("species:")){
			roleGiven = capitalize(parameters[1].substring(8).trim());
			if(user.roles.some(function(r1){
				return r1.name == roleGiven;
			})){
				callback("You already have the role "+roleGiven+".");
			}
			else{
				if(server.roles.some(function(role){
					return role.name == roleGiven;
				})){
					var newRole = getRoleFromGuildByName(server,roleGiven);
					user.addRole(newRole);
				}
				else{
					server.createRole({"name":roleGiven},"Created via command").then(function(newRole){
						newRole.setColor([231,76,60]).then(function(coloredRole){
							coloredRole.setPosition(23).then(function(positionedRole){
								user.addRole(positionedRole).then(function(member){
									callback("Added role "+roleGiven+".");
								});
							});
						});
					});
				}
			}
		}
		else{
			roleGiven = alias ? alias : ["lfrp-prey","lfrp-pred","lfrp-any"].some(l => parameters[1].toLowerCase() == l) ? roleGiven = (parameters[1].substr(0,6).toUpperCase() + parameters[1].substr(6).toLowerCase()) : capitalize(parameters[1].toLowerCase());

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
				else if(willRoles.some(function(wr){return wr == roleGiven;})){
					var replaced = ".";
					willRoles.forEach(function(wr){
						user.roles.map(function(r){
							if(wr == r.name){
								user.removeRole(getRoleFromGuildByName(server,wr));
								replaced = ", replacing "+wr+".";
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
				else if(lfrpRoles.some(function(lr){return lr == roleGiven;})){
					var replaced = ".";

					lfrpRoles.forEach(function(lr){
						user.roles.map(function(r){
							if(lr == r.name){
								user.removeRole(getRoleFromGuildByName(server,lr));
								replaced = ", replacing "+lr+".";
							}
						});
					});

					var role = getRoleFromGuildByName(server, roleGiven);
					if(role === undefined) errorCallback("The role was not found. You should add it.");
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
					}).catch(function(err){
						console.log(err);
					});
				}
			});

		});
	}
	else{
		var parameters = message.content.split(" ").slice(1);
		var roleGiven = capitalize(parameters[0].toLowerCase());

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
	"removeRole":removeRole,
	"hasRole":hasRole,
	"roles":[genderRoles,voreRoles,speciesRoles,descRoles,feetRoles,sizeRoles,willRoles,miscRoles,lfrpRoles]
}
