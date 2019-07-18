class RoomContainer extends RoomItem {
	constructor(name, description){
		super(name, description);
		this.items = [];

		this.directActions["onOpen"] = function(player){
			return {interrupt:false,print:""};
		};

		this.directActions["onClose"] = function(player){
			return {interrupt:false,print:""};
		};
	}
}
