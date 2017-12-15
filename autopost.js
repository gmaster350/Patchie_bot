//Autopost module

const fs = require("fs");
const request = require("request");
const resemble = require("node-resemble-js");

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};



function addToFile(url,title){
	download(url, '../posted/'+url, function(){
	});
}