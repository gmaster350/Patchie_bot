//Submenu Module

const oh = require('./objectHelper');


var active = {}; //{'userid':['node','node','node']}
var tree = {};

function down(user,destination,callback){
	oh.subObject(tree,active[user],function(result){
		if(oh.hasKey(result,destination)){
			if(typeof result[destination] == "object"){
				active[user].push(destination);
				callback("Entered submenu " + destination);
			}
			else if(typeof result[destination] == "function"){
				callback(result[destination]);
			}
			else{
				callback("Not a submenu or command.");
			}
		}
		else{
			callback("No submenu or command with that name exists.");
		}
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
	
module.exports = {
	"up":up,
	"down":down,
	"list":list,
	"active":active,
	"tree":tree
};