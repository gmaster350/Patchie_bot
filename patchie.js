/*
	Patchie Bot
	
	This bot is made to be versatile with many available tools and utilities.
*/




// Module import and setup


// Discord
	const Discord = require("Discord.js");
	const bot = new Discord.Client();
	const prefix = "~!";

// Reddit
	const rawjs = require("raw.js");
	const reddit = new rawjs("User Agent: dragon_vore_bot/1.0 by u/K-guy");

// Standard nodejs modules
	const fs = require("fs");

// Custom modules
	const submenu = require("./submenu.js");
	const test = require("./test.js");
	const mysql = require("./mysql");
	const oh = require("./objectHelper");
	const privateRoom = require("./privateRoom.js");


	

/*
	Module handling
	
	In order to facilitate the submenu module, methods are handled through
	handler functions. Handler functions are passed the raw message, and a callback.
	
	If callback returns a string. If string is non-empty, it will be sent to the
	originating channel as a reply.
*/
	

// Private Room Module

function createRoom(message,callback){
	var parameters = message.substr(prefix.length).split(" ");
	var name = parameters[1];
	var userlist = [];
	oh.forEach(message.mentions.members.map,function(user,index,self){
		
	},function(){
		privateRoom.create(message.guild,name,userlist,function(){
			
		});
	});
}





// Test Module

function echo(message,callback){
	callback(message.substr(prefix.length + "echo".length + 1));
}





// Submenu Module

submenu.tree = {
	"test":{
		"echo":echo,
		"back":submenu.up, //returns to upper command tree
		"help":submenu.list
	},
	"poll":voting.create,
	"vote":voting.vote,
	"help":submenu.list
}

function command(message,callback){
	// Split parameters sans prefix
	var parameters = message.substr(prefix.length).split(" ");
	
	// If the (sub)object 
	// present at the user's active node 
	// of the menu tree
	// contains a key
	// matching the first parameter...
	if(oh.hasKey(oh.subObject(submenu.tree,submenu.active[message.author.id]),parameters[0])){
		
		// ...then move the user down the tree
		// such that the user's new active node
		// within the command tree
		// is the submenu they gave
		submenu.down(message.author.id,parameters[0],function(response){
			
			// The response given is what the value of the 
			// key-value pair in the subobject at the 
			// current location, which will be either a 
			// string or a function.
			
			// The string response exists for the purpose of responsiveness.
			
			// If the value of the key-value pair with the key whose string-value
			// is equal to the first command parameter 
			// is another sub-object, 
			// it means that the command they entered was the name of a submenu, 
			// and must then be moved down the subtree.
			// Their active node will be changed 
			// to reflect their current location
			// in the submenu tree.

			if(typeof response == "string"){
				callback(response);
			}
			
			// If however the response's type is a function
			// it indicates that the value of the key-value pair 
			// with the key whose string-value
			// is equal to the first command parameter
			// references a function.
			// In this case, the user remains where they are in the submenu tree
			// and the function is called.
			
			// The function will be defined above, likely to handle the imput,
			// processing the raw Message object so that it can be used by another
			// method or function, of which will likely have its own formal parameter format.
			
			else if(typeof response == "function"){
				response(message,function(res){
					if(res.length > 0){
						callback(res);
					}
				});
			}
		});
	}
}




/*
	General functions:
	
	Any functions not part of any module. These include event handling and command rooting
*/

oh.forEach(guild.members,function(member,snowflake,self){
	console.log(member.nickname);
});

bot.on("ready",function(message){
	console.log("I'm ready!");
});


bot.on("message",function(message){
	var send = "";
	submenu.active[message.author.id].forEach(function(node){
		send += node + "> ";
	});
	if(message.startsWith(prefix)){
		command(messag,function(response){
			message.channel.send(response);
		});
	}
});

bot.login("MjYxMDUyNjI4OTI1MDIyMjA4.CzvUEw.Wr-KZxyZgUr-yBXs0MC0ndeS--o"); 