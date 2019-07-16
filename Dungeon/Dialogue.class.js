class Dialogue {
	constructor(option, reply){
		this.option = option;
		this.reply = reply;
		this.conditions = [];
		this.actions = [];
	}

	addCondition(func){
		this.conditions.push(func);
	}

	addAction(func){
		this.actions.push(func);
	}

	pick(npc, player){
		this.actions.forEach(a => a(npc, player));
		return this.reply.replace("%name%",player.name);
	}

	available(npc, player){
		return this.conditions.every(condition => {
			return condition(npc, player);
		});
	}
}
