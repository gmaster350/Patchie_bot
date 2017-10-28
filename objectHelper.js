/*####################
	Object Helper Module
		Provides utility functions to assist with JS objects.
		
		Method parameters:
			hasKey( <Object>, <String> | <Number> | <RegExp>, function( <boolean> ) [, <boolean> ])
			hasValue( <Object>, <ANYTHING> [, <boolean> ])
####################*/



function hasKey(object,key,callback,recurse=false){
	if(Object.keys(object).some(function(k){
		
		// If 'key' is a RegExp Object, perform a the relevant 
		// RegExp match on each key of the object.
		// Otherwise, do a simple string equality check.
		return (key instanceof RegExp) ? k.match(key) : k == key;
	})){
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
function hasValue(object,value,callback,recurse=false){
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
// calls second callback 'after'.
// recursive allows users to perform a function on every value and sub-object of an object.
function forEach(arr,callback,after,recursive){
	if(arr instanceof Map){
		arr.forEach(function(value,key,self){
			if(recursive && value instanceof Object){
				forEach(value,function(v,k,s){
					callback(v,k,s);
				},function(){
					if(after){
						after();
					}
				});
			}
			else{
				callback(value,key,self);
			}
		});
	}
	else if(arr instanceof Object){
		Object.keys(arr).forEach(function(key,index,self){
			if(recursive && value instanceof Object){
				forEach(value,function(v,k,s){
					callback(v,k,s);
				},function(){
					if(after){
						after();
					}
				});
			}
			else{
				callback(arr[key],key,self);
			}
		});
	}
	else{
		throw "objectHelper.forEach must use an Object or Map as its first parameter.";
	}
	if(after){
		after();
	}
}

// Step through object branches defined in 'nodes', return object or value at end node.
function subObject(arr,nodes,callback){
	if(nodes.length >= 1){
		subObject(arr[nodes[0]],nodes.slice(1),function(res){
			callback(res);
		});
	}
	else{
		callback(arr);
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