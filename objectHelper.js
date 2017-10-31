
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

// Search deep object breadth-first, returning first value with a matching key
function getFirst(obj,key,callback,recursive=false){
	var objs = [];
	var flag = false;
	var result;
	
	// Check all keys at current object depth
	Object.keys(obj).some(function(k){
		
		// If the value is another object, store it for later use.
		if(typeof obj[k] == "object"){
			objs.push(obj[k]);
		}
		
		// Otherwise, check the key to see if it matches the search parameter.
		else if(k == key){
			flag = true;
			result = obj[k];
		}
		
		// If flag has been set as true, the Array.some() will short circuit.
		return flag;
	});
	
	// Callback the result if one is found.
	if(flag){
		callback(result);
	}
	
	// Otherwise, if there are deeper objects, 
	// and this function is set as recursive, check deeper.
	else if(recursive && objs.length > 0){
		if(!objs.some(function(o){
			
			// For all deeper objects, run recurse function.
			getFirst(o,key,function(res){
				
				// An undefined value means that this branch has no matching key,
				// false is returned to the Array.some() to continue the search.
				if(res === undefined){
					return false;
				}
				
				// A non-undefined value means something was found.
				// true is return to the Array.some() function, short-circuiting the search.
				else{
					callback(res);
					return true;
				}
			},recursive);
		})){
			// If the search reaches its end without finding anything, callback undefined.
			callback(undefined);
		}
	}
	else{
		
		// If no match is found at this level,
		// and the search is not recursive,
		// or there are no deeper objects to find,
		// callback undefined.
		callback(undefined);
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