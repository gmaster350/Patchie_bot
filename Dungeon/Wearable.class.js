class Wearable extends Item {
	constructor(type,name,description){
		super(name, description);
		if(["shirt","bra","pants","skirt","dress","gloves","scarf","underwear","hat","ring","bracelet","anklet","necklace","socks","shoes","onesie","overalls","thighhighs","mask","earmuffs"].every(t => t !== Wearable.wearableTypeSynonym(type))) throw new Error("Bad wearingType '"+type+"'");
		this.wearableType = Wearable.wearableTypeSynonym(type);
		this.covered = {
			"face":false,
			"neck":false,
			"ears":false,
			"head":false,
			"torso":false,
			"arms":false,
			"hands":false,
			"crotch":false,
			"legs":false,
			"feet":false
		};

		switch(this.wearableType){
			case "shirt":
				this.covered.torso = true;
				this.covered.arms = true;
				break;
			case "bra":
				this.covered.torso = true;
				break;
			case "pants":
				this.covered.legs = true;
				this.covered.crotch = true;
				break;
			case "skirt":
				this.covered.legs = true;
				this.covered.crotch = true;
				break;
			case "dress":
				this.covered.torso = true;
				this.covered.legs = true;
				this.covered.crotch = true;
				break;
			case "gloves":
				this.covered.hands = true;
				break;
			case "scarf":
				this.covered.neck = true;
				break;
			case "underwear":
				this.covered.crotch = true;
				break;
			case "hat":
				this.covered.head = true;
				break;
			case "socks":
				this.covered.feet = true;
				break;
			case "shoes":
				this.covered.feet = true;
				break;
			case "onesie":
				this.covered.head = true;
				this.covered.ears = true;
				this.covered.neck = true;
				this.covered.arms = true;
				this.covered.hands = true;
				this.covered.torso = true;
				this.covered.crotch = true;
				this.covered.legs = true;
				this.covered.feet = true;
				break;
			case "overalls":
				this.covered.torso = true;
				this.covered.crotch = true;
				this.covered.legs = true;
				break;
			case "thighhighs":
				this.covered.legs = true;
				this.covered.feet = true;
				break;
			case "mask":
				this.covered.face = true;
				break;
			case "earmuffs":
				this.covered.ears = true;
				break;
		}

		this.armor = 0;
		this.directActions["onWear"] = function(self, player){
			return {interrupt:false,print:""};
		};
		this.directActions["onRemove"] = function(self, player){
			return {interrupt:false,print:""};
		};
	}
}

Wearable.wearableTypeSynonym = function(type){
	switch(type.toLowerCase().replace(" ","")){
		case "t-shirt":
		case "jacket":
		case "jumper":
		case "cardigan":
		case "windbreaker":
		case "windcheater":
		case "shirt":
		case "undershirt":
		case "wifebeater":
		case "singlet":
		case "croptop":
		case "tubetop":
			return "shirt";
		case "bra":
		case "sportsbra":
			return "bra";
		case "headphones":
		case "earmuffs":
		case "hearingprotection":
			return "earmuffs";
		case "mask":
			return "mask";
		case "helmet":
		case "beanie":
		case "cap":
		case "crown":
		case "tiara":
		case "skullcap":
		case "hat":
			return "hat";
		case "gloves":
		case "gauntlets":
			return "gloves";
		case "underwear":
		case "panties":
		case "undies":
		case "underpants":
			return "underwear";
		case "socks":
			return "socks";
		case "boots":
		case "sneakers":
		case "highheels":
		case "runners":
		case "trainers":
		case "footwear":
		case "shoes":
			return "shoes";
		case "weddingring":
		case "engagementring":
		case "powerring":
			return "ring";
		case "necklace":
		case "amulet":
		case "locket":
			return "necklace";
		case "onesie":
			return "onesie";
		case "overalls":
			return "overalls";
		case "thighhighs":
			return "thighhighs";
		case "pants":
		case "cargopants":
		case "shorts":
		case "shortshorts":
		case "trousers":
			return "pants";
	}
};
