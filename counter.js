// Counter module

// Keeps track of word heuristics, and
// provides various word tools
const table = "table";

function store(message){
	let words = message.content.split(" ");
	for(let i in words){
		let w = words[i];
		let sql = "INSERT INTO " + table + " (guildid, channelid, userid, messageid, word, edit, previousid) VALUES (" + message.guild.id + "," + message.channel.id + "," + message.author.id + "," + message.id + "," + w + ",1,null";
	}
}

function update(oldmsg, newmsg){
	let oldwords = oldmsg.content.split(" ");
	let newwords = newmsg.content.split(" ");
	for(let i in newwords){
		let w = newwords[i];
		let sql = "INSERT INTO " + table + " (guildid, channelid, userid, messageid, word, edit, previousid) VALUES (" + message.guild.id + "," + message.channel.id + "," + message.author.id + "," +  + "," + w + ",," + oldmsg.id;
	}
}