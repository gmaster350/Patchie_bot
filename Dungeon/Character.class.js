class Character extends Actionable {
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
		this.weight = 80;
		this.hunger = 100;

		this.property = {};

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
		else if(action.match(/^look at \w+$/g) !== null) return this.lookAt(action.replace(/^look at (\w+)$/g,"$1"));
		else if(action.match(/^open \w+$/g) !== null) return this.open(action.replace(/^open (\w+)$/g,"$1"));
		else if(action.match(/^speak to \w+$/g) !== null) return this.speakTo(action.replace(/^speak to (\w+)$/g,"$1"));
		else if(action.match(/^go to \w+$/g) !== null) return this.goTo(action.replace(/^go to (\w+)$/g,"$1"));
		else if(action.match(/^say \d+$/g) !== null) return this.say(action.replace(/^say (\d+)$/g,"$1"));
		else if(action.match(/^close$/g) !== null) return this.close();
		else if(action.match(/^give (\w+) to (\w+)$/g) !== null) return this.close();
		else if(action.match(/^take \w+$/g) !== null) return this.take(action.replace(/^take (\w+)$/g,"$1"));
		else if(action.match(/^put (\w+) in (\w+)$/g) !== null) return this.put(action.replace(/^put (\w+) in (\w+)$/g,"$1"),action.replace(/^put (\w+) in (\w+)$/g,"$2"));
		else if(action.match(/^switch to \w+$/g) !== null)return this.switchTo(action.replace(/^switch to (\w+)$/g,"$1"));
		else if(action.match(/^remove \w+$/g) !== null) return this.remove(action.replace(/^remove (\w+)$/,"$1"));
		else if(action.match(/^wear \w+$/g) !== null) return this.wear(action.replace(/^wear (\w+)$/,"$1"));
		else if(action.match(/^use \w+ on \w+$/g) !== null) return this.use(action.replace(/^use (\w+) on (\w+)$/g,"$1"), action.replace(/^use (\w+) on (\w+)$/g,"$2"));
		else if(action.match(/^use \w+$/g)) return this.use(action.replace(/^use (\w+)$/g,"$1"));
		else if(action.match("/^(" + Actionable.verbs.join("|") + ") (\w+) ( with (\w+))?$/g")) {
			var anythingName;
			var itemName;
			var verb = action.replace("/^(" + Actionable.verbs.join("|") + ") (\w+) ( with (\w+))?$/g","$1");

			if(action.match("/^(" + Actionable.verbs.join("|") + ") (\w+) with (\w+)$/g")){
				anythingName = action.replace("/^(" + Actionable.verbs.join("|") + ") (\w+) with (\w+)$/","$3");
				itemName = action.replace("/^(" + Actionable.verbs.join("|") + ") (\w+) with (\w+)$/","$2");
			}
			else{
				anythingName = action.replace("/^(" + Actionable.verbs.join("|") + ") (\w+)$/","$2");
				itemName = null;
			}

			return this.verb(verb, anythingName, itemName);
		}
		else{
			flag = false;
			return "Unknown action";
		}

		if(flag){
			var ind = this.indirect("any");
			updatePlayerInfo();
			return ind.print;
		}
	}

	lookAround(){
		var ind = this.indirect("lookAround",this.currentRoom);
		if(ind.interrupt) return ind.print;

		var str = ind.print + "You are standing in " + this.currentRoom.name + "<br>" + this.currentRoom.description;

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
		var any = this.getAny(thing);

		var ind = this.indirect("lookAt",any);
		if(ind.interrupt) return ind.print;

		return ind.print + any.describe();
	}

	leaveConversation(){
		var ind = this.indirect("leaveConversation",this,this.activeNpc);
		if(ind.interrupt) return ind.print;

		var oldName = this.activeNpc.name;
		this.activeNpc = null;
		return ind.print + "You stopped speaking to " + oldName;
	}

	open(containerName){
		var container = this.getContainer(containerName);
		if(container === null) return ind.print + "No containers by that name exist";

		var ind = this.indirect("open",this,container);
		if(ind.interrupt) return ind.print;

		var onOpen = container.directAction("onOpen",this);

		this.activeContainer = container;
		return ind.print + container.contents();
	}

	speakTo(npcName){
		if(npcName == this.name) return ind.print + "You cannot speak to yourself";
		var npc = this.getCharacter(npcName);

		if(npc === null) return ind.print + "Could not find anyone named '"+npcName+"'";
		if(npc.constructor !== NPC) return ind.print + "("+npcName+" has no dialogue)";

		var ind = this.indirect("speakTo",this,npc);
		if(ind.interrupt) return ind.print;

		this.activeNpc = this.getCharacter(npcName);
		return ind.print + this.activeNpc.speakTo(this,null,true);
	}

	goTo(roomName, force=false){
		if(force){
			if(!(roomName in Room.instances))return "No such room '"+roomName+"'";
			var newRoom = Room.instances[roomName];
		}
		else{
			this.currentRoom.leave(this);
			var newRoom = this.getRoom(roomName);
		}

		if(newRoom === null) return ind.print + "Cannot see any rooms by that name";
		var oldRoom = this.currentRoom;

		this.currentRoom = newRoom;
		var onExit = this.currentRoom.directAction("onExit", oldRoom);

		var ind = this.indirect("goTo",this,oldRoom,newRoom);
		if(ind.interrupt) return ind.print;

		this.currentRoom.characters.push(this);
		var onEnter = this.currentRoom.directAction("onEnter", this);

		return ind.print + (onExit === "" ? "" : onExit + "<br>") + "Moved to room " + newRoom.name + (onEnter === "" ? "" : "<br>" + onEnter);
	}

	say(said){
		if(this.activeNpc === null){
			return "You are not speaking to anyone";
		}
		if(said == "-1"){
			var oldName = this.activeNpc.name;
			this.activeNpc = null;
			return "No longer speaking to " + oldName;
		}

		var ind = this.indirect("say", this, this.activeNpc);
		if(ind.interrupt) return ind.print;

		var a = this.activeNpc.speakTo(this, said);

		if(this.activeNpc !== null) a += "<br><br>" + this.activeNpc.speakTo(this);
		return ind.print + a;
	}

	close(){
		if(this.activeContainer === null) return "Nothing was open";
		var oldContainer = this.activeContainer;

		var ind = this.indirect("close", this, oldContainer);
		if(ind.interrupt) return ind.print;

		var onClose = this.activeContainer.directAction("onClose",this);
		if(onClose.interrupt) return onClose.print;

		this.activeContainer = null;

		return ind.print + onClose.print + "Closed " + oldContainer.Name;
	}

	// move item from container or room into inventory
	take(itemName){
		var ind = this.indirect("take",this);
		if(ind.interrupt) return ind.print;

		var item = null;
		if(this.activeContainer !== null){
			item = getContainerItem(itemName);
			if(item !== null){
				this.activeContainer.takeItem(this, itemName);
				return "Took " + itemName + " from " + this.activeContainer.name;
			}
		}

		item = getRoomItem(itemName);
		if(item !== null){
			this.currentRoom.takeItem(this, itemName);
			var onEquip = item.directAction("onEquip",player);
			return "Took " + itemName;
		}

		return ind.print + "Could not find item '"+itemName+"'";
	}

	// opposite of take; move item from inventory into container; (container does not need to be open, but does need to be openable by player)
	put(itemName, containerName){
		var item = this.getInventoryItem(itemName);
		if(item === null) return "Could not find item '"+itemName+"'";

		var container = this.getContainer(containerName);
		if(container === null) return "Could not find item '"+containerName+"'";

		var ind = this.indirect("put",this,item,container);
		if(ind.interrupt) return int.print;

		container.items.push(item);
		this.items.some((itm,index) => {
			if(itm === item){
				this.items.splice(index,1);
				return true;
			}
			return false;
		});

		var onUnequip = item.directAction("onUnequip",player);
		if(onUnequip.interrupt) return onUnequip.print;

		return onUnequip.print += "Put " + itemName + " into " + containerName;
	}

	// similar to put, but item is moved to room
	drop(itemName){
		var ind = this.indirect("put",this);
		if(ind.interrupt) return int.print;

		var item = this.getInventoryItem(itemName);
		if(item === null) return ind.print + "Could not find item '"+itemName+"'";

		this.currentRoom.takeItem(this, itemName);
		var onEquip = item.directAction("onEquip",player);
		return "Put " + itemName + " into " + containerName;
	}

	//change active player
	switchTo(npcName){
		if(Object.keys(Character.instances).every(k => k !== npcName)) return ind.print + "No characters by that name";
		else{
			var char = Character.instances[npcName];
			if(char.constructor !== NPC) {
				var ind = this.indirect("switchTo",this,char);
				if(ind.interrupt) return ind.print;

				player = char;
				return ind.print + "Now playing as " + player.name;
			}
			else{
				return ind.print + "You cannot play as an NPC";
			}
		}
	}

	remove(wearName){
		var wear = this.getWearing(wearName);
		if(wear === null) return "Not wearing anything named '"+wearName+"'";

		var ind = this.indirect("remove",this,wear);
		if(ind.interrupt) return ind.print;

		var onRemove = wear.directAction("onRemove",this);
		this.items.push(wear);
		return ind.print + (onRemove ? onRemove + "<br>" : "") +  "Removed " + wearName;
	}

	wear(wearName){
		var wear = this.getInventoryItem(wearName);
		if(wear === null) return "Could not find '"+wearName+"' in your inventory";
		if(wear.constructor !== Wearable) return "Item '"+wearName+"' cannot be worn.";

		var ind = this.indirect("wear",this,wear);
		if(ind.interrupt) return ind.print;

		this.wearing.push(wear);
		var onWear = wear.directAction("onWear", this);
		return ind.print + (onWear ? onWear + "<br>" : "") +  "Now wearing " + wearName;
	}

	use(objectOneName, objectTwoName = null){


		if(objectTwoName === null){
			var obj = this.getAnyItem(objectOneName);
			if(obj === null) return "Could not find item named '"+objectOneName+"'";

			var ind = this.indirect("use",this,obj);
			if(ind.interrupt) return ind.print;

			return obj.directAction("use",this);
		}
		else{
			var objOne = this.getAnyItem(objectOneName, true);
			var objTwo = this.getAnyItem(objectTwoName, true);

			if(objOne === null) return "Could not find item named '"+objectOneName+"'";
			if(objTwo === null) return "Could not find item named '"+objectTwoName+"'";

			var ind = this.indirect("use",this,objOne,objTwo);
			if(ind.interrupt) return ind.print;

			return objOne.directAction("use",this,objTwo);
		}
	}

	give(npcName, itemName){
		var item = this.getInventoryItem(itemName);
		var npc = this.getCharacter(npcName);

		if(npc === null || (npc.constructor !== Character && npc.constructor !== NPC)) return "Could not find anyone named '"+npcName.constructor === String ? : npcName : npcName.name+"'";

		var ind = this.indirect("give",this,any);
		if(ind.interrupt) return ind.print;

		this.items.some((itm,index) => {
			if(itm === item){
				this.items.splice(index,1);
				return true;
			}
			return false;
		});
		var onUnequip = item.directAction("onUnequip",this);

		npc.items.push(item);
		var onEquip = item.directAction("onEquip",npc);

		var onRecieve = npc.directAction("onReceive",this,item);

		return onUnequip.print + onEquip.print + onReceive.print + "Gave '"+itemName+"' to '"+npcName+"'";
	}

	verb(verb, name, itemName=null){
		var any = this.getAny(name);
		var item = this.getInventoryItem(itemName);
		if(any === null) return "Could not find anything named '"+name++"'";

		var ind = this.indirect(Actionable.verbSynonym(verb),this,any,item);
		if(ind.interrupt) return ind.print;

		var onVerb = item.directAction(Actionable.verbSynonym(verb),this,any,item);
		if(onVerb.interrupt) return onVerb.print;

		return onVerb.print;
	}

	hasItem(itemName){
		return this.getInventoryItem(itemName) !== null;
	}

	isWearing(itemName, wearingType){
		return this.wearing.some(item => ((itemName === null) && (type == item.type)) || ((type === null) && (item.name == itemName)) || ((item.name == itemName) && (item.type == type)));
	}


	indirect(action,a,b,c,d){
		var str = "";
		var flag = false;

		Actionable.globalActions[action].forEach(callback => {
			var res = callback(this,a,b,c,d);
			if(res.print) str += "<br>" + res.print;
			if(res.interrupt) flag = true;
		});

		this.items.forEach(item => {
			var res = item.indirectAction(action);
			if(res.print) str += "<br>" + res.print;
			if(res.interrupt) flag = true;
		});
		this.currentRoom.items.forEach(item => {
			var res = item.indirectAction(action);
			if(res.print) str += "<br>" + res.print;
			if(res.interrupt) flag = true;
		});
		if(this.activeContainer !== null){
			this.activeContainer.items.forEach(item => {
				var res = item.indirectAction(action);
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
