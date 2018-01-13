// Item Drops //

/*
{
	<hex 8>:{
		"owner":<userid>
		"takeable":<boolean> //whether item is out in the open.
		"effect":<string>
		"trigger": use | touch | word: | words: | eat
	}
}

*/
var existingItems = {};

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
	var color = ["Red","Blue","Green","White","Purple","Marbled",""];
	var surface = ["Pearlscene","Shiny","Metallic","Glossy","Translucent","Darkened","Glowing"];
	var object = ["stone","crystal","button","scroll","book","glass pane","locked box","ring","ball","pendant","bone","knife"];
	var effect = [
		
	];
	
	var id = hash();
	
	var appearance = "";
	
	
}