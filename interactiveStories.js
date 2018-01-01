// interactive stories //

const oh = require("./objectHelper.js");

/*
format of active:
	{ 
		<String> userid : [ 
			<String> branch label, 
			<String> branch label
		] 
	}
*/
var active = {}; //keeps a record of the path the user has taken through the tree

class Branch{
	constructor(parent=null,response=null{
		this.parent = parent;
    if(response == null) throw "response not provided.";
    this.response = response;
		this.children = {};
	}
	
  /*
  option = choice presented to the user
  response = text of response, label of new object
  */
  
	addChild(option,response){ 
		this.children[option] = (new Branch(this,response));
	}
  
	// Will accept either text, or a number representing an option.
  toChild(userid,option){
    if(Object.keys(this.children).some(function(o){return option == o}))
      active[userid].push(option);
    else if(!isNaN(Number(option)) && Number(option) < Object.keys(this.children).length){
      active[userid].push(this.children[Object.keys(this.children)[Number(option)]]);
    }
  }
	
	// moves user back up a level.
	toParent(userid){
    active[userid].pop();
  }
}

var Root = new Branch();

function addBranch(message,callback){
  var user = message.author.id;
  var text = message.content.split(" ").slice(1).split(" => ");
  getCurrent(Root,active[user],function(currentBranch){
    currentBranch.addChild(text[0],text[1]);
  });
}

function traverse(message,callback){
  var user = message.author.id;
  var option = message.content.split(" ").slice(1);
  getCurrent(Root,active[user],function(currentBranch){
    currentBranch.toChild(user,option);
    getCurrent(Root,active[user],function(currentBranch){
      callback(currentBranch.response);
    });
  });
}

function getCurrent(branch,path,callback){
  if(path.length > 0){
    getCurrent(branch.children[path[0]],path.shift(),function(b){
      callback(b);
    });
  }
  else{
    callback(branch);
  }
}