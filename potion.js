// Bot random potion module //

const fs = require("fs");

var settings;
var customs = [];
var importedPotions = [
	{
		"chance":1,
		"options":[
			"You feel many times stronger."
		]
	},
	{
		"chance":1,
		"options":[
			"You feel much more agile."
		]
	},
	{
		"chance":5,
		"options":[
			"Your ",
			["penis","head","tongue","legs","tail","ears","wings","whole body","ears","snout"],
			" changes to be many times ",
			["larger","smaller"],
			" than its current size."
		]
	},
	{
		"chance":1,
		"options":[
			"You are able to see greater distances."
		]
	},
	{
		"chance":4,
		"options":[
			"Your body gradually transforms into that of a",
			["rabbit","human","wolf","fish","bear","fox","dragon","cat","dog","mouse","rat","pig","sheep","giraffe","zebra","horse","hippopotamus","bird","eagle","shark","whale","sloth","chicken"]
		]
	},
	{
		"chance":3,
		"options":[
			"Your skin starts to change color, gradually turning ",
			["red","orange","yellow","green","blue","purple","pink","black","white","grey","transparent","stripey","spotted"]
		]
	},
	{
		"chance":1,
		"options":[
			"Your skin is immune to any acids"
		]
	},
	{
		"chance":1,
		"options":[
			"Your tongue turns numb, leaving you unable to speak coherently"
		]
	},
	{
		"chance":1,
		"options":[
			"You have a compulsion to dance"
		]
	},
	{
		"chance":6,
		"options":[
			"You gain the ability to exhale ",
			["tea","coffee","water","cola soda","deodorant","molten nickel","magma","candy","rosemary and thyme","paprika","parsley","mcdonald's fries","old sneakers","dulux paint","sand","gravel","salt","small plastic toys","powerful pheromones","sleeping gas","shredded paper","propane","pennies"]
		]
	},
	{
		"chance":1,
		"options":[
			"You become invisible to others."
		]
	},
	{
		"chance":2,
		"options":[
			"You suddenly sprout an extra ",
			["tail","penis","head","pair of ears","pair of horns","tongue"]
		]
	},
	{
		"chance":1,
		"options":[
			"Your mind and ",
			"%members%",
			"'s mind are switched."
		]
	}
];

function sum(arr){
	var t = 0;
	for(i=0;i<arr.length;i++)t+=arr[i];
	return t;
}

function weightedRandom(array,weights){
	var total = 0;
	if(weights.some(function(w){
		total += w;
		return false;
	})){
		throw "ALL weights must be numbers; integers or floats.";
	};
	
	if(array.length != weights.length){
		throw "lengths of arrays must be equal.";
	}
	
	var ret;
	var point = Math.random()*total;
	for(var i = 0, min = 0, max = array[0]; i < array.length; i++){
		max = sum(weights.slice(0,i+1));
		if(point > min && point < max){
			ret = array[i];
		}
		min = sum(weights.slice(0,i+1));
	}
	
	return ret;
}

function changeSetting(message,callback){
	var s = message.content.split(" ");
	if(s.length > 1){
		var r = s[1].toLowerCase();
		if(r == "true" || r == "false"){
			settings[message.author.id] = Boolean(message.content.split(" ")[1]);
			if(r == "true"){
				callback("You will no longer be selected for potion effects.");
			}
			else{
				callback("You can now be selected for potion effects.");
			}
			fs.writeFile("./potionSettings.txt",JSON.stringify(settings));
		}
		else{
			callback("Error: Please specify `true` or `false`");
		}
	}
	else{
		callback("Usage: potionIgnore `true`|`false`\nCurrent setting: "+settings[message.author.id]);
	}
}

function startsWithVowel(str1){
	return (str1.startsWith("a") || str1.startsWith("e") || str1.startsWith("i") || str1.startsWith("o") || str1.startsWith("u"));
}

function pickEffect(message,effects,callback){
	var members;
	switch(message.channel.type){
		case "text":
			members = [];
			message.guild.members.map(function(m,id){
				if(m.presence.status == "online" && settings[m.id] == false && m.id != message.author.id){
					members.push(m.user);
				}
			});
			break;
		case "dm":
			members = [];
			members.push(message.channel.recipient);
			break;
		case "group":
			members = [];
			message.channel.recipients.map(function(m,id){
				if(m.presence.status == "online" && settings[m.id] == false && m.id != message.author.id){
					members.push(m.user);
				}
			});
			break;
	}
	if (members.length == 0){
		members = ["`[nobody]`"];
	}
	
	var response = "";
	if(effects.constructor == Object){
		effects.options.forEach(function(o){
			if(o instanceof String){
				if(o == "%members%"){
					pick(members);
				}
				else{
					response += o;
				}
			}
			else if(o instanceof Array){
				response += pick(o);
			}
			else if(o instanceof Object){
				pickEffect(message,o,function(res){
					response += res;
				});
			}
		});
	}
	else if(effects.constructor == Array){
		console.log(typeof effects);
		if(effects.every(function(e){
			var isObject = e.constructor == Object;
			var hasOptions = false;
			var hasChance = false;
			if(isObject){
				hasOptions = Object.keys(e).some(function(k){
					return k == "options";
				});
				hasChance = Object.keys(e).some(function(k){
					return k == "chance";
				});
			}
			return (isObject && hasOptions && hasChance);
		})){
			// all objects in the array have the correct format for a weighted random selection //
			var weights = [];
			effects.forEach(function(obj){
				weights.push(obj.chance);
			});
			weightedRandom(effects,weights,function(selectedObject){
				pickEffect(message,selectedObject,function(res){
					response += res
				});
			});
			
		}
		else if(effects.every(function(e){return e.constructor == Object;})){
			// The first if-statement was not matched, therefore there may be an object not containing the needed keys. //
			
			effects.some(function(e){
				if(!("options" in Object.keys(e))){
					throw "'options' key missing from "+e;
				}
				if(!("chance" in Object.keys(e))){
					throw "'chance' key missing from "+e;
				}
			});
		}
		else if(effects.some(function(e){
			return e.constructor == Object;
		}) && effects.some(function(e){
			return e.constructor != Object;
		})){
			// The format of array elements is inconsistent //
			
			throw "The elements of an array is inconsistent! Either all of, or none of the elements should be objects."
			
		}
		else{
			var picked = pick(effects);
			if(picked instanceof Array){
				pickEffect(message,picked,function(res){
					response += res;
				});
			}
			else{
				response += picked;
			}
		}
	}
	else{
		throw "The evaluated object was neither an object nor an array. something's gone wrong here.";
	}
	
	//return response;
	
	//var r = weightedRandom(effects,weights);
	//var r2 = pick(r.options1);
	//var r4 = pick(r.options2);
	
	//var r1 = r.speak1 + (r.speak1.endsWith("a") && startsWithVowel(r2) ? "n " : " ");
	//var r3 = r.speak2 + (r.speak2.endsWith("a") && startsWithVowel(r4) ? "n " : " ");		
	//var r5 = r.speak3;
	
	//var response = r1 + r2 + r3 + r4 + r5;
	callback(response);
}

function rn(n){ //random number between 0 and n
	return Math.floor(Math.random()*n);
}

function pick(array){
	return array.length > 0 ? array[rn(array.length)] : "";
}

function generate(message,callback){
	if(customs.length > 0){
		callback(customs[0]);
		customs.shift();
	}
	else{
		pickEffect(message,importedPotions,function(response){
			callback(response);
		});
	}
}

function importSettings(json){
	settings = json;
}

function addCustom(message,callback){
	if(message.content.split(" ").length > 1){
		var c = message.cleanContent.split(" ").slice(1).join(" ");
		customs.push(c);
		callback("Added custom potion to queue");
	}
	else{
		callback("Add a custom potion to a queue, which will be used the next time 'potion' is called.");
	}
}

module.exports = {
	"generate":generate,
	"importSettings":importSettings,
	"changeSetting":changeSetting,
	"addCustom":addCustom
}