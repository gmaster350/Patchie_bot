// Item Drops //

/*
{
	<hex 8>:{
		"owner":<userid>
		"takeable":<boolean> //whether item is out in the open.
		
		"wearable":<boolean>
		"consumable":<boolean>
		
		"effect":<string>
		"trigger": use | wear | touch | word: | words: | eat
	}
}

*/
var existingItems = {};
var effectCatalog = {}; //"color surface object":"effect"

function hash(){
	var h = "";
	while (h.length < 8){
		h += ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"][Math.floor(Math.random()*16)];
	}
	return h;
}

function listUserItems(message,callback){
	
}

function accept(message,callback){
	
}

function acceptSafely(message,callback){
	
}

function useItem(message,callback){
	
}

function retrieve(message,callback){ //take item from inventory
	
}

function retrieveSafely(message,callback){ //take item from inventory
	
}

function offerItem(message,callback){
	
}

function eatItem(message,callback){
	
}

function readItem(message,callback){
	
}

function newItem(){
	var color = ["Red","Blue","Green","White","Purple","Pink","Grey","Black","Orange","Yellow","Marbled"];
	var surface = ["Pearlscent","Shiny","Metallic","Glossy","Translucent","Darkened","Glowing","Wooden","Plastic",""];
	var object = ["Stone","Crystal","Button","Scroll","Glass pane","Locked box","Empty box","Ring","Ball","Pendant","Bone","Knife","Box of","Bottle filled with"];
	var effect = [
		"Your skin tingles all over"
	];
	
	var id = hash();
	var appearance = color[Math.floor(Math.random()*color.length)] + ", " + surface[Math.floor(Math.random()*surface.length)] + " " + object[Math.floor(Math.random()*object.length)];
	
	var wearable;
	var consumable;
	
	if(appearance in effectCatalog){
		effect = effectCatalog[appearance];
	}
	else{
		switch(appearance.split(" ")[2]){
			case "Stone":
		}
	}
	
}