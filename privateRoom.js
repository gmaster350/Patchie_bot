const oh = require("./objectHelper");

function capture(string,str1,str2,callback){
	if(str1 != str2 && str1 !== undefined && str2 !== undefined){
		var str1_indices = [];
		var str2_indices = [];
		for(var i=0,offset=0;i<string.length;i++){
			if(string.substr(i,str1.length) == str1){
				if(offset === 0){
					str1_indices.push(i+str1.length-1);
				}
				offset++;
			}
			if(string.substr(i,str2.length) == str2){
				offset--;
				if(offset === 0){
					str2_indices.push(i);
				}
			}
		}
		if(str1_indices.length == str2_indices.length){
			var result = [];
			for(var s1 = 0, s2 = 0; s1 < str1_indices.length && s2 < str2_indices.length; s1++, s2++){
				result.push(string.substring(str1_indices[s1]+1,str2_indices[s2]));
			}
			if(callback){
				callback(result);
			}
			else{
				return result;
			}
		}
		else{
			throw new Error("Token count mismatch. \n'"+str1+"': "+String(str1_indices.length)+"\n'"+str2+"': "+String(str2_indices.length));
		}
	}
	else{
		throw new Error("You must provide two different token characters");
	}
}

function hash(){
	var h = "";
	while (h.length < 4){
		h += ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"][Math.floor(Math.random()*16)];
	}
	return h;
}

/*
	Private Room Module
		Lets users in guilds create their own group
		channels, visible only to members of the group.

		All necessary permissions and roles are
		created automatically, preventing non-members
		from viewing a private room. The only exception
		of course being the guild owner, who is still able to
		view all channels.

		A channel group for private channels will be created
		if one does not already exist, upon the bot joining
		a guild for the first time.

		All new private channels will be placed under the
		private channels group.
*/

function getRoleFromGuildByName(guild,name){
	var res = undefined;
	guild.roles.map(function(role,snowflake){
		if(role.name.toLowerCase() == name.toLowerCase())
			res = role;
	});
	return res;
}

// Create Group Room, only visible to members of the group
function create(message,callback,alias=false,name=""){
	if(message.content.split(" ").length == 1){
		if(alias) callback("Usage: `!!eat @user ... `");
		else callback("Usage: privateRoom *room_name* \@user \@user ...\nCreates a private room for you and any mentioned users (You are automatically included). Room will be a text channel visible only to you and your mentioned users. Room is destroyed when all participants leave the room via `leaveRoom`");
	}
	else if(message.channel.type != "text"){
		callback("You cannot call this command outside of a server.");
	}
	else if(alias && message.mentions.members.some((member, mid) => { mid === message.member.id })){
		callback("You cannot eat yourself!");
	}
	else{
		var name = alias ? name : message.content.split(" ")[1];
		if(name.length > 98){
			callback("Channel names must not exceed 98 characters!");
		}
		else{
			var id = hash();
			message.guild.createRole({"name":id},"Created via command").then(function(newRole){
				message.guild.createChannel("P_" + name,"text").then(function(newChannel){
					newChannel.setTopic("{" + id + "}");
					newChannel.setPosition(2,false);
					newChannel.overwritePermissions(message.guild.id,{"VIEW_CHANNEL":false}).then(function(){
						newChannel.overwritePermissions(newRole.id,{"VIEW_CHANNEL":true}).then(function(){
							message.mentions.members.map(function(mentionedMember,mid){
								mentionedMember.addRole(newRole);
							});
							message.member.addRole(newRole);
						}).catch(function(err){console.log(err);});
					}).catch(function(err){console.log(err);});
				}).catch(function(err){console.log(err);});
			}).catch(function(err){console.log(err);});
		}
	}
}

function inviteToRoom(message,callback,alias=false,id=""){
	if(alias || message.channel.topic.match(/^\{[1234567890abcdef]{4}\}.*$/)){
		var newRole = getRoleFromGuildByName(message.guild, alias ? id : message.channel.topic.substring(1,5));

		if(message.mentions.users.size > 0){
			message.mentions.users.map(function(mentionedUser,uid){
				message.guild.fetchMember(mentionedUser).then(function(m){
					m.addRole(newRole);
				});
			});
		}
		else{
			if(alias) callback("Usage: `!!eat @user ... `");
			else callback("Usage: inviteToRoom @user @user ...\nAdds another user to your private room.");
		}
	}
	else{
		callback("This channel doesn't seem to be a private room. Call this command from within the room you want to invite someone to.");
	}
}

function leave(message,callback){
	var topic = message.channel.topic.substring(1,5);
	var role = getRoleFromGuildByName(message.guild, topic);
	if (role === undefined){
		callback("Couldn't find appropriate role. Are you sure this is a private channel?");
	}
	else{
		if(message.mentions.members.length > 0){  //Let moderators remove people from a private room.
			if(message.member.hasPermission("MANAGE_ROLES")){
				message.mentions.members.map(function(member){
					member.removeRole(role).then(function(mem){
						var membersWithRole = 0;

						message.guild.members.map(function(member){
							if(member.roles.some(function(r){
								return r.name == topic;
							})){
								membersWithRole++;
							}
						});

						if(membersWithRole == 0){
							message.channel.delete("Room is now empty").then(function(channel){
								message.guild.roles.map(function(role,id){
									if(role.name == topic){
										role.delete().then(function(deletedRole){});
									}
								});
							});
						}
					});
				});
			}
			else{
				callback("You cannot make others leave.");
			}
		}
		else{
			message.member.removeRole(role).then(function(mem){
				var membersWithRole = 0;

				message.guild.members.map(function(member){
					if(member.roles.some(function(r){
						return r.name == topic;
					})){
						membersWithRole++;
					}
				});

				if(membersWithRole == 0){
					message.channel.delete("Room is now empty").then(function(channel){
						message.guild.roles.map(function(role,id){
							if(role.name == topic){
								role.delete().then(function(deletedRole){});
							}
						});
					});
				}
			});
		}
	}
}

module.exports = {
	"create":create,
	"leave":leave,
	"inviteToRoom":inviteToRoom
}
