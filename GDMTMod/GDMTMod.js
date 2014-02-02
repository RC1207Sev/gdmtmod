(function () { 
	
	var OriginalshowNotifications = UI.showNotifications; 
	
	var Nickname = "Unnamed";
	
	// Overrides original UI.showNotifications: this will skip and delete the notification pop up
	// binded to the ADD_GDMT_NOTIFICATION event
    UI.showNotifications = function (a) {
    	
    	var c = GameManager.company.activeNotifications;
    	
    	if ("ADD_GDMT_NOTIFICATION" != c[0].header){
    		
    		OriginalshowNotifications(a);
    		
    	}else{
    		c.pop();
    	}
    };
	
	var AddChat = function () {
		
		var SendNotification = {
				
				id: "ADD_GDMT_NOTIFICATION" + (new Date).getTime(),
				maxTriggers: 1,
				trigger: function (company) {
					return 1;
				},
				//because we dynamically create the notification every time the event triggers, we use getNotification
				getNotification: function (company) {
					
					//Saves the Nickname
					Nickname = company.staff[0].name;
					
					// Check if the panel already exists: if not, create it
					console.log($('#multiTycoonPanel').length);
					$('#multiTycoonPanel').length || $('#barLeft').append($('<div id="multiTycoonPanel">').load("mods/GDMTMod/html/statusBarLeft.html", function () { AddName(); }));
					
					// Loads the new Chat panel into the main html (id: BarLeft)
					
					return new Notification("ADD_GDMT_NOTIFICATION", "");
				}
		};
		
		GDT.addEvent(SendNotification);
	};
	
	// Call back after load: initializes the chatclient.js
	var AddName = function () {
		
		// Checks if the name is usable and init the client
		//Chatclient.changeName(Nickname) && Chatclient.init();
		$('#multiTycoonPanel').draggable({ cancel: "p" });
		$('#CreatePanel').hide();
		$('#b_create_new_game').click(function() {

				$('#StartPanel').hide();
				$('#CreatePanel').show();
		
			});
		$('#b_create_back').click(function() {

				$('#StartPanel').show();
				$('#CreatePanel').hide();
		
			});
	};
	
	var ready = function () {
		
	/*
	Adds Chat in game

	*/
	
	
		// Chat Panel		
		AddChat();

		
	};
	

	var error = function () {
		};

	GDT.loadJs(['mods/GDMTMod/api/events.js',
	            'mods/GDMTMod/helpers/checks.js',
	            'mods/GDMTMod/GDMTclient.js'], ready, error);
	
})();