//Submenu Module

const oh = require('./objectHelper');
const debug = true;

var active = {}; //{'userid':['node','node','node']}
var tree = {};

function down(user,destination,callback){ 
	// Get User's current tree position
	oh.subObject(tree,active[user],function(result){
		// Check to see if the branches immediately 
		// below the current tree position
		// contain the destination key.
		oh.hasKey(result,destination,function(has_key){
			if(has_key){
				if(typeof result[destination] == "object"){
					active[user].push(destination);
					callback("Info: Entered submenu *" + destination + "*");
				}
				else if(typeof result[destination] == "function"){
					callback(result[destination]);
				}
				else{
					callback("Error: Not a submenu or command.");
				}
			}
			else{
				callback("Error: No submenu or command with that name exists.");
			}
		});
	});
}

function up(message,callback){
	var user = message.author.id;
	if(active[user].length > 0){
		var newlast = active[user].length == 1 ? "[root]" : active[user].slice(-2,-1);
		active[user].pop();
		callback("Info: Went back up to "+newlast);
	}
	else{
		callback("Info: You are already in *[root]*.");
	}
}

function list(message,callback){
	var user = message.author.id;
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
					response += "...";
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
	
module.exports = {
	"up":up,
	"down":down,
	"list":list,
	"addUser":addUser,
	"getActive":getActive,
	"setTree":setTree,
	"getTree":getTree
};