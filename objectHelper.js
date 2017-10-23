/*####################
	Object Helper Module
		Provides utility functions to assist with objects.
		
		Method parameters:
			hasKey( <Object>, <String> | <Number> | <RegExp>, function( <boolean> ) [, <boolean> ])
			hasValue( <Object>, <ANYTHING> [, <boolean> ])
####################*/



function hasKey(object,key,callback,recurse=false){
	if(Object.keys(object).some(function(k){return (key instanceof RegExp) ? k.match(key) : k == key;})){
		callback(true);
	}
	else if(recurse){
		if(Object.keys(object).some(function(k){return object[k] instanceof Object})){
			Object.keys(object).forEach(function(k){
				if(object[k] instanceof Object){
					hasKey(object[k],key,function(res){
						callback(res);
					},true);
				}
			});
		}
		else{
			callback(false);
		}
	}
	else{
		callback(false);
	}
}

// Check for value existence, optionally recursive
function hasValue(object,value,recurse=false){
	if(Object.keys(object).some(function(k){return object[k] == value})){
		callback(true);
	}
	else if(recurse){
		if(Object.keys(object).some(function(k){return object[k] instanceof Object})){
			Object.keys(object).forEach(function(k){
				if(object[k] instanceof Object){
					hasValue(object[k],key,function(res){
						callback(res);
					},true);
				}
			});
		}
		else{
			callback(false);
		}
	}
	else{
		callback(false);
	}
}

// For each key-value pairs of given object,
// call callback 'callback'. Once all callbacks are done,
// call second callback 'after'.
function forEach(arr,callback,after){
	Object.keys(arr).forEach(function(key,index,self){
		callback(arr[key],key,self);
	});
	if(after)after();
}

// Step through object branches defined in 'nodes', return object or value at end node.
function subObject(arr,nodes,callback){
	if(nodes.length > 1){
		subObject(arr[nodes[0]],nodes.slice(1),function(res){
			callback(res);
		});
	}
	else{
		callback(arr[nodes[0]]);
	}
}

function printObject(obj,callback,delimiter="    ",output="",level=1){
	Object.keys(obj).forEach(function(k){
		v = obj[k];
		if(typeof v == Object){
			printObject(v,function(res){    },delimiter,output + delimiter.repeat(level),level+1);
		}
		else{
		  callback(delimiter.repeat(level) + v);
		}
	});
	
}

module.exports = {
	"hasKey":hasKey,
	"hasValue":hasValue,
	"forEach":forEach,
	//"printObject":printObject,
	"subObject":subObject
}