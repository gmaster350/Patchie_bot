const oh = require("./objectHelper");

/*
	Private Room Module
		Lets users in guilds create their own group 
		channels, visible only to members of the group.
		
		All necessary permissions and roles are
		created automatically, preventing non-members
		from viewing a private room. The only exception
		of course being the guild owner, who is able to
		view all channels.
		
		A channel group for private channels will be created
		if one does not already exist, upon the bot joining
		a guild for the first time.
		
		All new private channels will be placed under the 
		private channels group.
*/

// Create Group Room, only visible to members of the group
function create(guild,name,users,callback){
	var roleSettings = {
		"name":"privateChannel_"+name
	}
	guild.createRole(roleSettings).then(function(role){
		guild.createChannel(name,'text').then(function(chan){
			chan.overWritePermissions("everyone",{"READ_MESSAGES":false});
			chan.overWritePermissions(role,{"READ_MESSAGES":true});
		});
	});
	channel.overWritePermissions()
}