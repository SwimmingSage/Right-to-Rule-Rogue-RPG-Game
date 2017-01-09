Player = function(){
	determineAffinities = function(hpAffinity,manaAffinity,attackAffinity,magicAffinity,defenseAffinity,speedAffinity){
		self.hpAffinity = hpAffinity;
		self.manaAffinity = manaAffinity;
		self.attackAffinity = attackAffinity;
		self.magicAffinity = magicAffinity;
		self.defenseAffinity = defenseAffinity;
		self.speedAffinity = speedAffinity;
	}
	setNonEnemyStats = function(magic,mana){
		self.magic = magic;
		self.mana = mana;
		self.maxMana = mana;
	}
	//createCharacter = function(type,name,x,y,width,height,image,maxhp,hp,attack,defense,speed)
	if(playerClass === "Warrior"){
		var self = createCharacter('player','Player',TowerFloor1.spawnPointX,TowerFloor1.spawnPointY,playerWidth,playerHeight,Img.Warrior,25,25,10,10,4);
		setNonEnemyStats(4,6);
		determineAffinities(2.5,0.6,1.4,0.3,1.4,0.5);
	}
	if(playerClass === "Mage"){
		var self = createCharacter('player','Player',TowerFloor1.spawnPointX,TowerFloor1.spawnPointY,playerWidth,playerHeight,Img.Mage,18,18,5,8,8);
		setNonEnemyStats(12,18);
		determineAffinities(1.4,2.2,0.6,1.8,0.8,0.8);
	}
	if(playerClass === "Ranger"){
		var self = createCharacter('player','Player',TowerFloor1.spawnPointX,TowerFloor1.spawnPointY,playerWidth,playerHeight,Img.Ranger,19,19,11,6,10);
		setNonEnemyStats(6,8);
		determineAffinities(1.4,0.7,1.5,0.5,0.7,1.3);
	}
	// x,y position where 0,0 is

	//stuff that will remain same regardless of class
	self.level = 1;
	self.xp = 0;
	self.floorlevel = 1;
	self.gold = 0;
	self.potionCount = 5;
	self.battlingEnemy = false;

	self.battleX = 60;
	self.battleY = 220;
	self.battleWidth = 250;
	self.battleHeight = 250;

	// this is where the player will gain the ability to unlock more spells and attacks
	self.healUnlocked = false;

	//selection position for things like selecting battle tactic or different shop items
	self.selectionPosition = 1;
	self.magicSelectionPosition = 1;
	self.magicSelectionPositionMax = 1;
	//self.artSelectionPosition = 1;
	//self.artSelectionPositionMax = 1;                  Relevant for arts selection
	self.upgradePoints = 0;
	self.levelUpSelectionPosition = 1;
	self.manaRecharge = 0;
	self.manaRechargeTime = 10;
	self.healthRecharge = 0;
	self.healthRechargeTime = 10;

	self.pressingDown = false;
	self.pressingUp = false;
	self.pressingLeft = false;
	self.pressingRight = false;

	self.movedright = false;
	self.movedleft = false;
	self.movedup = false;
	self.moveddown = false;

	timeUntilMovement = 0

	self.updatePosition = function(){

		if(timeUntilMovement > 0){
			return;
		};
		//make these self, not player at some point
		if(timeUntilMovement === 0){
			if(player.movedright || player.movedleft || player.movedup || player.moveddown){
				player.movedright = false;
				player.movedleft = false;
				player.movedup = false;
				player.moveddown = false;
				// determine if the player will run into an enemy that turn if the player is in gameState.inGame
				var enemyAppear = Math.random();
				if(enemyAppear < enemyEncounterRate){
					transitionBarX = -800;
					inactiveTime = 20;
					enterInTransition();
					return;
				}
				var findPotion = Math.random();
				if(findPotion < findPotionRate){
					self.potionCount += 1;

				}
				self.manaRecharge += 1;
				if(self.manaRecharge >= self.manaRechargeTime && self.mana < self.maxMana){
					self.mana += 1;
					self.manaRecharge = 0;
				}
				self.healthRecharge += 1;
				if(self.healthRecharge >= self.healthRechargeTime && self.hp < self.maxhp){
					self.hp += 1
					self.healthRecharge = 0;
				}
			}
		};

		var leftBumper = {x:self.x - TILE_SIZE , y: self.y};
		var rightBumper = {x:self.x + TILE_SIZE,y:self.y};
		var upBumper = {x:self.x,y:self.y - TILE_SIZE};
		var downBumper = {x:self.x,y:self.y + TILE_SIZE};

		if(self.pressingRight && !Maps.activeMap.isPositionWall(rightBumper)){
			timeUntilMovement = 8; //changed from 8
			self.movedright = true;
		};
		if(self.pressingLeft && !Maps.activeMap.isPositionWall(leftBumper)){
			timeUntilMovement = 8;
			self.movedleft = true;
		};
		if(self.pressingDown && !Maps.activeMap.isPositionWall(downBumper)){
			timeUntilMovement = 8;
			self.moveddown = true;
		};
		if(self.pressingUp && !Maps.activeMap.isPositionWall(upBumper)){	
			timeUntilMovement = 8;
			self.movedup = true;
		};
	};

	self.drawInGame = function(){
		ctx.save();
		// these next two lines would be used for non player characters
		var x = self.x - player.x
		var y = self.y - player.y;
		//this puts the player in the middle of the screen
		x += WIDTH/2;
		y += HEIGHT/2;
		//centers the drawing on the pixel by essentially centering the image so the middle of the image
		//is at the center point
		x -= self.width/2;
		y -= self.height/2;

		ctx.drawImage(self.image,0,0,self.image.width,self.image.height,x,y,self.width,self.height);
		//console.log(self.width+" is the players width when drawn");
		//console.log(self.height+" is the players height when drawn")
		ctx.restore();
	}

	self.upperStatBar = function(){
		// This creates a stat bar displaying some info on the player
		// Look at html documentation for understanding, basicallly #FFFFFF and #000000 are colors
		// and the other stuff is niche stuff used to make the canvas display the upper stat bar
		ctx.save();
		ctx.textAlign = "left";
		ctx.stroke();
		ctx.font = '30px arial';
		ctx.lineWidth="2";
		ctx.strokeStyle="black";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0,0,WIDTH,45); 
		ctx.fillStyle = "#000000";
		ctx.stroke();
		ctx.fillText(player.hp+" / "+player.maxhp+" hp",10,30);
		//ctx.fillText("Gold: "+player.gold,200,30); this will come back when gold has relevance
		ctx.fillText("Potions: "+player.potionCount,250,30);
		ctx.fillText("Floor "+ player.floorlevel,670,30);
		ctx.font = "12px arial";
		ctx.fillText("(Press shift to display/hide stats)",490, 40);
		ctx.restore();
	}

	self.showAllStats = function(){
		ctx.textAlign = "left";
		if(showStats === true && inactiveTime > 0){
			statsBarPositionX += 13;
		}
		if(showStats === false && inactiveTime > 0){
			statsBarPositionX -= 13;
		}
		ctx.stroke;
		ctx.font = '30px Bold';
		ctx.fillStyle = "#FFFFFF";
		ctx.font = '30px arial';
		ctx.lineWidth="2";
		ctx.strokeStyle="black";
		ctx.fillRect(0,65,300 + statsBarPositionX,515); 
		ctx.fillStyle = "#000000";
		ctx.stroke();
		ctx.fillText("Level "+player.level,100 + statsBarPositionX,100);
		ctx.fillText(self.xp+" / ?  xp",30 + statsBarPositionX,130);
		ctx.fillText(self.hp+" / "+self.maxhp+" hp",30 + statsBarPositionX,220)
		ctx.fillText(self.mana+" / "+self.maxMana+" mana",30 + statsBarPositionX,270)
		ctx.fillText(self.attack+" Attack",30 + statsBarPositionX,320);
		ctx.fillText(self.magic+" Magic",30 + statsBarPositionX,370);
		ctx.fillText(self.defense+" Defense",30 + statsBarPositionX,420);
		ctx.fillText(self.speed+" Speed",30 + statsBarPositionX,470);

	}

	self.update = function(){
		self.updatePosition();
		

		self.drawInGame();

	}

	self.attackMovement = function(){
		//16 frames
		if(timeUntilAction > 24){
			self.battleX += 4;
			self.battleY -= 3;
		}
		else if(timeUntilAction > 16){
			self.battleX -= 4;
			self.battleY += 3;
		}
	}

	self.defendMovement = function(){
		if(timeUntilAction > 24){
			self.battleX += 2;
			self.battleY -= 1;
		}
		else if(timeUntilAction > 16){
			self.battleX -= 2;
			self.battleY += 1;
		}
	}

	self.playerDodged = function(){
		if(timeUntilAction > 24){
			self.battleX -= 2;
			self.battleY -= 1;
		}
		else if(timeUntilAction > 16){
			self.battleX += 2;
			self.battleY += 1;
		}
	}

	//skip battleState.battleIntro || battleState.playerSelection || battleState.playerUsingPotion || 
	// battleState.battleConclusion|| battleState.playerDeath || battleState.playerDefendEnemyMissAttack ||
	// battleState.playerMagicalBlast || battleState.playerMagicalBlastEnemyDefend || 
	// battleState.playerHeal || battleState.enemyUselessDefend
	self.drawInBattle = function(){
		if(battleState.playerAttack || battleState.playerAttackEnemyDefend || battleState.playerAttackEnemyCounter || battleState.playerCounterEnemyAttack){
			self.attackMovement();
		}

		if(battleState.playerDefendEnemyAttack || battleState.playerDefendEnemyMissAttack){
			self.defendMovement();
		}

		if(battleState.enemyAttack){
			self.takeDamageNoDefend();
			if(disappear === true)
				return;
		}

		if(battleState.enemyMissAttack){
			self.playerDodged();
		}


		ctx.drawImage(self.image, self.battleX,self.battleY,self.battleWidth,self.battleHeight)
	};


	return self;

}

createEnemy = function(type,name,image,maxhp,hp,attack,defense,speed,hitLandRate,defendRate,xp,gold){
	var battleX = 425;
	var battleY = 60;
	var battleWidth = 250;
	var battleHeight = 250;
	var self = createCharacter(type,name,battleX,battleY,battleWidth,battleHeight,image,maxhp,hp,attack,defense,speed)
	self.hitLandRate = hitLandRate;
	self.defendRate = defendRate
	self.xp = xp;
	self.gold = gold;

	self.battleTactic = function(){
		decision = Math.random();
		if(decision > self.defendRate){
			hitlands = Math.random();
			if(hitlands < self.hitLandRate){
				//battleState.enemyAttacked();
				self.tactic = "attack";
			}
			else{
				//battleState.enemymissesAttack();
				self.tactic = "missedAttack"
			}
		}
		else if(decision < self.defendRate){
			counterChance = Math.random();
			if(player.tactic === "attack"){
				if(counterChance <= 0.20){
					self.tactic = "counter";
					return;
				}
				else if(counterChance > 0.20)
					self.tactic = "defend";
			}
			else{
				self.tactic = "defend";
			}
		}
	}

	self.attackMovement = function(){
		//16 frames
		if(timeUntilAction > 24){
			self.battleX -= 4;
			self.battleY += 3;
		}
		else if(timeUntilAction > 16){
			self.battleX += 4;
			self.battleY -= 3;
		}
	}

	self.missAttackMovement = function(){
		if(timeUntilAction > 24){
			self.battleX -= 3;
			self.battleY += 4;
		}
		else if(timeUntilAction > 16){
			self.battleX += 3;
			self.battleY -= 4;
		}
	}

	self.defendMovement = function(){
		if(timeUntilAction > 24){
			self.battleX -= 2;
			self.battleY += 1;
		}
		else if(timeUntilAction > 16){
			self.battleX += 2;
			self.battleY -= 1;
		}
	}

	self.drawMagicalBlast = function(){
		if(battleState.playerMagicalBlast || battleState.playerMagicalBlastEnemyDefend){ // draw the magical bolt here
			//if((timeUntilAction < 24 && timeUntilAction > 20) || (timeUntilAction < 18 && timeUntilAction > 14) This one looks better
			if(timeUntilAction < 29 && timeUntilAction > 25){
				ctx.drawImage(Img.magicalBlast,self.battleX,self.battleY,self.battleWidth,self.battleHeight)
			}
				
		}
	}

	//skip battleState.battleIntro || battleState.playerSelection || battleState.playerUsingPotion || battleState.battleConclusion|| battleState.playerDeath ||
	// battleState.playerMagicalBlastEnemyDefend || battleState.playerHealEnemyAttack || battleState.enemyUselessDefend
	self.drawInBattle = function(){
		if(battleState.playerAttack || battleState.playerMagicalBlast){
			self.takeDamageNoDefend();
			if(disappear === true){
				self.drawMagicalBlast();
				return;
			}
		}

		if(battleState.playerAttackEnemyDefend || battleState.playerDefendEnemyMissAttack || battleState.playerHealEnemyDefend){
			self.defendMovement();
		}

		if(battleState.enemyAttack || battleState.playerAttackEnemyCounter || battleState.playerDefendEnemyAttack || battleState.playerCounterEnemyAttack){
			self.attackMovement();
		}

		if(battleState.playerDefendEnemyMissAttack || battleState.enemyMissAttack){
			self.missAttackMovement();
		}


		ctx.drawImage(self.image, self.battleX,self.battleY,self.battleWidth,self.battleHeight)
		self.drawMagicalBlast();

	}

	return self;

}

createCharacter = function(type,name,x,y,width,height,image,maxhp,hp,attack,defense,speed){
	var self = {
		type:type,
		name:name,
		x:x,
		y:y,
		width:width,
		height:height,
		image:image,
		maxhp:maxhp,
		hp:hp,
		attack:attack,
		defense:defense,
		speed:speed,
	}

	//place holder for variables in battle functions
	self.tactic;

	if(self.type === "enemy"){
		self.battleX = x;
		self.battleY = y;
		self.battleWidth = width;
		self.battleHeight = height;
	}

	// used to round hp after attacks
	self.roundHP = function(){
		self.hp = Math.round(self.hp);
	}

	// used to round the hp that will be displayed on the canvas battle screen
	self.roundedHP = function(){
		return Math.round(self.hp);
	}

	self.roundedMana = function(){
		return Math.round(self.mana);
	}

	self.takeDamageNoDefend = function(){
		if(timeUntilAction < 24 && timeUntilAction > 20){
			disappear = true;
		}
		else if(timeUntilAction < 18 && timeUntilAction > 14){
			disappear = true;
		}
		else{
			disappear = false;
		}
	}

	return self;
}

















