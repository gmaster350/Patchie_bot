//Spam prevention
const ed = require('edit-distance');
const oh = require("./objectHelper.js");
const historyLength = 30;
var strikeLength = 5;
var muteTime = 30000;
var coolOffPeriod = 3;
var sensitivity = 4.0;

function debug(str){if(true){console.log(str);}}

var history = {
}

function lev(s1, s2, callback) {
  var insert, remove, update;
  insert = remove = function(node) {
    return 1;
  };
  update = function(s1, s2) {
    return s1 !== s2 ? 1 : 0;
  };
  var res = ed.levenshtein(s1, s2, insert, remove, update).distance;

  if(callback)
    callback(res);
  return res;
}

function meanLev(arr,callback){
	var total = 0;
	arr.forEach(function(e1){
		arr.forEach(function(e2){
			lev(e1.content,e2.content,function(res){
				total += res;
			});
		});
	});
	callback(arr.length > 0 ? total / (Math.pow(arr.length, 2)) : 0 );
}

function getRoleFromGuildByName(guild,name){
	var res = undefined;
	guild.roles.map(function(role,snowflake){
		if(role.name == name)
			res = role;
	});
	return res;
}

function process(message,callback){
	oh.hasKey(history,message.channel.id,function(f1){
		if(!f1){
			history[message.channel.id] = {};
		}
	});
	oh.hasKey(history[message.channel.id],message.author.id,function(f2){
		if(!f2){
			history[message.channel.id][message.author.id] = {};
			history[message.channel.id][message.author.id]["messages"] = [];
			history[message.channel.id][message.author.id]["strikes"] = 0;
			history[message.channel.id][message.author.id]["cooloff"] = 0;
		}
	});

	history[message.channel.id][message.author.id].messages.push(
		{
			"messageid":message.id,
			"userid":message.author.id,
			"content":message.content
		}
	);
	if(history[message.channel.id][message.author.id].messages.length > historyLength){
		history[message.channel.id][message.author.id].messages.splice(0,1);
	}
	if(history[message.channel.id][message.author.id].cooloff > 0)
		history[message.channel.id][message.author.id].cooloff--;
	meanLev(history[message.channel.id][message.author.id].messages.slice(-5),function(diff){
		console.log(diff);
		if(history[message.channel.id][message.author.id].messages.length >= 5 && diff <= sensitivity && history[message.channel.id][message.author.id].cooloff === 0){
			history[message.channel.id][message.author.id].strikes++;
			history[message.channel.id][message.author.id].cooloff = coolOffPeriod;
			if(message.channel.type == "text"){
				var memRoles = message.member.roles; //remember what roles the user has
				message.member.removeRoles(message.member.roles).then(function(member){
					setTimeout(function(mem,reinstateRoles){
						mem.addRoles(reinstateRoles);
					},muteTime,member,memRoles);
				}).catch(function(err){
					console.log(err);
				});

				callback("Warning: Please avoid spamming this channel.")
			}
			else{
				callback("I cannot mute you here, but please stop");
			}
		}
	});
}

module.exports = {
	"process":process
}
