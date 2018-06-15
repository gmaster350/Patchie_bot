// Dynamic images

var image1 = "http://127.0.0.1/Testing/roneishvwKRwqjlg.php"; // /var/www/html/data/roneishvwKRwqjlg.php
image1 = "https://i.imgur.com/nblzBa3.jpg";

function testRender(message,callback){
	var parameters = message.content.split(" ");
	var get = "?x="+parameters[1]+"&y="+parameters[2];
	var img = "attachment://" + image1;
	message.channel.send({
		embed:{
			thumbnail: {
				url: img
			}
		}
	}).then(function(){
		console.log("fetched image @ "+img);
	}).catch(function(err){
		console.log(err);
	});
}

module.exports = {
	"testRender":testRender
};
