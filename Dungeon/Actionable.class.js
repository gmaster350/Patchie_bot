class Actionable {
	constructor(){
		// Actions directed towards an item or character
		this.directActions = {
			use: function(thing,player,otherThing){ return { print: "Cannot use " + thing.name, interrupt: false }; },
			consume: function(thing,player,otherThing){ return { print: "Cannot consume " + thing.name, interrupt: false }; },
			damage: function(thing,player,otherThing){ return { print: "Cannot damage " + thing.name, interrupt: false }; },
			destroy: function(thing,player,otherThing){ return { print: "Cannot destroy " + thing.name, interrupt: false }; },
			repair: function(thing,player,otherThing){ return { print: "Cannot repair " + thing.name, interrupt: false }; },
			taste: function(thing,player,otherThing){ return { print: "Cannot taste " + thing.name, interrupt: false }; },
			smell: function(thing,player,otherThing){ return { print: "Cannot smell " + thing.name, interrupt: false }; },
			touch: function(thing,player,otherThing){ return { print: "Cannot touch " + thing.name, interrupt: false }; }
		};

		this.indirectActions = {
			any: function(player){ return {interrupt:false,print:""}; },
			switchTo: function(player,otherPlayer){ return {interrupt:false,print:""}; },
			say: function(player,npc){ return {interrupt:false,print:""}; },
			speakTo: function(player,npc){ return {interrupt:false,print:""}; },
			goTo: function(player,oldRoom,newRoom){ return {interrupt:false,print:""}; },
			take: function(player,item,container){ return {interrupt:false,print:""}; },
			wear: function(player,wearing){ return {interrupt:false,print:""}; },
			remove: function(player,wearing){ return {interrupt:false,print:""}; },
			open: function(player,container){ return {interrupt:false,print:""}; },
			close: function(player,container){ return {interrupt:false,print:""}; },
			give: function(player,npc,item){ return {interrupt:false,print:""}; },
			lookAround: function(player,room){ return {interrupt:false,print:""}; },
			lookAt: function(player,any){ return {interrupt:false,print:""}; },
			use: function(player,thing,otherThing){ return {interrupt:false,print:""}; },
			leaveConversation: function(player,npc){ return {interrupt:false,print:""}; },
			consume: function(player, any, item){return {interrupt:false,print:""};},
			damage: function(player, any, item){return {interrupt:false,print:""};},
			destroy: function(player, any, item){return {interrupt:false,print:""};},
			repair: function(player, any, item){return {interrupt:false,print:""};},
			taste: function(player, any, item){return {interrupt:false,print:""};},
			smell: function(player, any, item){return {interrupt:false,print:""};},
			touch: function(player, any, item){return {interrupt:false,print:""};}
		};
	}

	setIndirectAction(action, callback){
		this.indirectActions[Actionable.verbSynonym(action)] = callback;
		return this;
	}

	setDirectAction(action, callback){
		this.directActions[Actionable.verbSynonym(action)] = callback;
		return this;
	}

	directAction(action,a,b,c,d){
		this.directActions[action](this,a,b,c,d);
	}

	indirectAction(action,a,b,c,d){
		this.indirectActions[action](this,a,b,c,d);
	}
}

Actionable.verbSynonym = function(action){
	switch(action){
		case "eat":
		case "drink":
		case "swallow":
		case "consume":
			return "consume";
		case "operate":
		case "use":
			return "use";
		case "repair":
		case "mend":
		case "fix":
		case "heal":
			return "repair";
		case "break":
		case "tear":
		case "erase":
		case "annihilate":
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

Actionable.globalActions = {
	any: function(actionable,player){ return {interrupt:false,print:""}; },
	switchTo: function(actionable,player,otherPlayer){ return {interrupt:false,print:""}; },
	say: function(actionable,player,npc){ return {interrupt:false,print:""}; },
	speakTo: function(actionable,player,npc){ return {interrupt:false,print:""}; },
	goTo: function(actionable,player,oldRoom,newRoom){ return {interrupt:false,print:""}; },
	take: function(actionable,player,item,container){ return {interrupt:false,print:""}; },
	wear: function(actionable,player,wearing){ return {interrupt:false,print:""}; },
	remove: function(actionable,player,wearing){ return {interrupt:false,print:""}; },
	open: function(actionable,player,container){ return {interrupt:false,print:""}; },
	close: function(actionable,player,container){ return {interrupt:false,print:""}; },
	give: function(actionable,player,npc,item){ return {interrupt:false,print:""}; },
	lookAround: function(actionable,player,room){ return {interrupt:false,print:""}; },
	lookAt: function(actionable,player,any){ return {interrupt:false,print:""}; },
	use: function(actionable,player,thing,otherThing){ return {interrupt:false,print:""}; },
	leaveConversation: function(actionable,player,npc){ return {interrupt:false,print:""}; },
	consume: function(actionable,player,any,item){return {interrupt:false,print:""};},
	damage: function(actionable,player,any,item){return {interrupt:false,print:""};},
	destroy: function(actionable,player,any,item){return {interrupt:false,print:""};},
	repair: function(actionable,player,any,item){return {interrupt:false,print:""};},
	taste: function(actionable,player,any,item){return {interrupt:false,print:""};},
	smell: function(actionable,player,any,item){return {interrupt:false,print:""};},
	touch: function(actionable,player,any,item){return {interrupt:false,print:""};}
};
