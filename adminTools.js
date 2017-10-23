//admin tools

var filter = [];
var strength = "warn";

//roles (comes with mini-language for complex behavior)
/*
	variables:
		lists:
			$users -> list of guild's users.
			$perms -> list of user's permissions
			$roles -> list of guilds's roles.
			$roles($user) -> list of a user's roles.
			$roles($channel) -> list of a channel's roles.
			
			$user.roles -> list of $role objects
			$guild.roles -> list of $role objects
			$channel.roles -> list of $role objects
			$role.permissions -> list of $permission objects
		
		$guild -> guild the command was issued from.
		
		$channel
		$channel.name -> channel name
		$channel.topic -> channel topic
		
		$role
		$role.name -> role's name
		$role.precedence -> role's precendence from 1 to N, where 1 is highest on the stack.
		
		$user
		$user.id -> user's id
		$user.name -> user's username
		$user.nick -> user's nick
	
	operators:
		in      : list element check
		matches : string comparison. Regex compatibility available.
		as      : alias variable in foreach loop
		++      : concatenate
		not     : negate
		
		/       : divide
		*       : multiply
		-       : subtract
		+       : add
		%       : remainder
		
		between [number] and [int]:
	
	functions:
		foreach ( ) do ( ) end                                 : loop through list variable
		if ( ) then ( ) elseif ( ) then ( ) else ( )           : branching statement
		removeRole ( <role> , <channel> | <user> )              : remove a role from a user or channel
		addRole ( <role>, <channel> | <user> )                  : add a role to a user or channel
		setPermission ( <role> , <PERM>, 'false' | 'default' | 'true' ) : set permission of a role
		
	examples:
		!roles foreach( $users as $u ) do ( if( $u.name matches /^joh?nn?y?$/ ) then ( addRole( The_Johns, $u ) ) )
*/

function cleanRoles(query,callback){
	var parameters = query.split(" ");
}

function variable(string,callback){
	
}

function getRole(name,callback){
}

function getChannel(name,callback){
}

function filter(content,callback){
}

function filterStrength(strength,callback){
//Warn: bot asks the user not to swear
//Enforce: bot edits user messages
}

function filterStrikes(strikes){
	//wipe [user]: clear strikes of everyone or one user
	//-1: no strikes system
	//0 : immediate
	// > 0: number of strikes before action
}

function filterAction(action){
	//none
	//mute [time]
	//kick
	//ban [time]
}