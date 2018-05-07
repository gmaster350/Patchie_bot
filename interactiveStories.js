//interactive stories module//

const fs = require("fs");
var active = {}; //{userid:[node,node]}
var timeLimit = 600000; //option selection timeout.

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
Root.addOption("Dragon");


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

function branchLength(b){
	return Object.keys(b.options).length;
}

function branchPrint(b){
	var response = b.description + "\n\n[-1] quit\n";
	var ops = Object.keys(b.options);
	for(var i = 0; i < ops.length; i++){
		response += "[" + String(i) + "] " + ops[i] + "\n";
	}
	return response;
}

function messageFilter(m,branch){
	let flag = false;
	if (m.author.id == userid){
		if(!isNaN(Number(m.content))){
			if(Number(m.content) >= branchLength(branch) || Number(m.content) < -1){
				m.channel.send("Not a valid option!");
			}
			else{
				flag = true;
			}
		}
		else{
			if(!(m.content.startsWith("!!"))){
				m.channel.send("You need to give a number.");
			}
		}
	}
	return flag;
}

function start(message,callback){
	var userid = message.author.id;
	active[userid] = [];
	callback(branchPrint(Root));

	message.channel.awaitMessages(
		function(m){
			return messageFilter(m,Root);
		},{
			time: timeLimit,
			maxMatches: 1,
			errors: ['time']
		}
	).then(function(collection){
		console.log(collection.first().content);
		navigate(collection.first().author.id,collection.first());
	}, function(e){
		console.log(e);
		active[userid] = [];
		message.channel.send("Took too long to respond. Please repond to story within 10 minutes.");
	});
}

function navigate(userid,msg){
	var num = Number(msg.content);
	var currentBranch = getCurrent(userid);

	if(num >= 0 && num < Object.keys(currentBranch.options).length){
		active[userid].push(Object.keys(currentBranch.options)[num]);
		currentBranch = getCurrent(userid);
		msg.channel.send(branchPrint(currentBranch));

		msg.channel.awaitMessages(
			function(m){
				return messageFilter(m,currentBranch);
			},{
				time: timeLimit,
				maxMatches: 1,
				errors: ['time']
			}
		).then(function(collection){
			navigate(collection.first().author.id,collection.first());
		}, function(e){
			msg.channel.send(e);
			active[userid] = [];
			msg.channel.send("Took too long to respond. Please repond to story within 10 minutes.");
		});
	}
	else if(num == -1){
		active[userid] = [];
		msg.channel.send("Exited story");
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
