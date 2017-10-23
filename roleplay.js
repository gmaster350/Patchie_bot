//roleplaying module

const mysql = require(./mysql);
const oh = require(./objectHelper);
var users = {};
var items = {};

function hash(callback){
	var h = ;
	while (len(h) < 16){
		h += [0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f][Math.floor(Math.random()*16)];
		if(len(h) === 16){
			callback(h);
		}
	}
}

class Character{
	constructor(ownerid,name,hash){
		this.ownerid = ownerid;
		this.name = name;
		if(hash)
			this.hash = hash; //hash allows for unique idenftification
		else
			hash(function(h){this.hash=h;});
		
		this.species;
		this.health;
		this.stamina;
		this.mana;
		this.height;
		this.mass;
		this.density;
		
		this.wearing = [];
		this.inventory = [];
		this.leftHand = [];
		this.rightHand = [];
	}
}

class Item{
	constructor(name,hash){
		this.name = name;
		this.hash = (hash) ? hash : hash(function(h){return h});
		this.type = String(this.constructor).split(" ")[1]
		this.weight = 1;
		this.ownerId = null;
		this.ownerHash = null;
		this.extra = {}; //properties of subclass instances must be stored as extra variables.
	}
}

class Clothing extends Item{
	constructor(name,hash){
		super(name,hash);
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
		this.extra.type = type;
		this.extra.armor = 0;
	}
}

//rebuild characters from database when rebooting
function reconstructCharacters(){
	mysql.query("SELECT * FROM Characters",function(result){
		result.forEach(function(row){
			if(!oh.hasKey(users,row.ownerId)) 
				users[row.ownerId] = {};
			users[row.ownerId][row.hash] = new Character(row.userid,row.name,row.hash);
			var chr = users[row.ownerId][row.hash];
			
			chr.species = row.species;
			chr.health = row.health;
			chr.stamina = row.stamina;
			chr.mana = row.mana;
			chr.height = row.height;
			chr.mass = row.mass;
			chr.density = row.density;
		});
	});
	reconstructItems(function(){
		oh.forEach(items,function(value,key){
			
		});
	});
}

function reconstructItems(callback){
	mysql.query("SELECT * FROM Items",function(result){
		result.forEach(function(item){
			if(!oh.hasKey(items,item.ownerId))
				items[item.ownerId] = {};
			
			switch(item.type){
				case "Item":
					items[item.ownerId][item.ownerHash] = new Item(item.name, item.hash);
					break;
				case "Clothing":
					items[item.ownerId][item.ownerHash] = new Clothing(item.name, item.hash);
					break;
			}
			
			var itm = items[item.ownerId][item.ownerHash];
			
			itm.ownerId = item.ownerId;
			itm.ownerHash = item.ownerHash;
			itm.weight = item.weight;
			itm.extra = JSON.parse(item.extra);
		});
	});
	callback();
}

function updateRoleplayTable(user){
	var sql = "UPDATE Roleplay SET "+" WHERE userid = "+user.id;
	mysql.query(sql);
}

function updateItemTable(item){
	var sql = "UPDATE Items SET name = \""+item.name+"\", hash = \""+item.hash+"\", ownerId = \""+item.ownerId+"\", extras = \""+JSON.stringify(item.extra)+"\"";
	mysql.query(sql);
}

function createCharacter(){
	// You have not specified all features, what would you like to do for the remaining features?
	//    `random` -> set the remaining features to a random value
	//    `zero`   -> set the remaining features to zero, or the lowest value
	//    `ignore` -> leave the remaining features as undefined
}