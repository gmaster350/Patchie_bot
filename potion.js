// Bot random potion module //

function sum(arr){
	var t = 0;
	for(i=0;i<arr.length;i++)t+=arr[i];
	return t;
}

function weightedRandom(array,weights){
	var total = 0;
	if(weights.some(function(w){
		total += w;
		return false;
	})){
		throw "ALL weights must be numbers; integers or floats.";
	};
	
	if(array.length != weights.length){
		throw "lengths of arrays must be equal.";
	}
	
	var ret;
	var point = Math.random()*total;
	for(var i = 0, min = 0, max = array[0]; i < array.length; i++){
		max = sum(weights.slice(0,i+1));
		if(point > min && point < max){
			ret = array[i];
		}
		min = sum(weights.slice(0,i+1));
	}
	
	return ret;
}

var effects = [
	{
		"chance":1,
		"speak1":"You feel many times stronger.",
		"options1":[],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":1,
		"speak1":"You feel much more agile.",
		"options1":[],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":5,
		"speak1":"Your ",
		"options1":["penis","head","tongue","legs","tail","ears","wings","whole body","ears","snout"],
		"speak2":" changes to be many times ",
		"options2":["larger","smaller"],
		"speak3":" than its current size."
	},
	{
		"chance":1,
		"speak1":"You are able to see greater distances.",
		"options1":[],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":4,
		"speak1":"Your body gradually transforms into that of a(n) ",
		"options1":["rabbit","human","wolf","fish","bear","fox","dragon","cat","dog","mouse","rat","pig","sheep","giraffe","zebra","horse","hippopotamus","bird","eagle","shark","whale","sloth","chicken"],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":3,
		"speak1":"Your skin starts to change color, gradually turning ",
		"options1":["red","orange","yellow","green","blue","purple","pink","black","white","grey","transparent","stripey","spotted"],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":1,
		"speak1":"Your skin is immune to any acids",
		"options1":[],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":1,
		"speak1":"Your tongue turns numb, leaving you unable to speak coherently",
		"options1":[],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":1,
		"speak1":"You have a compulsion to dance",
		"options1":[],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":6,
		"speak1":"You gain the ability to exhale ",
		"options1":["tea","coffee","water","cola soda","deodorant","molten nickel","magma","candy","rosemary and thyme","paprika","parsley","mcdonald's fries","old sneakers","dulux paint","sand","gravel","salt","small plastic toys","powerful pheromones","sleeping gas","shredded paper","propane","pennies"],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":1,
		"speak1":"You become invisible to others.",
		"options1":[],
		"speak2":"",
		"options2":[],
		"speak3":""
	},
	{
		"chance":2,
		"speak1":"You suddenly sprout a / an extra ",
		"options1":["tail","penis","head","pair of ears","pair of horns","tongue"],
		"speak2":"",
		"options2":[],
		"speak3":""
	}
];

function rn(n){ //random number between 0 and n
	return Math.floor(Math.random()*n);
}

function pick(array){
	return array.length > 0 ? array[rn(array.length)] : "";
}

function generate(message,callback){
	var weights = [];
	effects.forEach(function(obj){
		weights.push(obj.chance);
	});
	var r = weightedRandom(effects,weights);
	var response = r.speak1 + pick(r.options1) + r.speak2 + pick(r.options2) + r.speak3;
	callback(response);
}

module.exports = {
	"generate":generate
}