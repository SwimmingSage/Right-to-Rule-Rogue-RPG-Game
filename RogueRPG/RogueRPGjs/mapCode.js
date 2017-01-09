

Maps = function(map) {
	var self = {
		id:map.id,
		grid:map.grid,
		width:map.grid[0].length * TILE_SIZE, // length of first row
		height:map.grid.length * TILE_SIZE, // rows times size of one row
		wall:map.wallID,
		spawnPointX:map.spawnPointX,
		spawnPointY:map.spawnPointY,
		stairs:map.endPointID,
		image:map.image,
		spawnTo:map.spawnTo,
	}
	self.isPositionWall = function(pt){
		var gridX = Math.floor(pt.x / TILE_SIZE);
		var gridY = Math.floor(pt.y / TILE_SIZE);
		// these first 2 if statements check whether the player is off of the map
		if(gridX < 0 || gridX >= self.grid[0].length)
			return true;
		if(gridY < 0 || gridY >= self.grid.length)
			return true;
		if(self.grid[gridY][gridX] === 0) // if it is on a zero then return false as that is not a wall
			return false;
		if(self.grid[gridY][gridX] === self.wall) // This is what would cause the game to be like, he ran into a wall, can use other value here to cause different effects
			return true;
		
	}

	self.nextFloor = function(pt){
		var gridX = Math.floor(pt.x / TILE_SIZE);
		var gridY = Math.floor(pt.y / TILE_SIZE);


		if(self.grid[gridY][gridX] === self.stairs)
			movePlayerToNextLevel();
	}

	// how does this drawing function work, I actually kind of get it, it draws the map in the middle of the map
	// this is then shifted depending on the playeres coordinates
	self.draw = function(){
		var x = WIDTH/2 - player.x;
		var y = HEIGHT/2 - player.y;
		//JavaScript syntax:	context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		ctx.drawImage(self.image,0,0,self.image.width,self.image.height,x,y,self.width,self.height);
	}

	player.x = self.spawnPointX;
	player.y = self.spawnPointY;


	return self;
}

movePlayerToNextLevel = function(){
	if(player.floorlevel === 5){
		enterEndGame();
		return;
	}
	Maps.activeMap = Maps(Maps.activeMap.spawnTo);
	player.floorlevel += 1;
	resetSpeed();
}


//makes player no longer moving when going to new floor
resetSpeed = function(){
	if(player.movedright || player.movedleft || player.movedup || player.moveddown){
		player.movedright = false;
		player.movedleft = false;
		player.movedup = false;
		player.moveddown = false;
	}
}