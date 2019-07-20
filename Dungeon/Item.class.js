class Item extends Actionable {
	constructor(name, description){
		super();
		this.name = name;
		this.description = description;
		this.weight = 1.0;
		this.throwable = true;

		this.directActions["onEquip"] = function(self, player){
			return {interrupt:false,print:""};
		};
		this.directActions["onUnequip"] = function(self, player){
			return {interrupt:false,print:""};
		};
		this.directActions["onThrow"] = function(self, player){
			return {interrupt:false,print:""};
		};

		if(description === "") this.description = name;
	}

	describe(){
		return this.description;
	}

	canThrow(player){
		if(!this.throwable) return false;
	}
}
