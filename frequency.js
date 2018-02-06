const fs = require("fs");

function record(message){
	var time = message.createdAt;
	fs.readFile("frequencyData.json",(err,data) => {
		if(!err){
			var times = data;
			if(!(channel.guild.id in times)) times[channel.guild.id] = {};
			if(!(channel.id in times[channel.guild.id])) times[channel.guild.id][channel.id] = [];
			
			times[message.guild.id][channel.id] = time;
			fs.writeFile("frequencyData.json",times,err => console.log(err));
		}
	});
}

function activity(message,callback){
	var type = message.content.split(" ")[1];
	var d = yearMilliseconds();
	var times = [];
	
	fs.readFile("frequencyData.json",(err,data) => {
		var json = data;
		Object.keys(json[message.guild.id]).forEach(chanid => {
			json[message.guild.id][chanid].forEach(timestamp => {
				switch(type){
					case "hour":
						if(timestamp > d.hour) times.push(timestamp);
						break;
					case "day":
						if(timestamp > d.day) times.push(timestamp);
						break;
					case "week":
						if(timestamp > d.week) times.push(timestamp);
						break;
					case "month":
						if(timestamp > d.month) times.push(timestamp);
						break;
					case "year":
						if(timestamp > d.year) times.push(timestamp);
						break;
					case "all-time":
						times.push(timestamp);
						break;
				}
			});
		});
	});
	
	var avg = averageGap(times);
	var response = "Activity over this past "+type+": \n";
	var n = new Date(d.now);
	switch(type){
		case "hour":
			var rate = ((d.now - d.hour) / times.length).toFixed(2);
			response += "\n" + rate*60000*n.getMinute() + " posts per minute";
			break;
		case "day":
			var rate = ((d.now - d.day) / times.length).toFixed(2);
			response += "\n" + rate*3600000*n.getHour() + " posts per hour";
			break;
		case "week":
			var rate = ((d.now - d.week) / times.length).toFixed(2);
			response += "\n" + rate*86400000*n.getDate() + " posts per day";
			break;
		case "month":
			var rate = ((d.now - d.month) / times.length).toFixed(2);
			response += "\n" + rate*604800000*n.getMonth() + " posts per week";
			break;
		case "year":
			var rate = ((d.now - d.year) / times.length).toFixed(2);
			response += "\n" + rate + " posts per month";
			break;
		case "all-time":
			var rate = ((d.now - message.guild.createAt) / times.length).toFixed(2);
			response += rate + " posts per year";
			break;
	}
	
}

function yearMilliseconds(){
	var d = Date.now();
	var t = new Date(d);
	
	var m = (t.getDate()*86400000) + (t.getHours()*3600000)+(t.getMinutes()*60000)+(t.getSeconds()*1000)+t.getMilliseconds();
	var leapYear;
	if(t.getFullYear() % 4 === 0){
		if(t.getFullYear() % 100 === 0){
			if(t.getFullYear() % 400 === 0){
				learYear = true;
			}
			else{
				leapYear = false;
			}
		}
		else{
			leapYear = true;
		}
	}
	else{
		leapYear = false;
	}
	switch(t.getMonth()){
		case 11:
			m += 86400000*30; //November
		case 10:
			m += 86400000*31; //October
		case 9:
			m += 86400000*30; //September
		case 8:
			m += 86400000*31; //August
		case 7:
			m += 86400000*31; //July
		case 6:
			m += 86400000*30; //June
		case 5:
			m += 86400000*31; //May
		case 4:
			m += 86400000*30; //April
		case 3:
			m += 86400000*30; //March
		case 2:
			m += 86400000*(leapYear ? 29 : 28); //February
		case 1:
			m += 86400000*31; //January
		break;
	}
	
	var monthLength;
	switch(t.getMonth){
		case 0:
			monthLength = 31;
			break;
		case 1:
			monthLength = 30;
			break;
		case 2:
			monthLength = 30;
			break;
		case 3:
			monthLength = 30;
			break;
		case 4:
			monthLength = 30;
			break;
		case 5:
			monthLength = 30;
			break;
		case 6:
			monthLength = 30;
			break;
		case 7:
			monthLength = 30;
			break;
		case 8:
			monthLength = 30;
			break;
		case 9:
			monthLength = 30;
			break;
		case 10:
			monthLength = 30;
			break;
		case 11:
			monthLength = 30;
			break;
	}
	
	return {
		"now":d,
		"leapYear":leapYear,
		"millisecond":d,
		"second":d-t.getMilliseconds(),
		"minute":d-(t.getSeconds()*1000)-t.getMilliseconds(),
		"hour":d-(t.getMinutes()*60000)-(t.getSeconds()*1000)-t.getMilliseconds(),
		"day":d-(t.getHours()*3600000)-(t.getMinutes()*60000)-(t.getSeconds()*1000)-t.getMilliseconds(),
		"week":d-(t.getDay()*86400000)-(t.getHours()*3600000)-(t.getMinutes()*60000)-(t.getSeconds()*1000)-t.getMilliseconds(),
		"month":d-(t.getDate()*86400000)-(t.getHours()*3600000)-(t.getMinutes()*60000)-(t.getSeconds()*1000)-t.getMilliseconds(),
		"year":d-m
	};
}

function averageGap(arr){
	var total = 0;
	if(arr.length < 2){
		return 0;
	}
	else{
		for(var i = 1; i < arr.length; i++){
			total += arr[i] - arr[i-1];
		}
		return total/(arr.length-1);
	}
}

module.exports = {
	"record":record
};