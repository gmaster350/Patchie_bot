class Actionable {
	constructor(){
		this.directAction = {
			use: function(options){ return { print: "Cannot use " + this.name, interrupt: false }; },
			consume: function(options){ return { print: "Cannot consume " + this.name, interrupt: false }; },
			damage: function(options){ return { print: "Cannot damage " + this.name, interrupt: false }; },
			destroy: function(options){ return { print: "Cannot destroy " + this.name, interrupt: false }; },
			taste: function(options){ return { print: "Cannot taste " + this.name, interrupt: false }; },
			smell: function(options){ return { print: "Cannot smell " + this.name, interrupt: false }; },
			touch: function(options){ return { print: "Cannot touch " + this.name, interrupt: false }; }
		};

		this.indirectAction = {
			switchTo: function(options){ return {interrupt:false,print:""}; },
			say: function(options){ return {interrupt:false,print:""}; },
			speakTo: function(options){ return {interrupt:false,print:""}; },
			goTo: function(options){ return {interrupt:false,print:""}; },
			take: function(options){ return {interrupt:false,print:""}; },
			wear: function(options){ return {interrupt:false,print:""}; },
			remove: function(options){ return {interrupt:false,print:""}; },
			open: function(options){ return {interrupt:false,print:""}; },
			close: function(options){ return {interrupt:false,print:""}; },
			give: function(options){ return {interrupt:false,print:""}; },
			lookAround: function(options){ return {interrupt:false,print:""}; },
			lookAt: function(options){ return {interrupt:false,print:""}; },
			leaveConversation: function(options){ return {interrupt:false,print:""}; }
		};
	}

	setIndirectAction(action, callback){
		this.indirectAction[Character.verbSynonym(action)] = callback;
		return this;
	}

	setDirectAction(){
		this.directAction[Character.verbSynonym(action)] = callback;
		return this;
	}

	interact(character, action){
		this.action[Character.verbSynonym(action)](character);
	}
}

Actionable.verbSynonym = function(verb){
	switch(action){
		case "eat":
		case "drink":
		case "swallow":
		case "consume":
			return "consume";
		case "operate":
		case "use":
			return "use";
		case "break":
		case "tear":
		case "destroy":
			return "destroy";
		case "damage":
		case "hit":
		case "punch":
		case "kick":
			return "damage";

		case "smell":
		case "sniff":
			return "smell";
		case "taste":
		case "lick":
			return "taste";
		case "feel":
		case "touch":
			return "touch";
	}
};

Actionable.verbs = [
	"eat",
	"drink",
	"swallow",
	"consume",
	"operate",
	"use",
	"break",
	"tear",
	"destroy",
	"damage",
	"hit",
	"punch",
	"kick",
	"smell",
	"sniff",
	"taste",
	"lick",
	"feel",
	"touch"
];

Actionable.actions = [
	"switchTo",
	"say",
	"speakTo",
	"goTo",
	"take",
	"wear",
	"remove",
	"open",
	"close",
	"give",
	"lookAround",
	"lookAt",
	"leaveConversation"
];
