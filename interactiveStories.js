//interactive stories module//

const fs = require("fs");
var active = {}; //{userid:[node,node]}

class Branch{
	constructor(description="[This is a new branch. use !!branchText to put some text here!]"){
		this.description = description;
		this.options = {}; //{<string>:<Branch>}
	}
	
	addOption(option){
		this.options[option] = new Branch();
	}
}

var Root = new Branch("There are a number of marked doors before you, which door do you open?");
Root.addOption("'Dragon'");


fs.writeFile("interactives.json",JSON.stringify(Root),function(err){
	if(err)console.log(err);
});


function getCurrent(userid,nodes=null,branch=Root){
	if(nodes == null){
		var n = active[userid];
		return getCurrent(userid,n.slice(1),Root.options[n[0]]);
	}
	else{
		if(nodes.length == 0){
			return branch;
		}
		else{
			var n = nodes.slice(1);
			return getCurrent(userid,n,branch.options[n[0]]);
		}
	}
}

function branchPrint(b){
	var response = b.description + "\n\n[-1] quit\n";
	var ops = Object.keys(b.options);
	for(var i = 0; i < ops.length; i++){
		response += "[" + String(i) + "] " + ops[i] + "\n";
	}
	return response;
}

function numberFilter(m){
	let flag = m.author.id == userid && !isNaN(Number(m.content));
	return flag;
}

function start(message,callback){
	var userid = message.author.id;
	callback(branchPrint(Root));
	navigate(message,function(r){
		callback(r);
	});
	
	message.channel.awaitMessages(
		function(m){
			
		},{
			time: 6000000, 
			maxMatches: 1,
			errors: ['time']
		}
	).then(function(collection){
		navigate(userid,collection.first(),function(r){
			callback(r);
		});
	}).catch(function(e){
		callback(e);
		active[userid] = [];
	});
}

function navigate(userid,msg,callback){
	var num = Number(msg.content);
	var currentBranch = getCurrent(userid);
	if(isNaN(num)){
		callback("You need to give a number.");
	}
	if(num >= 0){
		active[userid].push(Object.keys(currentBranch.options)[num]);
		var newbranch = getCurrent(userid);
		callback(printBranch(newbranch));
		msg.channel.awaitMessages
	}
	else if(num == -1){
		active[userid] = [];
	}
}

function addOption(message,callback){
	var userid = message.author.id;
	var option = message.content.split(" ").slice(1).join(" ");
	var branch = getCurrent(userid);
	branch.addOption(option);
}

function changeDescription(message,callback){
	var userid = message.author.id;
	var desc = message.content.split(" ").slice(1).join(" ");
	var branch = getCurrent(userid);
	branch.description = desc;
}

function setActive(a){
	active = a;
	fs.writeFile("../interactiveData.txt",JSON.stringify(active),function(err){
		if(err)console.log(err);
	});
}

function addUser(userid){
	if(Object.keys(active).every(function(k){
		return userid != k;
	})){
		active[userid] = [];
		fs.writeFile("../interactiveData.txt",JSON.stringify(active),function(err){
			if(err)console.log(err);
		});
	}
}

module.exports = {
	"addOption":addOption,
	"changeDescription":changeDescription,
	"start":start,
	"setActive":setActive
}