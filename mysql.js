//mysql helper
const fs = require("fs");
const mysql = require("mysql");

fs.readFile("../databaseSecrets",function(err,JSON.parse(secrets)){
	const con = mysql.createConnection(secrets);
});

function query(q,callback){
	con.connect(function(err) {
		if (err) console.log(err);
		con.query(q, function (err, result) {
			if (err) console.log(err);
			callback(result);
		});
	});
}

module.exports = {
	"query":query
}