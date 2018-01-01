// Bot random potion module //

const fs = require("fs");

var settings;
var customs = [];
var importedPotions;
fs.readFile("potions.json",function(err,data){
	if(err)console.log(err);
	importedPotions = JSON.parse(data);
});

function sum(arr){
	var t = 0;
	for(i=0;i<arr.length;i++)t+=arr[i];
	return t;
}

function weightedRandom(array,weights,callback){
	var total = 0;
	if(weights.some(function(w){
		if(w.constructor == Number){
			total += w;
			return false;
		}
		else{
			return true;
		}
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
	callback(ret);
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

function pickEffect(message,effects,members,callback){
	var process = new Promise(function(resolve,reject){
		
		// we deal ONLY with arrays.
		if (effects.constructor != Array) throw "An array was expected for effects."
		
		
		//valid formats: all objects, or mix of other arrays and string.
		if(effects.every(
			function(e){
				// Check to see if all array elements are objects
				return e.constructor == Object;
			}
		)){
			// All array elements are objects.
			if(effects.every(
				function(e){
					// Check to see if all objects contain the keys 'chance' and 'options'
					return ("chance" in e) && ("options" in e);
				}
			)){
				// Each object in the array has the required keys, but the values of the key-value pairs must now checked.
				if(effects.every(
					function(e){
						// Check to see if the key-value pairs have the correct values.
						return (e.chance.constructor == Number) && (e.options.constructor == Array);
					}
				)){
					// All objects meet the criteria. A weighted random selection is permitted to be performed.
					
					var weights = [];
					var effs = [];
					effects.forEach(function(obj){
						weights.push(obj.chance);
						effs.push(obj.options);
					});
					
					weightedRandom(effs,weights,function(selectedObject){
						pickEffect(message,selectedObject,members,function(res){
							resolve(res);
						});
					});
				}
				else{
					// One or more element in the array has the correct keys, but wrong values.
					reject("One or more element in the array has the correct keys, but wrong values. 'options' must be an array, and 'chance' must be a number; integer or floating point.");
				}
			}
			else{
				// The array has one or more objects missing the needed keys
				reject("One or more objects in array are missing a needed key. Array given: "+e);
			}
		}
		// If some elements are objects, and some aren't, throw an error, as the array must be consistent.
		else if(
			effects.some(function(e){
				return e.constructor != Object;
			})
			&&
			effects.some(function(e){
				return e.constructor == Object;
			})
		){
			// The array is inconsistent.
			reject("Array is inconsistent. Array must contain either all objects, or all non-objects. Array given: "+e);
		}
		else{
			// The array must therefore be appropriate to have a standard random selection performed.
			var response = "";
			effects.forEach(
				function(e){
					switch(e.constructor){
						case String:
							switch(e){
								case "%members%":
									//special case, picks a random member from the guild, which is online, and willing to participate
									pick(members,function(r){
										response += r;
									});
									break;
								default:
									if(e.match(/^%-?\d?, ?-?\d%$/)){
										//Special case, picks a random number between two integers inclusively
										var s = e.substring(1,e.length-1).replace(" ","").split(",");
										var low = Number(s[0]);
										var high = Number(s[1]);
										if(low < high){
											reponse += String(randbetween(low,high));
										}
										else{
											reject("Low limit was higher than High limit.");
										}
									}
									else{
										response += e;
									}
									break;
							}
							break;
						
						case Array:
							if(e.every(function(e1){
								return (e1.constructor == Object) && ("chance" in e1) && ("options" in e1);
							})){
								pickEffect(message,e,members,function(res){
									response += res;
								});
							}
							else{
								pick(e,function(r){
									response += r;
								});
							}
							break;
						
						case Number:
							response += String(e);
						
					}
				}
			);
			resolve(response);
		}
	});
	process.then(function(r){
		callback(r);
	}).catch(function(error){
		callback(error);
	});
}

function rn(n){ //random number between 0 and n
	return Math.floor(Math.random()*n);
}

function randbetween(a,b){
	return Math.floor(Math.random()*((b+1)-a)+a);
}

function pick(array,callback){
	var chosen = array.length > 0 ? array[rn(array.length)] : "";
	if(chosen instanceof Array){
		pick(chosen,function(r){
			callback(r);
		});
	}
	else{
		callback(chosen);
	}
}

function generate(message,callback){
	//it is more efficient to determine valid members before-hand, and then pass the array down through each recursion step.
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
	
	
	if(customs.length > 0){
		callback(customs[0]);
		customs.shift();
	}
	else{
		var loops = (message.content.split(" ").length >= 2 && !Number.isNaN(Number(message.content.split(" ")[1]))) ? Number(message.content.split(" ")[1]) : 1;
		if(loops > 10){
			callback("No more than 10 effects at once, please.");
		}
		else{
			for(var i = 0; i < loops; i++){
				pickEffect(message,importedPotions,members,function(resp){
					callback(resp);
				});
			}
		}
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