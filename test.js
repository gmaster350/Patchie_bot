

function test(){
	return "successful test";
}

function echo(str,callback){
	callback(str);
	return str;
}

module.exports = {
	test: test,
	echo: echo
}