class Container {
	constructor(name, description){
		this.name = name;
		this.description = description;
		this.items = [];

		this.onOpen = function(player){
			return [true, ""];
		};

		this.onClose = function(player){
			return [true, ""];
		};
	}

	setOnOpen(callback){
		this.onOpen = callback;
		return this;
	}

	setOnClose(callback){
		this.onClose = callback;
		return this;
	}

	describe(){
		return this.description;
	}

	contents(){
		var itemNames = [];
		this.items.forEach(item => {
			itemNames.push(item.name);
		});
		return this.name + " contains: <br>" + itemNames.join("<br>");
	}

	add(name, description, type = ""){
		if(typeof name !== "string"){
			container.push(name);
			return name;
		}
		var item = new Item(name, description, type);
		this.items.push(item);
		return item;
	}

	takeItem(player,itemName){
		for(let i = 0; i < this.items.length; i++){
			if(this.items[i].name = itemName){
				player.items.push(this.items[i]);
				this.items.splice(i,1);
				return true;
			}
		}
		return false;
	}
}
