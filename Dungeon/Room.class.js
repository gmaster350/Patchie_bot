class Room extends Actionable {
	constructor(name, description = name){
		super();
		this.name = name;
		this.description = description;
		this.rooms = [];
		this.directions = {};
		this.items = [];
		this.characters = [];
		this.containers = [];
		this.property = {};

		this.directActions["onEnter"] = function(self, player){
			return {interrupt:false,print:""};
		};
		this.directActions["onExit"] = function(self, player){
			return {interrupt:false,print:""};
		};

		Room.instances[this.name] = this;
	}

	addRoom(name,direction=null,oneway=false,intermediateSteps=0,intermediateName="path",encounterChance=0.1){
		if(intermediateSteps > 0 && ["north","south","east","west","up","down","in","out","backwards","forwards"].every(d => d !== direction)) return null;
		var lastRoom = this;
		for(let i = 0; i < intermediateSteps; i++){
			let newLastRoom = new Room(intermediateName);
			newLastRoom.property.encounterChance = encounterChance;
			newLastRoom.directActions["onEnter"] = function(player){
				if(Math.random() < player.currentRoom.property.encounterChance){

				}
				var encounter = NPC.newEncounter();
				return {interrupt:false, print:""};
			};
			lastRoom.directions[direction] = newLastRoom;
			switch(direction){
				case "north":
					newLastRoom.directions["south"] = lastRoom;
					break;
				case "south":
					newLastRoom.directions["north"] = lastRoom;
					break;
				case "east":
					newLastRoom.directions["east"] = lastRoom;
					break;
				case "west":
					newLastRoom.directions["west"] = lastRoom;
					break;
				case "up":
					newLastRoom.directions["down"] = lastRoom;
					break;
				case "down":
					newLastRoom.directions["up"] = lastRoom;
					break;
				case "in":
					newLastRoom.directions["out"] = lastRoom;
					break;
				case "out":
					newLastRoom.directions["in"] = lastRoom;
					break;
				case "backwards":
					newLastRoom.directions["forwards"] = lastRoom;
					break;
				case "forwards":
					newLastRoom.directions["backwards"] = lastRoom;
					break;
			}

		}
		if(name.constructor === Room){
			this.rooms.push(name);
			if(!oneway)
				name.rooms.push(this);
		}
		else if(name.constructor === String){
			var room = new Room(name);
			this.rooms.push(room);
			if(!oneway)
				room.rooms.push(this);
			return room;
		}
	}


	addContainer(name, description){
		var container = new RoomContainer(name, description);
		this.containers.push(container);
		return container;
	}

	inRoom(pick = null){
		var list = [...this.containers, ...this.items, ...this.characters];
		if(pick === null){
			let listString = "";
			list.forEach((r,i) => {
				listString += r.name;
				if(i === list.length - 2) listString += " and ";
				else if(list.length > 1) listString += ", ";
			});
			return listString;
		}
		else{
			var ret = null;
			list.some(r => {
				if(r.name == pick){
					ret = r;
					return true;
				}
				return false;
			});
			return ret;
		}
	}

	addCharacter(char){
		char.currentRoom = this;
		this.characters.push(char);
	}

	leave(char){
		this.characters.some((c,i) => {
			if(c === char){
				this.characters.pop(i);
				return true;
			}
			return false;
		});
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

Room.instances = {};
