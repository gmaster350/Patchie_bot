class Item extends Actionable {
	constructor(name, description, equippable = true, divisible = false, container = false){
		this.name = name;
		this.description = description;
		this.type = type;

		this.isEquippable = equippable;
		this.isDivisible = divisible;
		this.isContainer = container;

		this.whileEquipped = function(player){};
		this.onEquip = function(player){};
		this.onUnequip = function(player){};

		if(description === "") this.description = name;
	}

	describe(){
		return this.description;
	}

	use(player, other){
		this.action["use"](player, other);
	}
}
