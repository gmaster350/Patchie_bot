//roleplaying module

const mysql = require(./mysql);
const oh = require(./objectHelper);

var users = {}; // { discord_user_id : { character_hash : Character } }
var items = {}; // { discord_user_id : { character_hash
var tempchars = {};

function hash(callback){
	var h = "";
	while (len(h) < 16){
		h += ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"][Math.floor(Math.random()*16)];
	}
	return h;
}

class Character{
	constructor(ownerid,name,hash,i){
		this.ownerid = ownerid;
		this.name = name;

		this.hash = hash ? hash : hash();
		this.species = hash ? i.species : undefined;
		this.health = hash ? i.health : 10000;
		this.stamina = hash ? i.stamina : undefined;
		this.mana = hash ? i.mana : undefined;
		this.height = hash ? i.height : undefined;
		this.mass = hash ? i.mass : undefined;
		
		this.wearing = [];
		this.inventory = [];
		this.leftHand = [];
		this.rightHand = [];
	}
}

class Item{
	constructor(name,hash,i){
		this.name = name;
		this.hash = hash ? hash : hash();
		this.type = hash ? i.type : String(this.constructor).split(" ")[1];
		this.weight = hash ? i.weight : 1;
		this.ownerid = hash ? i.ownerid : null;
		this.ownerHash = hash ? i.ownerhash : null;
		this.extra = hash ? i.extra : {}; //properties of subclass instances must be stored as 'extra' variables.
	}
}

class Clothing extends Item{
	constructor(name,hash,i){
		super(name,hash,i);
		//anklet
		//belt
		//bracelet
		//footwear
		//gloves
		//hat
		//necklace
		//pants
		//ring
		//shirt
		if(!hash){
			this.extra.type = type;
			this.extra.armor = 0;
		}
	}
}

// Rebuild Characters from database
var reconstructCharacters = new Promise(res,rej){
	mysql.query("SELECT * FROM Characters",function(result){
		result.forEach(function(row){
			
			// Add ownerid as key to var users if it doesn't exist already
			if(!oh.hasKey(users,row.ownerid))
				users[row.ownerid] = {};
			
			// Add character to var users, at key of owner's id.
			users[row.ownerid][row.hash] = new Character(row.userid,row.name,row.hash,row);
		});
		res();
	});
}

// Reconstruct Items from database
var reconstructItems = new Promise(res,rej){
	mysql.query("SELECT * FROM Items",function(result){
		result.forEach(function(item){
			if(!oh.hasKey(items,item.ownerid))
				items[item.ownerid] = {};
			var ex = JSON.parse(item.extra);
			var newItem = eval("new "+item.type+"(item.name, item.hash, ex)");
			items[item.ownerid][item.charhash] = newItem;
		});
	});
	res();
}

// After rebuilding characters and items, add all items to the inventory or hand of the relevant character.
reconstructCharacters.then(function(){
	reconstructItems.then(function(){
		oh.forEach(items,function(charlist,ownerid){
			oh.forEach(charlist,function(item,charhash){
				switch(item.place){
					case "LEFT_HAND":
						characters[charhash].leftHand.push(item);
						break;
					case "RIGHT_HAND":
						characters[charhash].rightHand.push(item);
						break;
					case "WEARING":
						characters[charhash].wearing.push(item);
						break;
					case "INVENTORY":
						characters[charhash].inventory.push(item);
						break;
				}
			});
		});
	});
})

function updateRoleplayTable(user){
	var sql = "UPDATE Roleplay SET "+" WHERE userid = "+user.id;
	mysql.query(sql);
}

function updateItemTable(item){
	var sql = "UPDATE Items SET name = \""+item.name+"\", hash = \""+item.hash+"\", ownerid = \""+item.ownerid+"\", extras = \""+JSON.stringify(item.extra)+"\"";
	mysql.query(sql);
}

function createCharacter(message,callback){
	var parameters = message.content.split(" ");
	var userid = message.author.id;
	var name = parameters[1];
	tempchars[userid] = new Character(userid,name);
}