// Room setup //

var lockers = new Room("Locker Room");
var showers = new Room("Showers");
var portal_room = new Room("Portal Room");
var raceway = new Room("Raceway");
var dragonlands = new Room("Dragon Lands");
var saphiras_cave = new Room("Saphira's Cave");
var dracos_cave = new Room("Draco's Cave");
var dracos_stomach = new Room("Draco's Stomach","A horrid and humid sack, stinking of vomit, and filled with corrosive digestive enzymes. You are up to your waist in the wet and mushy broken down remains of Draco's previous meal. Some hard bony parts prod you as you shift in the muck<br>You ought to find a way out of here, before you're quickly digested alive.");

portal_room.addRoom(raceway);
portal_room.addRoom(dragonlands);
dragonlands.addRoom(saphiras_cave);
dragonlands.addRoom(dracos_cave);
raceway.addRoom(lockers);
lockers.addRoom(showers);

dracos_cave.setOnEnter(function(player){
	return player.speakTo("Draco");
});
dracos_stomach.setOnEnter(function(player){
	console.log("started being digested");
	var interval = window.setInterval(function(p,self){
		if(p.health > 0){
			p.health -= 0.1;
		}
		else{
			p.health = 0;
			window.clearInterval(self);
		}
		updatePlayerInfo();
	},10,player,interval);
	return "You were eaten.";
});


// Container setup //

var tawnasLocker = lockers.addContainer("Tawna's Locker","Tawna's Locker").setOnOpen(function(player){
	if(player.hasItem("Tawna's Locker Key")) return [true,""];
	else return [false, "You need a key to open this locker"];
});
tawnasLocker.add(new Wearable("underwear","Tawna's Underwear", "Tawna's underwear, white and lacey","pants"));
tawnasLocker.add(new Wearable("bra","Tawna's Bra", "Tawna's bra, white and frilly","shirt"));
tawnasLocker.add(new Wearable("socks","Tawna's Socks","Tawna's dirty socks, darkened from hours of racing","footwear"));

var amisLocker = lockers.addContainer("Ami's Locker","Ami's Locker").setOnOpen(function(player){
	if(player.hasItem("Ami's Locker Key")) return [true,""];
	else return [false, "You need a key to open this locker"];
});
amisLocker.add(new Wearable("underwear","Ami's Underwear", "Ami's underwear, white and lacey","pants"));
amisLocker.add(new Wearable("bra","Ami's Bra", "Ami's bra, white and frilly","shirt"));
amisLocker.add(new Wearable("socks","Ami's Socks","Ami's dirty socks, darkened from hours of racing","footwear"));

var lizsLocker = lockers.addContainer("Liz's Locker","Liz's Locker").setOnOpen(function(player){
	if(player.hasItem("Liz's Locker Key")) return [true,""];
	else return [false, "You need a key to open this locker"];
});
lizsLocker.add(new Wearable("underwear","Liz's Underwear", "Liz's underwear, white and lacey","pants"));
lizsLocker.add(new Wearable("bra","Liz's Bra", "Liz's bra, white and frilly","shirt"));
lizsLocker.add(new Wearable("socks","Liz's Socks","Liz's dirty socks, darkened from hours of racing","footwear"));

var megumisLocker = lockers.addContainer("Megumi's Locker","Megumi's Locker").setOnOpen(function(player){
	if(player.hasItem("Megumi's Locker Key")) return [true,""];
	else return [false, "You need a key to open this locker"];
});
megumisLocker.add(new Wearable("underwear","Megumi's Underwear", "Megumi's underwear, white and lacey","pants"));
megumisLocker.add(new Wearable("bra","Megumi's Bra", "Megumi's bra, white and frilly","shirt"));
megumisLocker.add(new Wearable("socks","Megumi's Socks","Megumi's dirty socks, darkened from hours of racing","footwear"));

var isabellasLocker = lockers.addContainer("Isabella's Locker","Isabella's Locker").setOnOpen(function(player){
	if(player.hasItem("Isabella's Locker Key")) return [true,""];
	else return [false, "You need a key to open this locker"];
});
isabellasLocker.add(new Wearable("underwear","Isabella's Underwear", "Isabella's underwear, white and lacey","pants"));
isabellasLocker.add(new Wearable("bra","Isabella's Bra", "Isabella's bra, white and frilly","shirt"));
isabellasLocker.add(new Wearable("socks","Isabella's Socks","Isabella's dirty socks, darkened from hours of racing","footwear"));



// Characters setup //

var tawna = new NPC("Tawna","A confident american blonde bombshell","female");
tawna.wearing = [];
tawna.wearing.push(new Wearable("Pink t-shirt","Pink t-shirt","shirt"));
tawna.wearing.push(new Wearable("Blue shorts","Blue shorts","pants"));
tawna.wearing.push(new Wearable("Red sneakers","Red shoes","footwear"));

var liz = new NPC("Liz","A feisty and beautiful british brunette","female");
liz.wearing = [];
liz.wearing.push(new Wearable("Green tank top","","shirt"));
liz.wearing.push(new Wearable("purple skirt","","pants"));
liz.wearing.push(new Wearable("purple sneakers","","footwear"));

liz.addDialogueState("someone opened locker","(Liz slams her locker shut before you can see what's in there)<br> Hey! Don't you know not to go looking through other people's lockers!?");
liz.addDialogue("What are you hiding in there?","It's none of your business!",function(liz,player){
	return true;
});

var isabella = new NPC("Isabella","A fun-loving russian woman","female");
isabella.wearing = [];
isabella.wearing.push(new Wearable("shirt","blue tracksuit top","","shirt"));
isabella.wearing.push(new Wearable("pants","blue tracksuit pants","","pants"));
isabella.wearing.push(new Wearable("shoes","blue sneakers","","footwear"));

var megumi = new NPC("Megumi","A blue-haired cute japanese woman","female");
megumi.wearing = [];
megumi.wearing.push(new Wearable("shirt","white jacket","","shirt"));
megumi.wearing.push(new Wearable("pants","white pants","","pants"));
megumi.wearing.push(new Wearable("shoes","black sneakers","","footwear"));

var ami = new NPC("Ami","An energetic emerald-haired bombshell","female");
ami.wearing = [];
ami.wearing.push(new Wearable("shirt","green and yellow dress","","shirt"));
ami.wearing.push(new Wearable("pants","green pants","","pants"));
ami.wearing.push(new Wearable("shoes","green sneakers","","footwear"));

var coco = new Character("Coco","A blonde brainy hot young teenager","female");
coco.wearing = [];
coco.wearing.push(new Wearable("shirt","white shirt","","shirt"));
coco.wearing.push(new Wearable("pants","blue overalls","","pants"));
coco.wearing.push(new Wearable("shoes","pink sneakers","","footwear"));

var draco = new NPC("Draco","","male");
draco.addDialogueState(null,"So, who is this that wonders into my abode?");
draco.addDialogue("I'm... I'm Coco, I'm sorry I didn't mean to intrude","Well, I'm afraid I'm a hungry dragon. So looks like you're lunch.",function(draco, player){
	return player.name == "Coco" && draco.dialogueState == null;
},function(draco, player){
	player.leaveConversation();
	player.goTo("Draco's Stomach",true);
	draco.dialogueState = "eaten player";
});
draco.addDialogueState("eaten player","");

draco.addDialogueState("asked to eat player","");
draco.addDialogueState("insulted by player","");
dracos_cave.addCharacter(draco);

var saphira = new NPC("Saphira","","female");


lockers.addCharacter(tawna);
lockers.addCharacter(liz);
lockers.addCharacter(isabella);
lockers.addCharacter(megumi);
lockers.addCharacter(ami);
dragonlands.addCharacter(coco);
