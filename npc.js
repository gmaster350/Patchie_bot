const mysql = require("./mysql");
const oh = require("./objectHelper");
const roleplay = require("./roleplay");

/*##############################
	NPC Module
		supermodule of roleplay
		
		Provides NPC class with behaviour for NPCs.
		
		NPCs have many of the same properties as characters, except 
		they also have properties to determine their responses to actions.
		
		These response characteristics include temperament, which 
		determines how likely they are to response to an altercation,
		such as their property being stolen.
		
		NPCs also may have knowledge, items to trade.

##############################*/