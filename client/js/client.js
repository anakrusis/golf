var socket;

var canvas;
var ctx;
var mapCanvas;
var mapCtx;
tileset = new Image(); tileset.src = "tileset.png";
texture_PLAYER = new Image(); texture_PLAYER.src = "player.png";
texture_TREE = new Image(); texture_TREE.src = "tree.png";
texture_BALL = new Image(); texture_BALL.src = "ball.png";
texture_FLAG = new Image(); texture_FLAG.src = "flag.png";
texture_METER = new Image(); texture_METER.src = "meter.png";
texture_METER_OUTLINE = new Image(); texture_METER_OUTLINE.src = "meter_outline.png";
texture_SHADOW = new Image(); texture_SHADOW.src = "shadow.png";
textures = [texture_PLAYER, texture_TREE, texture_BALL, texture_FLAG];

var MAX_FPS = 60;

statusStrings = ["Out of Bounds","Rough","Fairway","Green","Hole!","Bunker","Water Hazard"];
statusStrings[-1] = "Unknown Ground Type!";
holeStrings = ["Par","Bogey","Double Bogey","Triple Bogey"];
holeStrings[-1] = "Birdie"; holeStrings[-2] = "Eagle"; holeStrings[-3] = "Albatross";

var keysDown = {};
var delta = 0;
var map;
var currentMap;
var clubs;

var connectTimer = 0;
var betweenTurnTimer = 0;
var BETWEEN_TURN_TIME = 96;
var turnStatus; var holeStatus;

var powerMeter = -1;
var powerMeterCoeff;

players = {};
playerID = -1 // Your player ID
var currentPlayer; // The current player who is hitting the ball right now

cam_zoom = 2
cam_unlock = false // can the camera move freely yes or no
ball_unlock = true // can you swing and hit the ball?

results_screen = false
results = [];
results_names = [];

var startClient = function(){
	// Main canvas for rendering
	canvas = document.querySelector("#Canvas");
	canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto;"
	ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	mapCanvas = document.getElementById("MapCanvas");
	mapCtx = mapCanvas.getContext("2d");
	mapCtx.imageSmoothingEnabled = false;
	
	texCanvas = document.getElementById("TexCanvas");
	texCtx = texCanvas.getContext("2d");
	texCtx.imageSmoothingEnabled = false;

	addEventListener("keydown", function (e) { // when a key is pressed
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) { // when a key is unpressed
		delete keysDown[e.keyCode];
	}, false);

	addEventListener("mousewheel", function (e){ // normal scrolling
		delta = e.wheelDelta;
	}, false);
	
	addEventListener("DOMMouseScroll", function (e){ // firefox scrolling support
		delta = e.detail * -50;
	}, false);

	var update = function (modifier) {
		if (players[playerID]){
			oldclub = players[playerID].club;
		}
		
		if (87 in keysDown) { // up
			if (cam_unlock){
				cam_y += 4 * Math.sin(cam_dir - Math.PI / 2);
				cam_x -= 4 * Math.cos(cam_dir - Math.PI / 2);
			}else{
				if (ball_unlock && players[playerID]) {
					players[playerID].club = Math.min( players[playerID].club + 1, clubs.length-1);
					socket.emit("playerUpdateRequest", players[playerID], playerID);
					delete keysDown[87];
				}	
			}
		}
		if (83 in keysDown) { // down
			if (cam_unlock){
				cam_y -= 4 * Math.sin(cam_dir - Math.PI / 2);
				cam_x += 4 * Math.cos(cam_dir - Math.PI / 2);
			}else{
				if (ball_unlock && players[playerID]) {
					players[playerID].club = Math.max( players[playerID].club - 1, 0);
					socket.emit("playerUpdateRequest", players[playerID], playerID);
					delete keysDown[83];
				}
			}
		}
		if (players[playerID]){
			players[playerID].club = oldclub;
		}
		
		t = 4;
		
		if (65 in keysDown) { // left
			
			if (cam_unlock){
				cam_y -= t * Math.sin(cam_dir - Math.PI);
				cam_x += t * Math.cos(cam_dir - Math.PI);
				
			}
		}
		if (68 in keysDown) { // right
			if (cam_unlock){
				cam_y += t * Math.sin(cam_dir - Math.PI);
				cam_x -= t * Math.cos(cam_dir - Math.PI);
				
			}
		}
		if (ball_unlock && players[playerID]){
			if (65 in keysDown || 68 in keysDown){
			
				olddir = players[playerID].ball.dir;
				if (65 in keysDown){
					players[playerID].ball.dir -= Math.PI / 128;
				}
				if (68 in keysDown){
					players[playerID].ball.dir += Math.PI / 128;
				}
				socket.emit("playerUpdateRequest", players[playerID], playerID);
				
				players[playerID].ball.dir = olddir;
			}
		}
		
		if (100 in keysDown) { // numpad 4 
			cam_dir -= Math.PI / 32;
		}
		if (102 in keysDown) { // numpad 6
			cam_dir += Math.PI / 32;
		}
		if (104 in keysDown){ // numpad 8
			flat_factor += (2/10);
		}
		if (98 in keysDown){ // numpad 2
			flat_factor -= (2/10);
		}
		flat_factor = Math.max(6, flat_factor);
		flat_factor = Math.min(32, flat_factor);
		
		if (32 in keysDown){ // space
			
			if (ball_unlock && players[playerID] && playerID == currentPlayer){
				if (powerMeter == -1){
					powerMeter = 0.01;
					powerMeterCoeff = 1.2;
				}else{
					powerMeter *= powerMeterCoeff;
			
					powerMeter = Math.max(0, powerMeter);
					powerMeter = Math.min(1, powerMeter);
					
					if (powerMeter == 1){
						powerMeterCoeff = 1 / powerMeterCoeff;
					} else if (powerMeter < 0.01){
						powerMeterCoeff = 1 / powerMeterCoeff;
					}
				}
			}
			
		} else {
			if (powerMeter != -1){
				if (ball_unlock && players[playerID] && playerID == currentPlayer){
					socket.emit("ballHit", playerID, players[playerID].ball, powerMeter);
					ball_unlock = false
				}
			}
		}
		cam_zoomOld = cam_zoom; // storing old camera values pre-change
		cam_dirOld = cam_dir;
		cam_xOld = cam_x;
		cam_yOld = cam_y;
		
		cam_zoom += (0.002 * delta) // applying camera changes
		cam_zoom = Math.max(0.5, cam_zoom)
		cam_zoom = Math.min(3, cam_zoom)
		
		if (players[currentPlayer]){ // camera spectates the player who is currently up
			cam_dir = players[currentPlayer].ball.dir;
			cam_x = players[currentPlayer].ball.x;
			cam_y = players[currentPlayer].ball.y;
		}
		
		// Map redraws only when there is a change in the camera position.
		if (cam_zoomOld != cam_zoom || cam_dirOld != cam_dir || cam_xOld != cam_x || cam_yOld != cam_y){
			redrawFlag = true;
		}
		
		delta = 0
		
		if (socket){
			if (!socket.connected){
				this.connectTimer++;
				
				if (this.connectTimer > 256){
					this.connectTimer = 0;
					socket.disconnect();
				}
			}
		}
		
		betweenTurnTimer--;
		betweenTurnTimer = Math.max(0, betweenTurnTimer);
		
		soundPlayerTick();
	}

	// main loop
	var main = function () {
		var now = Date.now();
		var delta = now - then;
	
		update(delta);
		render();
		
		then = now;
		requestAnimationFrame(main);
	};
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	var then = performance.now();
	var fpsInterval = 1000 / MAX_FPS;
	main();
}

var server_connect = function(){
	
	var player = new Player() // player is just a temp variable, the properly synced one is players[playerID]
	var name = settings.opts.playerName;
	player.name = name;
	players = {};
	
	if (socket){
		socket.disconnect();
	}
	socket = io.connect(settings.opts.connectionString, {
    reconnection: false });

	socket.on("playerJoin", function(playerJoining, serverPlayerList, serverMap, serverClubs, s_currentPlayer){
		console.log(playerJoining.name + " has joined the server")
		players = serverPlayerList
		//console.log(serverPlayerList);
		
		if (playerID == -1) {  // Handler for uninitialized player (client-side)
			playerID = playerJoining.id
			cam_x = playerJoining.ball.x
			cam_y = playerJoining.ball.y
		}
		
		if (!map){ // If the player does not yet have the map, then here it is
			map = serverMap
			initMapTex(map);
			clubs = serverClubs
		}
		currentPlayer = s_currentPlayer;
		
		if (playerID == s_currentPlayer){
			ball_unlock = true;
			powerMeter = -1;
		}
	});
	
	socket.on("playerLeave", function(playerLeaving, serverPlayerList){
	
		console.log(players[playerLeaving].name + " has left the server")
		players = serverPlayerList
	});
	
	socket.on("playerKick", function(id){
		if (id == playerID){
			socket.disconnect();
		}
	});
	
	socket.on("playerUpdate", function(playerUpdating, playerUpdatingID){
		players[playerUpdatingID] = playerUpdating;
	});
	
	socket.on("connect", function(){
		var form = document.getElementById("form"); // text box for joining server goes away once you join
		form.style.display="none";;
		
		player.socket = socket.id
		socket.emit("playerJoinRequest", player)
		
		socket.on("disconnect", function(){
			console.log("Left the server");
			loadSong(song_EMPTY);
			
			var form = document.getElementById("form"); // text box comes back if you're disconnected
			form.style.display="block"
			socket.disconnect();
			map = undefined;
			ball_unlock = false;
			playerID = -1;
			players = {};
		});
		
		results_screen = false;
		loadSong(song_MAIN);
	});
	
	socket.on("courseStart", function ( serverPlayers, serverMap ){
		map = serverMap;
		initMapTex(map);
		players = serverPlayers;
		currentPlayer = 0;
		results_screen = false;
		ball_unlock = true;
		powerMeter = -1;
		
		loadSong(song_MAIN);
	});
	
	socket.on("ballUpdate", function( id, ball ){
		if (players[id]) {
			if (ball.velocity != players[id].ball.velocity){
				players[id].ball = ball
			}	
		}
	});
	socket.on("ballHit", function ( serverMeter ){
		powerMeter = serverMeter;
		loadSong(sfx_HIT);
	});
	
	socket.on("turnStart", function( playerCurrent ) {
		currentPlayer = playerCurrent;
		if (playerCurrent == playerID){
			ball_unlock = true;
		}
		powerMeter = -1;
		betweenTurnTimer = 0;
		loadSong(song_MAIN);
	});
	
	socket.on("turnFinish", function ( playerCurrent, status ){
		betweenTurnTimer = BETWEEN_TURN_TIME;
		turnStatus = status;
		holeStatus = players[playerCurrent].shot - map.par;
		
		if (status == 4){ // ball in hole sfx
			loadSong(sfx_WIN);
		}else if (status == 0 || status == 5 || status == 6 || status == -1){
			loadSong(sfx_BAD);
		}else{
			loadSong(sfx_GOOD); // generic sfx
		}
		
	});
	
	socket.on("courseFinish", function( serverResults, serverCurrentMap, serverResultsNames ) {
		if (!results_screen){
			results = serverResults;
			ball_unlock = false;
			results_screen = true;
			loadSong(song_RESULTS)
			currentMap = serverCurrentMap;
			results_names = serverResultsNames;
		}
	});
	
	soundPlayerInit();
}
window.onblur = function(){
	if (soundInitted){
		for (i = 0; i < CHANNELS_AMT; i++){
			oscs[i].frequency.setValueAtTime(0, audioCtx.currentTime);
		}
	}
}