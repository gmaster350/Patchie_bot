//mysql helper

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "game-data.cpl7rgdekurd.us-east-2.rds.amazonaws.com",
  user: "gmaster351",
  password: "QuantumLeap144212",
  database: "Patchie"
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