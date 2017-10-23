const oh = require("./objectHelper.js");
const submenu = require("./submenu.js");
const roleplay = require("./roleplay.js");

const verbs = ["cast","throw","strike","stab","shoot","punch","attack","bash","biforcate","impale","open","steal"];
var playerNames = [];

//evaluates message content, to determine the action to perform
function evaluate(message,callback){
	
	// If message is italicized, evaluate action to perform.
	if(message.charAt(0) == "_" && message.charAt(message.length-1) == "_"){
		var firstverb = "";
		var content = message.content.split(" ");
		var i = 0;
		while(!firstverb){
			if(content[i] in verbs){
				firstverb = content[i];
			}
			i += 1;
		}
		
	}
	
	// If message is not italicized, determine if it contains any action keywords.
	else{
		for(var i = 0; i < verbs.length; i++){
			let verb = verbs[i];
			for(var w = 0; i < message.content.split(" "); w++){
				let word = message.content.split(" ")[w];
				
				// If the message contains any action keywords, send a temporary message advising the using about doing actions.
				if(word == verb){
					message.channel.send("Action keyword __"+word+"__ was detected. D&D actions must be done using /me.\n`This is a temporary message.`").then(function(msg){
						msg.delete(3);
					});
					break;
				}
			}
		}
	}
}

function cast(user,spellname,callback){
}

function undo(){
}

function redo(){
}


function setup(message,callback){
	
}

function newMonster(){
}