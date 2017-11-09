//Submenu Module

const oh = require("./objectHelper");
const debug = true;
const fs = require("fs");

var active = {}; //{'userid':['node','node','node']}
var tree = {};


function evaluate(prefix,message,callback){
	var parameters = message.content.substr(prefix.length).split(" ");
	
	/* If the (sub)object 
	// present at the user's active node 
	// of the menu tree
	// contains a key
	// matching the first parameter...*/
	getTree(function(submenu_tree){
		getActive(message.author.id,function(submenu_active){
			oh.subObject(submenu_tree,submenu_active,function(menu){
				oh.hasKey(menu,parameters[0],function(has_key){
					if(has_key){
						
						/* ...then move the user down the tree
						// such that the user's new active node
						// within the command tree
						// is the submenu they gave*/
						
						down(message.author.id,parameters[0],function(response){
							
							/* The response given is what the value of the 
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
							// in the submenu tree. */
							
							if(typeof response == "string"){
								callback(response);
							}	
							
							/* If however the response's type is a function
							// it indicates that the value of the key-value pair 
							// with the key whose string-value
							// is equal to the first command parameter
							// references a function.
							// In this case, the user remains where they are in the submenu tree
							// and the function is called.
							
							// The function will be defined above, likely to handle the imput,
							// processing the raw Message object so that it can be used by another
							// method or function, of which will likely have its own formal parameter format. */
							
							else if(typeof response == "function"){
								response(message,function(res){
									callback(res);
								});
							}
						});
					}
					else{
						callback("Error: No command or menu exists with that name.");
					}
				});
			});
		});
	});
}


function down(user,destination,callback){ 
	// Get User's current tree position
	oh.subObject(tree,active[user],function(result){
		// Check to see if the branches immediately 
		// below the current tree position
		// contain the destination key.
		oh.hasKey(result,destination,function(has_key){
			if(has_key){
				var dest = result[destination];
				if(dest instanceof Array){ //Array
					if(dest.length == 2 && (dest[0] instanceof Function) && (!(dest[1] instanceof Function) && !(dest[1] instanceof String) && !(dest[1] instanceof Number) && !(dest[1] instanceof Array) && (dest[1] instanceof Object))){
						callback(dest[0]);
						active[user].push(destination);
						callback("Info: Entered submenu *" + destination + "*");
					}
					else{
						console.log("Bad form of submenu!");
					}
				}
				else if(dest instanceof Function){ //Function
					callback(dest);
				}
				else if(dest instanceof Object){ // Object
					active[user].push(destination);
					callback("Info: Entered submenu *" + destination + "*");
				}
				else{ 
					callback("Error: Not a submenu or command.");
				}
			}
			else{
				callback("Error: No submenu or command with that name exists.");
			}
			fs.writeFile("../submenuData.txt",JSON.stringify(active),function(err){
				if(err){
					console.log(err);
				}
			});
		});
	});
}

function up(message,callback){
	var user = message.author.id;
	if(active[user].length > 0){
		var newlast = active[user].length == 1 ? "[root]" : active[user].slice(-2,-1);
		active[user].pop();
		callback("Info: Went back up to "+newlast);
		fs.writeFile("../submenuData.txt",JSON.stringify(active),function(err){
			if(err){
				console.log(err);
			}
		});
	}
	else{
		callback("Info: You are already in *[root]*.");
	}
}

function list(message,callback){
	var user;
	if(message.mentions.users.length > 0){
		user = message.mentions.users[0].id;
	}
	else{
		user = message.author.id;
	}
	
	var response = "Info:\n**Current location:**\n[root] ";
	
	active[user].forEach(function(node){
		response += "> " + node;
	});
	
	response += "\n\n**Available:**";
	
	var makeResponse = new Promise(function(res,rej){
		oh.subObject(tree,active[user],function(menu){
			var index = 0;
			var max = Object.keys(menu).length-1;
			oh.forEach(menu,function(value,key,self){
				index += 1;
				response += "\n" + key;
				if(typeof value == "object"){
					response += " ...";
				}
				if(index == max){
					res();
				}
			});
		});
	});
	
	makeResponse.then(function(){
		callback(response);
	});
}

function place(message,callback){
	var user;
	if(message.mentions.users.length > 0){
		user = message.mentions.users[0].id;
	}
	else{
		user = message.author.id;
	}
	
	var response = "Info:\n**Current location:**\n[root] ";
	
	active[user].forEach(function(node){
		response += "> " + node;
	});
	
	callback(response);
}

function importActive(act,callback){
	active = act;
	callback();
}

function setTree(newtree){
	tree = newtree;
}

function addUser(userid){
	active[userid] = [];
}

function getTree(callback){
	callback(tree);
}

function getActive(userid,callback){
	callback(active[userid]);
}

function getActiveAll(callback){
	callback(active);
}
	
module.exports = {
	"up":up,
	"down":down,
	"list":list,
	"addUser":addUser,
	"getActive":getActive,
	"importActive":importActive,
	"getActiveAll":getActiveAll,
	"setTree":setTree,
	"getTree":getTree,
	"place":place,
	"evaluate":evaluate
};