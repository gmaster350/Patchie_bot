// Extended Emojis

var collection = [];

function insert(message,callback){
	message.content.match(new RegExp("/:[^ ]+:/")).forEach(function(tag){
		fetch(tag);
	});
}

// Got massive list of custom emoji? You can upload a csv file, in the format of:
// "name", "url"
// "name", "url"
// "name", "url"
// etc...
// Any publically accessible image url will do.
// Names cannot contain spaces.

function addEmoji(message,callback){
}

function fetch(name,callback){
	if(name in collection){
	}
}

function parseUpload(file){
}