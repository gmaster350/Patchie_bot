class Character {
	constructor(name, description, gender){
		this.name = name;
		this.description = description;
		this.gender = gender;
		this.items = [];
		this.health = 100;
		this.wearing = [];
		this.currentRoom = null;
		this.activeContainer = null;

		this.dex = 10;
		this.str = 10;
		this.wis = 10;
		this.cha = 10;
		this.con = 10;
		this.int = 10;

		this.class = "";
		this.race = "";
		this.quadruped = false;
		this.furred = false;
		this.scaled = false;

		this.height = 1.8;
		this.hunger = 100;

		this.wearing.push(new Item("shirt","plain shirt","shirt"));
		this.wearing.push(new Item("pants","plain pants","pants"));
		this.wearing.push(new Item("shoes","plain shoes","footwear"));

		Character.instances[this.name] = this;
	}

	getInventoryItem(itemName){
		var item = null;
		this.items.some(characterItem => {
		   	if(characterItem.name = itemName){
			   	item = characterItem;
			   	return true;
		   	}
		   	return false;
	   	});
		return item;
	}

	getRoom(roomName){
		var room = null;
		this.currentRoom.some(otherRoom => {
			if(otherRoom.name === roomName){
				room = otherRoom;
				return true;
			}
			return false;
		});
		return room;
	}

	getRoomItem(itemName){
		var item = null;
		this.currentRoom.items.some(currentRoom => {
			if(currentRoom.name = itemName){
				item = currentRoom;
				return true;
			}
			return false;
		});
		return item;
	}

	getContainerItem(itemName){
		var item = null;
		this.activeContainer.items.some(containerItem => {
			if(containerItem.name = itemName){
				item = containerItem;
				return true;
			}
			return false;
		});
		return item;
	}

	getAnyItem(itemName,inventoryFirst=true){
		var item = null;

		if(inventoryFirst){
			item = this.getInventoryItem(itemName);
			if(item === null) item = this.getContainerItem(itemName);
			if(item === null) item = this.getRoomItem(itemName);
		}
		else{
			item = this.getContainerItem(itemName);
			if(item === null) item = this.getRoomItem(itemName);
			if(item === null) item = this.getInventoryItem(itemName);
		}

		return item;
	}

	getWearing(wearingName){
		var wearing = null;

		this.wearing.some(thisWearing => {
			if(thisWearing.name === wearingName){
				wearing = thisWearing;
				return true;
			}
			return false;
		});

		return wearing;
	}

	getCharacter(characterName){
		var character = null;

		this.currentRoom.containers.some(roomCharacter => {
			if(roomCharacter.name === characterName){
				character = roomCharacter;
				return true;
			}
			return false;
		});

		return character;
	}

	getContainer(containerName){
		var container = null;

		this.currentRoom.containers.some(roomContainer => {
			if(roomContainer.name === containerName){
				container = roomContainer;
				return true;
			}
			return false;
		});

		return container;
	}

	getAny(name){
		var thing = null;

		thing = this.getAnyItem(name);
		if(thing === null) thing = this.getContainer(name);
		if(thing === null) thing = this.getWearing(name);
		if(thing === null) thing = this.getCharacter(name);

		return thing;
	}

	isCovered(area = null){
		if(area === null){
			return {
				face: this.wearing.some(w => w.covered.face),
				neck: this.wearing.some(w => w.covered.neck),
				ears: this.wearing.some(w => w.covered.ears),
				head: this.wearing.some(w => w.covered.head),
				torso: this.wearing.some(w => w.covered.torso),
				arms: this.wearing.some(w => w.covered.arms),
				hands: this.wearing.some(w => w.covered.hands),
				crotch: this.wearing.some(w => w.covered.crotch),
				legs: this.wearing.some(w => w.covered.legs),
				feet: this.wearing.some(w => w.covered.feet)
			};
		}
		else{
			return this.wearing.some(w => w.covered.area);
		}
	}

	action(action){
		var flag = true;
		var s = action.split(" ");
		if(s.length > 2 && s[s.length - 2] == "as"){
			var alias = s[s.length - 1];
			if(Object.keys(Character.instances).every(k => k !== alias)) return "No characters by that name";
			else return Character.instances[alias].action(s.slice(0,s.length-2).join(" "));
		}
		else if(action.match(/^look around$/g) !== null) return this.lookAround();
		else if (action.match(/^look at \w+$/g) !== null) return this.lookAt(action.replace(/^look at (\w+)$/g,"$1"));
		else if (action.match(/^open \w+$/g) !== null) return this.open(action.replace(/^open (\w+)$/g,"$1"));
		else if (action.match(/^speak to \w+$/g) !== null) return this.speakTo(action.replace(/^speak to (\w+)$/g,"$1"));
		else if(action.match(/^go to \w+$/g) !== null) return this.goTo(action.replace(/^go to (\w+)$/g,"$1"));
		else if(action.match(/^say \d+$/g) !== null) return this.say(action.replace(/^say (\d+)$/g,"$1"));
		else if(action.match(/^close$/g) !== null) return this.close();
		else if(action.match(/^take \w+$/g) !== null) return this.take(action.replace(/^take (\w+)$/g,"$1"));
		else if(action.match(/^switch to \w+$/g) !== null)return this.switchTo(action.replace(/^switch to (\w+)$/g,"$1"));
		else if(action.match(/^remove \w+$/g) !== null) return this.remove(action.replace(/^remove (\w+)$/,"$1"));
		else if(action.match(/^wear \w+$/g) !== null) return this.wear(action.replace(/^wear (\w+)$/,"$1"));
		else if(action.match(/^use \w+ on \w+$/g) !== null) return this.use(action.replace(/^use (\w+) on (\w+)$/g,"$1"), action.replace(/^use (\w+) on (\w+)$/g,"$2"));
		else if(action.match(/^use \w+$/g) return this.use(action.replace(/^use (\w+)$/g,"$1"));
		else if(Actionable.verbs.some(a => action.startsWith(a))){
			var itemName = action.split(" ").slice(1).join(" ");
			var verb = action.split(" ")[0];
			return this.verb(itemName, verb);
		}
		else{
			flag = false;
			return "Unknown action";
		}

		if(flag){

		}
	}

	lookAround(){
		var ind = this.indirect("lookAround");
		if(ind.interrupt) return ind;

		var str = "You are standing in " + this.currentRoom.name + "<br>" + this.currentRoom.description;

		if(this.currentRoom.rooms.length > 0){
			str += ".<br><br> You can see paths to "
			this.currentRoom.rooms.forEach((r,i) => {
				str += r.name;
				if(i === this.currentRoom.rooms.length - 2) str += " and ";
				else if(this.currentRoom.rooms.length > 1) str += ", ";
			});
		}

		if(this.currentRoom.containers.length > 0) str += ".<br> You can open ";
		this.currentRoom.containers.forEach((r,i) => {
			str += r.name;
			if(i === this.currentRoom.containers.length - 2) str += " and ";
			else if(this.currentRoom.containers.length > 1) str += ", ";
		});

		if(this.currentRoom.items.length > 0) str += ".<br> You can pick up ";
		this.currentRoom.items.forEach((r,i) => {
			str += r.name;
			if(i === this.currentRoom.items.length - 2) str += " and ";
			else if(this.currentRoom.items.length > 1) str += ", ";
		});

		if(this.currentRoom.characters.length > 1) {str += "<br> You can speak to ";
			var chars = this.currentRoom.characters.map(c => c.name == this.name ? null : c.name).filter(c => c !== null);
			str += chars.slice(0,chars.length-1).join(", ") + " and " + chars[chars.length-1];
		}

		str += ".";
		return str;
	}

	lookAt(thing){
		var ind = this.indirect("lookAt");
		if(ind.interrupt) return ind;

		return this.getAny(thing).describe();
	}

	leaveConversation(){
		var ind = this.indirect("leaveConversation");
		if(ind.interrupt) return ind;

		this.activeNpc = null;
	}

	open(containerName){
		var ind = this.indirect("open");
		if(ind.interrupt) return ind;

		return this.getContainer(containerName).contents();
	}

	speakTo(npcName){
		var ind = this.indirect("speakTo");
		if(ind.interrupt) return ind;

		if(npcName == this.name) return "You cannot speak to yourself";
		var npc = this.getCharacter(npcName);

		if(npc === null) return "Could not find anyone named '"+npcName+"'";
		if(npc.constructor !== NPC) return "("+npcName+" has no dialogue)";

		this.activeNpc = this.getCharacter(npcName);
		return this.activeNpc.speakTo(this,null,true);
	}

	goTo(roomName, force=false){
		var ind = this.indirect("goTo");
		if(ind.interrupt) return ind;

		var newRoom = null;
		if(force){
			if(roomName in Room.instances){
				newRoom = Room.instances[roomName];
			}
			else{
				return "No such room '"+roomName+"'";
			}
		}
		else{
			this.currentRoom.leave(this);
			newRoom = this.getRoom(roomName);
		}
		if(newRoom !== null){
			var onExit = this.currentRoom.onExit(this);
			this.currentRoom = newRoom;
			this.currentRoom.characters.push(this);
			var onEnter = this.currentRoom.onEnter(this);

			var str = "";
			str += onExit === "" ? "" : onExit + "<br>";
			str += "Moved to room " + newRoom.name;
			str += onEnter === "" ? "" : "<br>" + onEnter;
			return str;
		}
		else{
			return "Cannot see any rooms by that name";
		}
	}

	say(said){
		var ind = this.indirect("say");
		if(ind.interrupt) return ind;

		if(this.activeNpc === null){
			return "You are not speaking to anyone";
		}
		if(said == "-1"){
			var oldName = this.activeNpc.name;
			this.activeNpc = null;
			return "No longer speaking to " + oldName;
		}
		var a = this.activeNpc.speakTo(this, said);
		if(this.activeNpc !== null) a += "<br><br>" + this.activeNpc.speakTo(this);
		return a;
	}

	close(){
		var ind = this.indirect("close");
		if(ind.interrupt) return ind;

		if(this.activeContainer === null){
			return "Nothing was open";
		}
		var oldContainerName = this.activeContainer.name;
		this.activeContainer = null;
		return "Closed " + oldContainerName;
	}

	take(itemName){
		var ind = this.indirect("take");
		if(ind.interrupt) return ind;

		if(this.activeContainer === null){
			var item = null;
			if(this.currentRoom.items.some(i => {
				if(i.name == itemName){
					item = i;
					return true;
				}
				return false;
			})){
				this.items.push(item);
				return "Took " + item.name;
			}
			else{
				return "Could not find item '"+itemName+"'";
			}
		}
		else{
			if(this.activeContainer.takeItem(this,itemName)){
				return "Took " + itemName + " from " + this.activeContainer.name;
			}
			else{
				return "Could not find item '" + itemName + "' in " + this.activeContainer.name;
			}
		}
	}

	switchTo(npcName){
		var ind = this.indirect("switchTo");
		if(ind.interrupt) return ind;

		if(Object.keys(Character.instances).every(k => k !== npcName)) return "No characters by that name";
		else{
			var char = Character.instances[npcName];
			if(char.constructor !== NPC) {
				player = char;
				return "Now playing as " + player.name;
			}
			else{
				return "You cannot play as an NPC";
			}
		}
	}

	remove(wearName){
		var ind = this.indirect("remove");
		if(ind.interrupt) return ind;

		var wear = null;
		if(this.wearing.some((w,i) => {
			if(w.name == wearName){
				this.wearing.pop(i);
				wear = w;
				return true;
			}
			return false;
		})){
			var onRemove = wear.onRemove(this);
			this.items.push(wear);
			return (onRemove ? onRemove + "<br>" : "") +  "Removed " + wearName;
		}
		else{
			return "Not wearing anything named '"+wearName+"'";
		}
	}

	wear(wearName){
		var ind = this.indirect("wear");
		if(ind.interrupt) return ind;

		var wear = null;
		if(this.items.some((w,i) => {
			if(w.name == wearName){
				this.items.pop(i);
				wear = w;
				return true;
			}
			return false;
		})){
			if(wear.constructor !== Wearable){
				return "Item '"+wearName+"' cannot be worn.";
			}
			this.wearing.push(wear);
			var onWear = wear.onWear(this);
			return (onWear ? onWear + "<br>" : "") +  "Now wearing " + wearName;
		}
		else{
			return "Not wearing anything named '"+wearName+"'";
		}
	}

	use(objectOneName, objectTwoName = null){
		if(objectTwoName === null){
			var obj = null;

			if(this.items.some(item => {
				if(item.name == objectOneName){
					obj = item;
					return true;
				}
				return false;
			}) || this.activeContainer.items.some(item => {
				if(item.name == objectOneName){
					obj = item;
					return true;
				}
				return false;
			}) || this.currentRoom.items.some(item => {
				if(item.name == objectOneName){
					obj = item;
					return true;
				}
				return false;
			})){
				return obj.use(this);
			}
			else{
				return "Could not find item named '"+objectOneName+"'";
			}
		}
		else{
			var objOne = null;
			var objTwo = null;

			if(this.items.some(item => {
				if(item.name == objectOneName){
					objOne = item;
					return true;
				}
				return false;
			}) || this.activeContainer.items.some(item => {
				if(item.name == objectOneName){
					objOne = item;
					return true;
				}
				return false;
			}) || this.currentRoom.items.some(item => {
				if(item.name == objectOneName){
					objOne = item;
					return true;
				}
				return false;
			})){
				if(this.items.some(item => {
					if(item.name == objectTwoName){
						objTwo = item;
						return true;
					}
					return false;
				}) || this.activeContainer.items.some(item => {
					if(item.name == objectTwoName){
						objTwo = item;
						return true;
					}
					return false;
				}) || this.currentRoom.items.some(item => {
					if(item.name == objectTwoName){
						objTwo = item;
						return true;
					}
					return false;
				})){
					return objOne.use(this,objTwo);
				}
				else{
					return "Could not find item named '"+objectTwoName+"'";
				}
			}
			else{
				return "Could not find item named '"+objectOneName+"'";
			}
		}
	}

	verb(itemName, verb){
		var item = null;
		if(this.items.some(i => {
			if(i.name == itemName){
				item = i;
				return true;
			}
			return false;
		})){
			return item.interact(verb,this);
		}
		else{
			return "You have no items by that name";
		}
	}

	hasItem(itemName, type){
		return this.items.some(item => ((itemName === null) && (type == item.type)) || ((type === null) && (item.name == itemName)) || ((item.name == itemName) && (item.type == type)));
	}

	isWearing(itemName, type){
		return this.wearing.some(item => ((itemName === null) && (type == item.type)) || ((type === null) && (item.name == itemName)) || ((item.name == itemName) && (item.type == type)));
	}

	give(npc, itemName){
		var ind = this.indirect("give");
		if(ind.interrupt) return ind;

		var item = null;
		if(this.items.some((i,index) => {
			if(i.name == itemName){
				return true;
				item = i;
				this.items.pop(index);
			}
			return false;
		})){
			npc.items.push(item);
			return true;
		}
		else{
			return false;
		}
	}

	indirect(action){
		var str = "";
		var flag = false;

		this.items.forEach(item => {
			var res = item.indirectAction[action];
			if(res.print) str += "<br>" + res.print;
			if(res.interrupt) flag = true;
		});
		this.currentRooom.items.forEach(item => {
			var res = item.indirectAction[action];
			if(res.print) str += "<br>" + res.print;
			if(res.interrupt) flag = true;
		});
		if(this.activeContainer !== null){
			this.activeContainer.items.forEach(item => {
				var res = item.indirectAction[action];
				if(res.print) str += "<br>" + res.print;
				if(res.interrupt) flag = true;
			});
		}

		return {
			interrupt: flag,
			print: str
		};
	}
}

Character.instances = {};
