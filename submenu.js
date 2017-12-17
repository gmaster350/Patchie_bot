//Submenu Module

const oh = require("./objectHelper.js");
const debug = true;
const fs = require("fs");

Object.prototype.classOf = function(){
	let x = String(this.constructor).split(' ')[1];
	return x.substr(0,x.indexOf("("));
};

Object.prototype.classIs = function(str){
	return this.classOf() == str;
}

var active = {}; //{'userid':['node','node','node']}
var tree = {};

function hasKey(obj,key,callback,recurse=false){
	if(obj.classIs("Object")){
		var object = obj;
		if(Object.keys(object).some(function(k){
			
			// If 'key' is a RegExp Object, perform a the relevant 
			// RegExp match on each key of the object.
			// Otherwise, do a simple string equality check.
			return (key instanceof RegExp) ? k.match(key) : k == key;
		})){
			callback(true);
		}
		else if(recurse){
			if(Object.keys(object).some(function(k){return object[k] instanceof Object || object[k] instanceof Array})){
				Object.keys(object).forEach(function(k){
					if(object[k].classIs("Object")){
						hasKey(object[k],key,function(res){
							callback(res);
						},true);
					}
					else if(object[k].classIs("Array")){
						hasKey(object[k][1],key,function(res){
							callback(res);
						},true);
					}
				});
			}
			else{
				callback(false);
			}
		}
		else{
			callback(false);
		}
	}
	else if(obj.classIs("Array")){
		var object = obj[1];
		if(Object.keys(object).some(function(k){
			
			// If 'key' is a RegExp Object, perform a the relevant 
			// RegExp match on each key of the object.
			// Otherwise, do a simple string equality check.
			return (key instanceof RegExp) ? k.match(key) : k == key;
		})){
			callback(true);
		}
		else if(recurse){
			if(Object.keys(object).some(function(k){return object[k] instanceof Object || object[k] instanceof Array})){
				Object.keys(object).forEach(function(k){
					if(object[k].classIs("Object")){
						hasKey(object[k],key,function(res){
							callback(res);
						},true);
					}
					else if(object[k].classIs("Array")){
						hasKey(object[k],key,function(res){
							callback(res);
						},true);
					}
				});
			}
			else{
				callback(false);
			}
		}
		else{
			callback(false);
		}
		
	}
}

function evaluate(prefix,message,callback){
	var parameters = message.content.substr(prefix.length).split(" ");
	
	// Globally accessible commands
	if(parameters[0] == "root"){ 
		active[message.author.id] = [];
		callback("Info: Returned to root");
	}
	else if(parameters == "help"){
		list(message,function(res){callback(res);});
	}
	else{
		/* If the (sub)object 
		// present at the user's active node 
		// of the menu tree
		// contains a key
		// matching the first parameter...*/
		getTree(function(submenu_tree){
			getActive(message.author.id,function(submenu_active){
				oh.subObject(submenu_tree,submenu_active,function(menu){
					hasKey(menu,parameters[0],function(has_key){
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
}

function down(user,destination,callback){ 
	// Get User's current tree position
	oh.subObject(tree,active[user],function(result){
		// Check to see if the branches immediately 
		// below the current tree position
		// contain the destination key.
		hasKey(result,destination,function(has_key){
			if(has_key){
				var dest = result[destination];
				if(dest instanceof Array){ //Array
					if(dest.length == 2 && dest[0].classIs("Function") && dest[1].classIs("Object")){
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

// modified subObject function from objectHelper.js
function subObject(arr,nodes,callback){
	console.log(arr[nodes[0]] instanceof Array);
	if(nodes.length > 0){
		if(arr[nodes[0]] instanceof Array){
			subObject(arr[nodes[0]][1],nodes.slice(1),function(res){
				callback(res);
			});
		}
		else{
			subObject(arr[nodes[0]],nodes.slice(1),function(res){
				callback(res);
			});
		}
	}
	else{
		callback(arr);
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
	
	response += "\n\n**Available:**\nroot";
	
	var makeResponse = new Promise(function(res,rej){
		subObject(tree,active[user],function(menu){
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