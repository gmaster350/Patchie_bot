class Room {
	constructor(name, description = ""){
		this.name = name;
		this.description = description;
		this.rooms = [];
		this.items = [];
		this.characters = [];
		this.containers = [];

		this.onEnter = function(player){
			return "";
		};
		this.onExit = function(player){
			return "";
		};

		Room.instances[this.name] = this;
	}

	setOnEnter(callback){
		this.onEnter = callback;
		return this;
	}

	setOnExit(callback){
		this.onExit = callback;
		return this;
	}

	addRoom(name,oneway=false){
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
		var container = new Container(name, description);
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
}

Room.instances = {};
