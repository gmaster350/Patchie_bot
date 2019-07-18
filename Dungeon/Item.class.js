class Item extends Actionable {
	constructor(name, description){
		super();
		this.name = name;
		this.description = description;

		this.directActions["onEquip"] = function(self, player){
			return {interrupt:false,print:""};
		};
		this.directActions["onUnequip"] = function(self, player){
			return {interrupt:false,print:""};
		};

		if(description === "") this.description = name;
	}

	describe(){
		return this.description;
	}
}
