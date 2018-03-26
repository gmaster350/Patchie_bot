var rounds = [];
var round = {};
// {eaten: [eater, eater]}

var playing = false;

function eat(message, callback){
	var eaten = message.mentions.members[0].id;
	var eater = message.author.id;
	if(!(eaten in round)) round[eaten] = [];
	round[eaten].push(eater);
}

function startGame(message, callback){
	nextRound(message, callback);
}

function endGame(message, callback){

}

function endRound(message, callback){
	Object.keys(round).forEach(key){
		if(round[key].length > 1){
			delete round[key];
		}
		else {
			round[key] = round[key][0];
		}
	}

	callback(JSON.stringify(round));
}

function nextRound(message, callback){

}
