document.onkeydown = function(event){
	if(event.keyCode === 68 || event.keyCode === 39){ // d/right arrow
		if(gameIntroStates.selectClass && classSelectionPosition < 3){
			classSelectionPosition += 1;
		}
		player.pressingRight = true;
		player.pressingDown = false;
		player.pressingLeft = false;
		player.pressingUp = false;
		if(player.selectionPosition < 4 && battleState.playerSelection){
			player.selectionPosition += 1
		}
		if(player.magicSelectionPosition < player.magicSelectionPositionMax && battleState.playerMagicSelection){
			player.magicSelectionPosition += 1;
		}
	}
	else if(event.keyCode === 83 || event.keyCode === 40){	// s/down arrow
		player.pressingRight = false;
		player.pressingDown = true;
		player.pressingLeft = false;
		player.pressingUp = false;
		if(player.levelUpSelectionPosition < 6){
			player.levelUpSelectionPosition += 1
		}
	}
	else if(event.keyCode === 65 || event.keyCode === 37){ // a/left arrow
		if(gameIntroStates.selectClass && classSelectionPosition > 1){
			classSelectionPosition -= 1;
		}
		player.pressingRight = false;
		player.pressingDown = false;
		player.pressingLeft = true;
		player.pressingUp = false;
		if(player.selectionPosition > 1){
			player.selectionPosition -= 1
		}
		if(player.magicSelectionPosition > 1){
			player.magicSelectionPosition -= 1;
		}
	}
	else if(event.keyCode === 87 || event.keyCode === 38){ // w/up arrow
		player.pressingRight = false;
		player.pressingDown = false;
		player.pressingLeft = false;
		player.pressingUp = true;
		if(player.levelUpSelectionPosition > 1){
			player.levelUpSelectionPosition -= 1
		}
	}
	else if(event.keyCode === 13){ // enter
		eventsOnEnterKeyDown();
	}

	else if(event.keyCode === 16){ // shift
		if(inactiveTime === 0){
			if(showStats === false){
				if(timeUntilMovement === 0){
					showStats = true;
					inactiveTime = 24;
				}
			}
			else if(showStats === true){
				showStats = false;
				inactiveTime = 24;
			}
		}
	}

	else if(event.keyCode === 8){ // backspace
		if(battleState.playerMagicSelection){
			enterPlayerSelection();
		}
	}
}

eventsOnEnterKeyDown = function(){
	if(gameState.homeMenu){
		enterGameIntro();
		enterScreen1();
		inactiveTime = 32;
		return;
	}
	if(gameState.gameIntro){
		gameIntroOptions();
		return;
	}
	if(gameState.inDeathScreen || gameState.endGamea){
		enterHomeMenu();
		return;
	}
	if(gameState.inBattle){
		battleStateOptions();
		return;
	}
	if(gameState.levelUp){
		levelUpStateOptions();
		return;
	}
}


gameIntroOptions = function(){
	if(inactiveTime > 0)
		return;
	if(gameIntroStates.screen1){
		enterScreen2();
		inactiveTime = 32;
		return;
	}
	if(gameIntroStates.screen2){
		inactiveTime = 32;
		enterScreen3();
		return;
	}
	if(gameIntroStates.screen3){
		inactiveTime = 32;
		enterScreen4();
		return;
	}
	if(gameIntroStates.screen4){
		inactiveTime = 32;
		enterScreen5();
		return;
	}
	if(gameIntroStates.screen5){
		inactiveTime = 32;
		enterScreen6();
		return;
	}
	if(gameIntroStates.screen6){
		inactiveTime = 32;
		enterScreen7();
		return;
	}
	if(gameIntroStates.screen7){
		inactiveTime = 32;
		enterSelectClass();
		return;
	}
	if(gameIntroStates.selectClass){
		inactiveTime = 32;
		enterScreen8();
		//where I put code to determine player class
		if(classSelectionPosition === 1)
			playerClass = "Warrior";
		if(classSelectionPosition === 2)
			playerClass = "Mage";
		if(classSelectionPosition === 3)
			playerClass = "Ranger";
		return;
	}
	if(gameIntroStates.screen8){
		inactiveTime = 32;
		enterFinalScreen();
		return;
	}
	if(gameIntroStates.finalScreen){
		gameIntroStates.finalScreen = false;
		startNewGame();
	}
}

battleStateOptions = function(){
	//what enter triggers if in battle intro
	if(battleState.battleIntro){
		enterPlayerSelection();
		return;
	}
	//what enter triggers if in player selection state in Battle
	if(battleState.playerSelection){
		if(player.selectionPosition === 1){
			player.tactic = "attack";
			currentEnemy.battleTactic();
		}
		//magic
		else if(player.selectionPosition === 2){
			//load screen with magic options
			player.magicSelectionPosition = 1;
			enterPlayerMagicSelection();
			return;
		}
		else if(player.selectionPosition === 3){
			player.tactic = "defend";
			currentEnemy.battleTactic();
		}
		else if(player.selectionPosition === 4){
			player.tactic = "potion";
			potionCountBeforePotionUse = player.potionCount;
			if(player.potionCount > 0)
				player.potionCount -= 1;
		}
		battleLogicPlayer();
	}
	//what triggers if the player is now in the magic selection screen
	if(battleState.playerMagicSelection){
		if(player.magicSelectionPosition === 1){ // magical burst, mana cost is 2
			if(player.mana < magicalBlastManaCost){
				enternotEnoughMana();
				timeUntilAction = 32;
				return;
			}
			if(player.mana >= magicalBlastManaCost){
				player.tactic = "magical blast";
				currentEnemy.battleTactic();
				battleLogicPlayer();
				return;
			}
		}
		else if(player.magicSelectionPosition === 2){
			if(player.mana < healManaCost){
				enternotEnoughMana();
				timeUntilAction = 32;
			}
			else if(player.mana >= 4){
				player.tactic = "heal";
				currentEnemy.battleTactic();
				battleLogicPlayer();
			}
		}
	}

	if(battleState.notEnoughMana){
		if(timeUntilAction > 0)
			return;
		enterPlayerSelection();
	}

	//What happens when the enemy attacks first
	if((battleState.enemyAttack || battleState.enemyMissAttack) && enemyAttackFirst){
		if(timeUntilAction > 0)
			return;
		player.roundHP();
		if(player.hp === 0)
			enterPlayerDeath();
		else if(currentEnemy.hp > 0)
			battleLogicPlayer();
	}

	//what happens when player attacks second
	if((battleState.playerAttack || battleState.playerMagicalBlast) && enemyAttackFirst){
		if(timeUntilAction > 0)
			return;
		currentEnemy.roundHP();
		enemyAttackFirst = false;
		if(currentEnemy.hp > 0){
			enterPlayerSelection();
		}
		else if(currentEnemy.hp === 0){
			timeUntilAction = 32;
			enterBattleConclusion();
		}
	}

	//what enter triggers if player attacked
	if(battleState.playerAttack || battleState.playerMagicalBlast || battleState.playerHeal){
		if(timeUntilAction > 0)
			return;
		currentEnemy.roundHP();
		if(currentEnemy.hp > 0){
			battleLogicEnemy();
		}else{
			timeUntilAction = 32;
			enterBattleConclusion();
		}
	}
	if(battleState.playerAttackEnemyDefend || battleState.playerAttackEnemyCounter || battleState.playerMagicalBlastEnemyDefend || battleState.playerDefendEnemyAttack || battleState.playerCounterEnemyAttack || battleState.playerDefendEnemyMissAttack || battleState.enemyAttack || battleState.enemyMissAttack || battleState.playerDefendEnemyDefend || battleState.enemyUselessDefend){
		if(timeUntilAction > 0)
			return;
		if(player.hp === 0){
			enterPlayerDeath();
		}else if(currentEnemy.hp > 0){
			enterPlayerSelection();
		}else if(currentEnemy.hp === 0){
			timeUntilAction = 32;
			enterBattleConclusion();
		}
		currentEnemy.roundHP();
		player.roundHP();
	}
	if(battleState.playerUsingPotion){
		if(timeUntilAction > 0)
			return;
		enterPlayerSelection();
		player.roundHP();
	}
	if(battleState.battleConclusion){
		if(timeUntilAction > 0)
			return;
		player.xp += currentEnemy.xp;
		player.gold += currentEnemy.gold;
		if(checkIfLevelUp()){
			enterBattleLevelUp();
		}
		else{
			enterGame();
			player.battlingEnemy = false;
		}
	}
	if(battleState.battleLevelUp){
		if(timeUntilAction > 0)
			return;
		enterBattleStatIncrease();
		timeUntilAction = 32;
	}
	if(battleState.battleStatIncrease){
		if(timeUntilAction > 0)
			return;
		if(player.healUnlocked === false && player.magic >= 20){
			enterBattleStateLearnedHeal();
			player.healUnlocked = true;
			player.magicSelectionPositionMax = 2;
			return;
		}
		else{
			player.levelUpSelectionPosition = 1;
			enterLevelUp();
			enterChooseStat();
			player.battlingEnemy = false;
		}
	}
	if(battleState.battleStateLearnedHeal){
		if(timeUntilAction > 0)
			return;
		player.levelUpSelectionPosition = 1;
		enterLevelUp();
		enterChooseStat();
		player.battlingEnemy = false;
	}
	if(battleState.playerDeath){
		if(timeUntilAction > 0)
			return;
		enterDeathScreen();
	}
}

levelUpStateOptions = function(){
	if(levelUpStates.chooseStat){
		// enter logic here for different positions of level up self.levelUpSelectionPosition
		if(player.levelUpSelectionPosition === 1){
			player.hp += 2;
			player.maxhp += 2;
			enterhpUp();
		}
		if(player.levelUpSelectionPosition === 2){
			player.mana += 2;
			player.maxMana += 2;
			entermanaUp();
		}
		if(player.levelUpSelectionPosition === 3){
			player.attack += 1;
			enterattackUp();
		}
		if(player.levelUpSelectionPosition === 4){
			player.magic += 1;
			entermagicUp();
		}
		if(player.levelUpSelectionPosition === 5){
			player.defense += 1;
			enterdefenseUp();
		}
		if(player.levelUpSelectionPosition === 6){
			player.speed += 1;
			enterspeedUp();
		}
		player.upgradePoints -= 1;
		timeUntilAction = 32;
		return;
	}
	if(levelUpStates.hpUp || levelUpStates.manaUp || levelUpStates.attackUp || levelUpStates.magicUp || levelUpStates.defenseUp || levelUpStates.speedUp || levelUpStates.learnedHeal){
		if(timeUntilAction > 0)
			return;
		if(player.upgradePoints > 0){
			enterChooseStat();
		}
		else if(player.upgradePoints <= 0){
			enterUpgradesOut();
			timeUntilAction = 32;
		}
		if(player.healUnlocked === false && player.magic >= 20){
			enterlearnedHeal();
			player.healUnlocked = true;
			player.magicSelectionPositionMax = 2;
		}
		return;
	}
	if(levelUpStates.upgradesOut){
		if(timeUntilAction > 0)
			return;
		enterGame();
		levelUpStates.upgradesOut = false;
	}
}


document.onkeyup = function(event){
	if(event.keyCode === 68 || event.keyCode === 39)	// d/right arrow
		player.pressingRight = false;
	else if(event.keyCode === 83 || event.keyCode === 40)	// s/down arrow
		player.pressingDown = false;
	else if(event.keyCode === 65 || event.keyCode === 37) // a/left arrow
		player.pressingLeft = false;
	else if(event.keyCode === 87 || event.keyCode === 38) // w/up arrow
		player.pressingUp = false;
	//else if(event.keyCode === 13) // enter
}








