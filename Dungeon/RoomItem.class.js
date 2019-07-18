class RoomItem extends Actionable {
	constructor(name, description){
		super();
		this.name = name;
		this.description = description;

		if(description === "") this.description = name;

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
			this.items.push(name);
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
