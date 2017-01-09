bringHealthTo0 = function(){
	if(player.hp < 0){
		player.hp = 0
	}
	if(currentEnemy.hp < 0){
		currentEnemy.hp = 0
	}
}

checkIfDamageOver0 = function(){
	if(damageDealt <= 0){
		damageDealt = 1;
	}
}

battleLogicPlayer = function(){
	// possible outcomes if player chooses to attack
	if(player.tactic === "attack" && enemyAttackFirst === false){
		if(currentEnemy.tactic === "attack" || currentEnemy.tactic === "missedAttack"){
			if(player.speed >= currentEnemy.speed){
				enterPlayerAttack();
				damageDealt = Math.floor(player.attack - (currentEnemy.defense/2));
				checkIfDamageOver0();
			}
			else if(player.speed < currentEnemy.speed){
				enemyAttackFirst = true;
				battleLogicEnemy();
			}
			timeUntilAction = 32;
		}
		else if(currentEnemy.tactic === "counter"){
			enterPlayerAttackEnemyCounter();
			damageDealt = (currentEnemy.attack - (player.defense/2));
			checkIfDamageOver0();
			counterDamageDealt = Math.floor(damageDealt * 1.5);
			timeUntilAction = 32;
		}
		else if(currentEnemy.tactic === "defend"){
			enterPlayerAttackEnemyDefend();
			damageDealt = Math.floor((player.attack - (currentEnemy.defense/2))/4);
			checkIfDamageOver0();
			timeUntilAction = 32;
		}
	}

	//possible outcomes if player chooses to defend
	else if(player.tactic === "defend"){
		if(currentEnemy.tactic === "attack"){
			damageDealt = Math.floor((currentEnemy.attack - (player.defense/2))/4);
			checkIfDamageOver0();
			timeUntilAction = 32;
			counterChance = Math.random();
			if(counterChance < 0.20){
				enterPlayerCounterEnemyAttack();
				damageDealt = (player.attack - (currentEnemy.defense/2));
				counterDamageDealt = Math.floor(damageDealt * 1.5);
				return;
			}
			else if(counterChance > 0.20){
				enterPlayerDefendEnemyAttack();
			}
		}
		else if(currentEnemy.tactic === "missedAttack"){
			enterPlayerDefendEnemyMissAttack();
			timeUntilAction = 32;
		}
		else if(currentEnemy.tactic === "defend"){
			enterPlayerDefendEnemyDefend();
			timeUntilAction = 32;
		}
	}

	// possible outcomes if player chooses to use a potion
	else if(player.tactic === "potion"){
		enterPlayerUsingPotion();
		potionHealAmount = Math.floor(player.maxhp / 5)
		if((player.hp + potionHealAmount) > player.maxhp){
			potionHealAmount = (player.maxhp-player.hp);
		}
		timeUntilAction = 32;
	}

	// possible outcomes if player chooses to use magical blast
	else if(player.tactic === "magical blast" && enemyAttackFirst === false){
		if(currentEnemy.tactic === "attack" || currentEnemy.tactic === "missedAttack"){
			if(player.speed >= currentEnemy.speed){
				enterPlayerMagicalBlast();
				damageDealt = Math.floor(player.magic - (currentEnemy.defense/3))
				checkIfDamageOver0();
			}
			else if(player.speed < currentEnemy.speed){
				enemyAttackFirst = true;
				battleLogicEnemy();
			}
			timeUntilAction = 32;
		}
		else if(currentEnemy.tactic === "defend" || currentEnemy.tactic === "counter"){
			enterPlayerMagicalBlastEnemyDefend();
			damageDealt = Math.floor((player.magic - (currentEnemy.defense/2))/3);
			checkIfDamageOver0();
			timeUntilAction = 32;
		}
		manaCost = magicalBlastManaCost;
	}

	// possible outcomes if player chooses to use heal
	else if(player.tactic === "heal"){
		healAmount = Math.floor(player.magic/2)
		if((player.hp + healAmount) > player.maxhp){
			healAmount = (player.maxhp-player.hp);
		}
		timeUntilAction = 32;
		manaCost = healManaCost;
		enterPlayerHeal();
	}

	//what will occur if the player is attacking second
	else if(enemyAttackFirst){
		if(player.tactic === "attack"){
			enterPlayerAttack();
			damageDealt = Math.floor(player.attack - (currentEnemy.defense/2))
			checkIfDamageOver0();
		}
		if(player.tactic === "magical blast"){
			enterPlayerMagicalBlast();
			damageDealt = Math.floor(player.magic - (currentEnemy.defense/3))
			checkIfDamageOver0();
		}
		timeUntilAction = 32;
	}
}

battleLogicEnemy = function(){
	//These mention only the occurences that would instigate this function, for if the enemy never defends this wouldn't be called
	if(currentEnemy.tactic === "attack"){
		timeUntilAction = 32;
		enterEnemyAttack();
		damageDealt = Math.floor(currentEnemy.attack - (player.defense/2));
		checkIfDamageOver0();
	}
	if(currentEnemy.tactic === "missedAttack"){
		timeUntilAction = 32;
		enterEnemyMissAttack();
	}
	//In case the enemy defends and it is ineffective
	if(currentEnemy.tactic === "defend"){
		timeUntilAction = 32;
		enterEnemyUselessDefend();
	}
}