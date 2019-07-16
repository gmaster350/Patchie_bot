class NPC extends Character {
	constructor(name, description, gender){
		super(name, description, gender);
		this.dialogue = [];
		this.dialogueState = null;
		this.dialogueStates = {
			null: "Oh hey, what's up?"
		};
	}

	addDialogue(option, reply, conditions=[], actions=[]){
		var newDialogue = new Dialogue(option, reply);
		if(conditions.constructor !== Array) conditions = [conditions];
		if(actions.constructor !== Array) actions = [actions];

		conditions.forEach(c => newDialogue.conditions.push(c));
		actions.forEach(a => newDialogue.actions.push(a));

		this.dialogue.push(newDialogue);
	}

	addDialogueState(stateName, defaultText){
		this.dialogueStates[stateName] = defaultText;
	}

	speakTo(player, pick = null, initial = false){
		var options = [];
		this.dialogue.forEach(d => {
			if(d.available(this, player)){
				options.push(d);
			}
		});

		if(pick === null){
			var optString = "";
			if(initial) optString += this.name + ": " + this.dialogueStates[this.dialogueState] + "<br><br>";
			optString += "<br>[-1] leave conversation";
			options.forEach((o,i) => optString += "<br>["+i+"] " + o.option);
			return optString;
		}
		else if(Number(pick) === NaN || Number(pick) < 0 || Number(pick) >= options.length){
			return "Invalid option";
		}
		else {
			return this.name + ": " + options[Number(pick)].pick(this, player);
		}
	}

	describe(){
		var clothingDescriptor = "";
		var a = this.wearing.some(w => w.type == "shirt");
		var b = this.wearing.some(w => w.type == "pants");
		var c = this.wearing.some(w => w.type == "footwear");

		if(a){
			if(b){
				if(c){
					clothingDescriptor += "before you, wearing ";
					this.wearing.forEach((w,i) => {
						clothingDescriptor += w.describe();
						if(i === this.wearing.length - 2) clothingDescriptor += " and ";
						else if(this.wearing.length > 1) clothingDescriptor += ", ";
					});
				}
				else{
					clothingDescriptor + "barefoot in ";
					this.wearing.forEach((w,i) => {
						clothingDescriptor += w.describe();
						if(i === this.wearing.length - 2) clothingDescriptor += " and ";
						else if(this.wearing.length > 1) clothingDescriptor += ", ";
					});
				}
			}
			else{
				if(c){
					clothingDescriptor + "pantsless in ";
					this.wearing.forEach((w,i) => {
						clothingDescriptor += w.describe();
						if(i === this.wearing.length - 2) clothingDescriptor += " and ";
						else if(this.wearing.length > 1) clothingDescriptor += ", ";
					});
				}
				else{
					clothingDescriptor + "wearing only ";
					this.wearing.forEach((w,i) => {
						if(w.type == "shirt"){
							clothingDescriptor += w.describe();
							if(i === this.wearing.length - 2) clothingDescriptor += " and ";
							else if(this.wearing.length > 1) clothingDescriptor += ", ";
						}
					});
				}
			}
		}
		else{
			if(b){
				if(c){
					clothingDescriptor + "topless in ";
					this.wearing.forEach((w,i) => {
						clothingDescriptor += w.describe();
						if(i === this.wearing.length - 2) clothingDescriptor += " and ";
						else if(this.wearing.length > 1) clothingDescriptor += ", ";

					});
				}
				else{
					clothingDescriptor + "topless and barefoot in ";
					this.wearing.forEach((w,i) => {
						clothingDescriptor += w.describe();
						if(i === this.wearing.length - 2) clothingDescriptor += " and ";
						else if(this.wearing.length > 1) clothingDescriptor += ", ";
					});
				}
			}
			else{
				if(c){
					clothingDescriptor + "naked, wearing only";
					this.wearing.forEach((w,i) => {
						if(w.type == "footwear"){
							clothingDescriptor += w.describe();
							if(i === this.wearing.length - 2) clothingDescriptor += " and ";
							else if(this.wearing.length > 1) clothingDescriptor += ", ";
						}
					});
				}
				else{
					clothingDescriptor += "naked";
				}
			}
		}

		return this.name + " is " + this.description + "<br>" + (this.gender.toLowerCase().startsWith("f") ? "She" : "He") + " stands " + clothingDescriptor;
	}

	give(player, itemName){
		var item = null;
		if(this.items.some((i,index) => {
			if(i.name == itemName){
				return true;
				item = i;
				this.items.pop(index);
			}
			return false;
		})){
			player.items.push(item);
			return true;
		}
		else{
			return false;
		}
	}
}
