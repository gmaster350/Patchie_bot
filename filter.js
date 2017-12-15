// Bot filter module //

var censor = ["fuck","shit","cunt"]
var filter = ["nigger","faggot","fag"];
var muteTime = 120000;

function evaluate(message,callback){
	if(filter.some(function(f){
		return (message.content.includes(f) || message.content.includes(f+"s"));
	})){
		var memRoles = message.member.roles; //remember what roles the user has
		message.member.removeRoles(message.member.roles).then(function(member){
			setTimeout(function(mem,reinstateRoles){
				mem.addRoles(reinstateRoles);
			},muteTime,member,memRoles);
		}).catch(function(err){
			console.log(err);
		});
		
		callback("Warning: Bad language, temporary mute given");
	}
	else{
		var newMessageContent = [];
		message.content.split(" ").forEach(function(w){
			var word = w;
			censor.some(function(c){
				if(w == c){
					word = w.charAt(0) + "*".repeat(w.length-1);
					return true;
				}
				else if(w == c+"s"){
					word = w.charAt(0) + "*".repeat(w.length-2) + "s";
					return true;
				}
				else{
					return false;
				}
			});
			newMessageContent.push(word);
		});
		var joined = newMessageContent.join(" ");
		if (joined != message.content){
			message.edit(joined);
		}
	}
}

module.exports = {
	"evaluate":evaluate
}