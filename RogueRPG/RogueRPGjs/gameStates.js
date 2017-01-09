// how I change the states of the game or battle

changeState = function(state, stateItem){
  for(var key in stateItem){
    if(key === state){
      stateItem[key] = true;
    }
    else{
      stateItem[key] = false;
    }
  }
};




//the different game states
var gameState = {
	homeMenu:false,
	gameIntro:false,
	inGame:false,
	inBattle:false,
	inTransition:false,
	levelUp:false,
	inMenu:false,
	inShop:false,
	inDeathScreen:false,
	endGame:false,
};

enterHomeMenu = function(){
	//player = Player();
	changeState("homeMenu",gameState);
};
enterGameIntro = function(){
	changeState("gameIntro",gameState);
};
enterGame = function(){
	//player = Player();
	changeState("inGame",gameState);
};
enterBattle = function(){
	changeState("inBattle",gameState);
};
enterInTransition = function(){
	changeState("inTransition",gameState);
};
enterLevelUp = function(){
	changeState("levelUp",gameState);
};
enterMenu = function(){
	changeState("inMenu",gameState);
};
enterShop = function(){
	changeState("inShop",gameState);
};
enterDeathScreen = function(){
	changeState("inDeathScreen",gameState);
};
enterEndGame = function(){
	changeState("endGame",gameState);
}

var gameIntroStates = {
	screen1:false,
	screen2:false,
	screen3:false,
	screen4:false,
	screen5:false,
	screen6:false,
	screen7:false,
	selectClass:false,
	screen8:false,
	finalScreen:false,
}

enterScreen1 = function(){
	changeState("screen1",gameIntroStates)
}
enterScreen2 = function(){
	changeState("screen2",gameIntroStates)
}
enterScreen3 = function(){
	changeState("screen3",gameIntroStates)
}
enterScreen4 = function(){
	changeState("screen4",gameIntroStates)
}
enterScreen5 = function(){
	changeState("screen5",gameIntroStates)
}
enterScreen6 = function(){
	changeState("screen6",gameIntroStates)
}
enterScreen7 = function(){
	changeState("screen7",gameIntroStates)
}
enterSelectClass = function(){
	classSelectionPosition = 1;
	changeState("selectClass",gameIntroStates)
}
enterScreen8 = function(){
	changeState("screen8",gameIntroStates)
}
enterFinalScreen = function(){
	changeState("finalScreen",gameIntroStates)
}


var levelUpStates = {
	chooseStat:false,
	hpUp:false,
	manaUp:false,
	attackUp:false,
	magicUp:false,
	defenseUp:false,
	speedUp:false,
	upgradesOut:false,
	learnedHeal:false,
};

enterChooseStat = function(){
	changeState("chooseStat",levelUpStates);
};
enterhpUp = function(){
	changeState("hpUp",levelUpStates);
};
entermanaUp = function(){
	changeState("manaUp",levelUpStates);
};
enterattackUp = function(){
	changeState("attackUp",levelUpStates);
};
entermagicUp = function(){
	changeState("magicUp",levelUpStates);
};
enterdefenseUp = function(){
	changeState("defenseUp",levelUpStates);
};
enterspeedUp = function(){
	changeState("speedUp",levelUpStates);
};
enterUpgradesOut = function(){
	changeState("upgradesOut",levelUpStates);
};
enterlearnedHeal = function(){
	changeState("learnedHeal",levelUpStates);
};


//the various battle states
var battleState = {
	battleIntro:true,
	playerSelection:false,
	playerMagicSelection:false,
	notEnoughMana:false,
	//if player attacks
	playerAttack:false,
	playerAttackEnemyDefend:false,
	playerAttackEnemyCounter:false,
	//if player uses magic
	playerMagicalBlast:false,
	playerMagicalBlastEnemyDefend:false,
	playerHeal:false,
	//if playerdefends
	playerDefendEnemyAttack:false,
	playerCounterEnemyAttack:false,
	playerDefendEnemyMissAttack:false,
	playerDefendEnemyDefend:false,
	//enemy turn
	enemyAttack:false,
	enemyMissAttack:false,
	enemyUselessDefend:false,
	//misc
	playerUsingPotion:false,
	battleConclusion:false,
	battleLevelUp:false,
	battleStatIncrease:false,
	battleStateLearnedHeal:false,
	playerDeath:false,
};

enterBattleIntro = function(){
	changeState("battleIntro",battleState);
};
enterPlayerSelection = function(){
	changeState("playerSelection",battleState);
};
enterPlayerMagicSelection = function(){
	changeState("playerMagicSelection",battleState);
};
enternotEnoughMana = function(){
	changeState("notEnoughMana",battleState);
};

enterPlayerMagicalBlast = function(){
	changeState("playerMagicalBlast",battleState);
};
enterPlayerMagicalBlastEnemyDefend = function(){
	changeState("playerMagicalBlastEnemyDefend",battleState);
};
enterPlayerHeal = function(){
	changeState("playerHeal",battleState);
};


enterPlayerAttack = function(){
	changeState("playerAttack",battleState);
};
enterPlayerAttackEnemyDefend = function(){
	changeState("playerAttackEnemyDefend",battleState);
};
enterPlayerAttackEnemyCounter = function(){
	changeState("playerAttackEnemyCounter",battleState);
};


enterPlayerCounterEnemyAttack = function(){
	changeState("playerCounterEnemyAttack",battleState);
};
enterPlayerDefendEnemyAttack = function(){
	changeState("playerDefendEnemyAttack",battleState);
};
enterPlayerDefendEnemyMissAttack = function(){
	changeState("playerDefendEnemyMissAttack",battleState);
};
enterPlayerDefendEnemyDefend = function(){
	changeState("playerDefendEnemyDefend",battleState);
};


enterEnemyAttack = function(){
	changeState("enemyAttack",battleState);
};
enterEnemyMissAttack = function(){
	changeState("enemyMissAttack",battleState);
};
enterEnemyUselessDefend = function(){
	changeState("enemyUselessDefend",battleState);
};


enterPlayerUsingPotion = function(){
	changeState("playerUsingPotion",battleState);
};
enterBattleConclusion = function(){
	changeState("battleConclusion",battleState);
};
enterBattleLevelUp = function(){
	changeState("battleLevelUp",battleState);
};
enterBattleStatIncrease = function(){
	changeState("battleStatIncrease",battleState);
};
enterBattleStateLearnedHeal = function(){
	changeState("battleStateLearnedHeal",battleState);
};
enterPlayerDeath = function(){
	timeUntilAction = 32;
	changeState("playerDeath",battleState);
};
	









