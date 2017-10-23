// advanced voting

var active = {};

// list options separated by '|'.
function create(message,callback){
	var options = message.content.split("|");
	var parameters = options[0].split(" ");
	options.splice(0,1,parameters[parameters.length-1]);
	parameters.splice(-1,1);
	
	if(["fptp","2rr","ir","m","bc","all"].some(function(e){return(parameters[1]==e)} && Number(parameters[2]) != NaN){
		if(active[message.guild.id] === undefined){
			active[message.guild.id] = {};
		}
		if(active[message.guild.id][message.channel.id] = 
		switch(parameters[1]){
			case "fptp":
				break;
			case "2rr":
				break;
			case "ir":
				break;
			case "m":
				break;
			case "bc":
				break;
			case "all":
				break;
		}
	}
	else{
		callback("Incorrect syntax!\nUsage: option 1 | option 2 | option 3");
	}
}



//first past the post [fptp] ( 1 / n * 100) % needed for win
//can fail


//majority [m] ( >50 % to win)
//can fail


//two round runoff [2rr] (preferrential [p])


//instant runoff [ir]


//borda count [bc]


//single transferable vote [stv]


//all