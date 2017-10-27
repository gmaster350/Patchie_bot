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
					callback("Entered submenu " + destination);
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
	active[user].pop();
	callback("Went back up to "+active[user][active[user].length-1]);
}

function list(message,callback){
	var user = message.author.id;
	var response = "";
	oh.subObject(tree,active[user],function(result){
		oh.forEach(result,function(value,key){
			response += "    "+key;
		},function(){
			callback(response);
		});
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