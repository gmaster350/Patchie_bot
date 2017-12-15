// Bot random potion module //

var effects = [
"You feel many times stronger.",
"You feel much more agile.",
["penis","head","tongue","legs","tail","ears","wings","whole body","ears","snout"],
"You are able to see greater distances.",[" rabbit"," human"," wolf"," fish"," bear"," fox"," dragon"," cat"," dog"," mouse"," rat"," pig"," sheep"," giraffe"," zebra"," horse"," hippopotamus"," bird","n eagle"," shark"," whale"," sloth"," chicken"],
["red","orange","yellow","green","blue","purple","pink","black","white","grey","transparent","stripey","spotted"],
"Your skin is immune to any acids",
"Your tongue turns numb, leaving you unable to speak coherently",
"You have a compulsion to dance",["tea","coffee","water","cola soda","deodorant","molten nickel","magma","candy","rosemary and thyme","paprika","parsley","mcdonald's fries","old sneakers","dulux paint","sand","gravel","salt","small plastic toys","powerful pheromones","sleeping gas","shredded paper","propane","pennies"]];



function generate(message,callback){
	var index = Math.floor(Math.random()*effects.length);
	var response;
	switch(index){
		case 2:
			response = "Your" + effects[index][Math.floor(Math.random()*effects[index].length)] + " expands to " + String(Math.floor(Math.random()*8)+2) + " times "+Math.floor(Math.random()*2)?"larger":"smaller"+" than its current size.";
			break;
		case 4:
			response = "You become invisible to others","Your body gradually transforms into that of a" + effects[index][Math.floor(Math.random()*effects[index].length)];
		case 5:
			response = "Your skin starts to change color, gradually turning " + effects[index][Math.floor(Math.random()*effects[index].length)] + ".";
		case 9:
			response = "You gain the ability to exhale " + effects[index][Math.floor(Math.random()*effects[index].length)];
		default:
			response = effects[index];
			break;
	}
	callback(response);
}

module.exports = {
	"generate":generate
}