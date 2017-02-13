
drawbattle = function(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	ctx.stroke;
	ctx.font = '30px Bold';
	ctx.textAlign = "left";
	//ctx.fillRect(x,y,width,height)
	//health bar black background and black bar on bottom
	ctx.fillStyle = "#000000";
	ctx.fillRect(20,40,300,50);
	ctx.fillRect(450,430,300,50);
	ctx.fillRect(0,500,800,100);

	//drawing the player and enemy images, moral of story this is 
	//the position that I want them at
	//ctx.fillRect(100,280,200,200); // player position
	//ctx.fillRect(425,60,250,250); // enemy position

	//health bar and mana bar white filling
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(35,57,250,20);
	ctx.fillRect(465,447,250,20);
	ctx.fillRect(465,472,250,6);

	//health bar red that shows remaining health
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(35,57,Math.floor((currentEnemy.hp/currentEnemy.maxhp)*250),20);
	ctx.fillRect(465,447,Math.floor((player.hp/player.maxhp)*250),20);

	//mana bar blue that shows remaining mana
	ctx.fillStyle = "#0000FF"
	ctx.fillRect(465,472,Math.floor((player.mana/player.maxMana)*250),6)

	ctx.fillStyle = "#000000";
	//ctx.fillText(text,x,y);
	//enemy name, player name, and player health in numbers
	ctx.fillText(currentEnemy.name,50,30);
	ctx.fillText(player.name,480,420);
	ctx.font = "17px Bold";
	ctx.fillText(player.roundedHP()+" / "+player.maxhp+"  hp",600,420);
	ctx.fillText(player.roundedMana()+" / "+player.maxMana+"  mana",600,497);
	ctx.font = "30px Bold";
	variableBattleText();
}



variableBattleText = function(){
	if(battleState.battleIntro){
		ctx.textAlign = "center";
		ctx.fillStyle = ("#FFFFFF");
		ctx.font = "40px Bold";
		ctx.fillStyle = ("#FFFFFF");
		ctx.fillText("A " + currentEnemy.name + " has appeared!",WIDTH/2,560);
		promptContinue();
		ctx.restore();
		return;
	}
	// redo this bad boy
	if(battleState.playerSelection){
		ctx.save();
		ctx.textAlign="left";
		ctx.fillStyle = ("#FFFFFF");
		ctx.font = "40px Bold";
		ctx.fillText("Attack",90,560);
		ctx.fillText("Magic",250,560);
        ctx.fillText("Defend",410,560);
        ctx.fillText("Potion",570,560)
        if(player.selectionPosition === 1){
        	ctx.fillText(">",55,560);
        }
        if(player.selectionPosition === 2){
        	ctx.fillText(">",215,560);
        }
        if(player.selectionPosition === 3){
        	ctx.fillText(">",375,560);
        }
        if(player.selectionPosition === 4){
        	ctx.fillText(">",535,560)
        }
		promptContinue();
        ctx.restore();
        return;
	}

	if(battleState.playerMagicSelection){
		ctx.save();
		ctx.textAlign="left";
		ctx.fillStyle = ("#FFFFFF");
		ctx.font = "25px Bold";
		ctx.fillText("Magical Burst(1)",70,560);
		if(player.healUnlocked === true)
			ctx.fillText("Heal(3)",275,560);
		if(player.magicSelectionPosition === 1)
			ctx.fillText(">",50,560);
		if(player.magicSelectionPosition === 2)
			ctx.fillText(">",255,560);
		ctx.font = "20px Bold";
		ctx.fillText("Spell Name(Mana Cost)",30,520);
		promptBack();
		promptContinue();
        ctx.restore();
        return;
	}

	if(battleState.notEnoughMana){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","Sorry, but you do not have enough mana to cast that spell.");
		}
	}

	if(battleState.playerAttack){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","You attacked the "+currentEnemy.name+", dealing "+damageDealt+" damage!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				currentEnemy.hp -= (damageDealt/damageAnimationDuration);
				bringHealthTo0();
			}
		}
	}
	if(battleState.playerAttackEnemyDefend){
		if(timeUntilAction <= 24){
			standardBattleText("20px Bold","You attacked the "+currentEnemy.name+", but it defended, reducing the hit to "+damageDealt+" damage!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				currentEnemy.hp -= (damageDealt/damageAnimationDuration);
				bringHealthTo0();
			}
		}
	}

	if(battleState.playerAttackEnemyCounter){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","You attacked the "+currentEnemy.name+", but it countered, dealing "+counterDamageDealt+" damage!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				//currentEnemy.hp -= (damageDealt/damageAnimationDuration); this was when the player still did damage if countered
				player.hp -= (counterDamageDealt/damageAnimationDuration);
				bringHealthTo0();
			}
		}
	}

	if(battleState.playerDefendEnemyAttack){
		if(timeUntilAction <= 24){
			standardBattleText("20px Bold","The "+currentEnemy.name+" attacked, but you defended, reducing the hit to "+damageDealt+" damage!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				player.hp -= (damageDealt/damageAnimationDuration);
				bringHealthTo0();
			}
		}
	}

	if(battleState.playerMagicalBlast){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","You used Magical Burst, dealing "+damageDealt+" damage!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				currentEnemy.hp -= (damageDealt/damageAnimationDuration);
				player.mana -= (manaCost/damageAnimationDuration);
				bringHealthTo0();
			}
		}
	}

	if(battleState.playerMagicalBlastEnemyDefend){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","The "+currentEnemy.name+" defended, reducing Magical Burst to "+damageDealt+" damage!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				currentEnemy.hp -= (damageDealt/damageAnimationDuration);
				player.mana -= (manaCost/damageAnimationDuration);
				bringHealthTo0();
			}
		}
	}

	if(battleState.playerHeal){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","You cast heal, recovering "+healAmount+" health!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				player.hp += (healAmount/damageAnimationDuration);
				player.mana -= (manaCost/damageAnimationDuration);
			}
		}
	}

	if(battleState.playerCounterEnemyAttack){
		if(timeUntilAction <= 24){
			standardBattleText("25px Bold","The "+currentEnemy.name+" attacked you, but you countered, dealing "+counterDamageDealt+" damage!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				//player.hp -= (damageDealt/damageAnimationDuration); back when the one countering still took damage
				currentEnemy.hp -= (counterDamageDealt/damageAnimationDuration);
				bringHealthTo0();
			}
		}
	}

	if(battleState.playerDefendEnemyMissAttack){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","You defended, but the attack by the "+currentEnemy.name+" missed!");
		}
	}

	if(battleState.playerDefendEnemyDefend){
		if(timeUntilAction <= 24){
			standardBattleText("25px Bold","Both you and the "+currentEnemy.name+" defended, and thus no damage was dealt!");
		}
	}

	if(battleState.enemyAttack){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","The "+currentEnemy.name+" attacked you, dealing "+damageDealt+" damage!");
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				player.hp -= (damageDealt/damageAnimationDuration);
				bringHealthTo0();
			}
		}
	}

	if(battleState.enemyMissAttack){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","The "+currentEnemy.name+" attacked you, but missed!");
		}
	}

	if(battleState.enemyUselessDefend){
		if(timeUntilAction <= 24){
			standardBattleText("26px Bold","The "+currentEnemy.name+" defended, but it had no effect.");
		}
	}

	if(battleState.playerUsingPotion){
		if(timeUntilAction <= 24){
			if(potionCountBeforePotionUse > 0)
				standardBattleText("25px Bold","You used a potion, recovering some health. You have "+player.potionCount+" remaining.");
			if(potionCountBeforePotionUse === 0)
				standardBattleText("25px Bold","You reach for a potion, but you have ran out!")
			if(timeUntilAction <= damageAnimationDuration && timeUntilAction > 0){
				if(potionCountBeforePotionUse > 0){
					player.hp += (potionHealAmount/damageAnimationDuration);
				}
			}
		}
	}

	if(battleState.battleConclusion){
		if(timeUntilAction <= 24){
			standardBattleText("26px Bold","You have slain the "+currentEnemy.name+"! You gained "+currentEnemy.xp+" xp!");
			// and "+currentEnemy.gold+" gold! for when there is gold use in the game
		}
	}

	if(battleState.battleLevelUp){
		if(timeUntilAction > 24)
			return;
		ctx.save();
		ctx.font = "25px Bold";
		ctx.fillStyle = ("#FFFFFF");
		ctx.textAlign="center"; 
		ctx.fillText("Congratulations, you have leveled up!",WIDTH/2,530);
		ctx.fillText("You are now level "+player.level+"!",WIDTH/2,570);
		promptContinue();
        ctx.restore();
	}

	if(battleState.battleStateLearnedHeal){
		if(timeUntilAction > 24)
			return;
		ctx.save()
		ctx.font = "25px Bold";
		ctx.fillStyle = ("#FFFFFF");
		ctx.textAlign = "center";
		ctx.fillText("After an epiphany while reading magical works you uncover a new spell,",WIDTH/2,530);
        ctx.fillText("you can now use the spell heal!",WIDTH/2,570);
        promptContinue();
        ctx.restore();
	}

	if(battleState.playerDeath){
		if(timeUntilAction <= 24){
			standardBattleText("30px Bold","You have been slain by the "+currentEnemy.name+". . .");
		}
	}
}

standardBattleText = function(fontsize,text){
	ctx.save();
	ctx.textAlign="center";
	ctx.font = fontsize;
	ctx.fillStyle = ("#FFFFFF");
	ctx.fillText(text,WIDTH/2,560);
	promptContinue();
	ctx.restore();
}

drawStatIncrease = function(increase,Yposition){
	if(increase === 0)
		return;
	ctx.fillText("+ "+increase,190,Yposition);
}

drawLevelUpStatIncreases = function(){
	ctx.save();
	if(timeUntilAction > 24){
		ctx.restore();
		return;
	}
	if(timeUntilAction === 24){
		player.hp += hpIncrease;
		player.maxhp += hpIncrease;
		player.mana += manaIncrease;
		player.maxMana += manaIncrease;
		player.attack += attackIncrease;
		player.magic += magicIncrease;
		player.defense += defenseIncrease;
		player.speed += speedIncrease;
	}
	ctx.fillStyle = ("#000000");
	ctx.fillRect(0,150,250,320);

	ctx.font = "23px Bold";
	ctx.fillStyle = ("#FFFFFF");
	ctx.textAlign="center";
	if(battleState.battleStatIncrease){
		ctx.fillText("Your stats have increased by the amount listed above!",WIDTH/2,530);
		ctx.fillText("You have also acquired 2 training points to spend!",WIDTH/2,570);
	}
	
	ctx.font = "26px Bold";
	ctx.textAlign = "left";
	ctx.fillText(player.hp+" / "+player.maxhp+" hp",20,180);
	ctx.fillText(player.mana+" / "+player.maxMana+" mana",20,220);
	ctx.fillText(player.attack+" Atk",20,260);
	ctx.fillText(player.magic+" Mag",20,300);
	ctx.fillText(player.defense+" Def",20,340);
	ctx.fillText(player.speed+" Spd",20,380);

	drawStatIncrease(hpIncrease,180);
	drawStatIncrease(manaIncrease,220);
	drawStatIncrease(attackIncrease,260);
	drawStatIncrease(magicIncrease,300);
	drawStatIncrease(defenseIncrease,340);
	drawStatIncrease(speedIncrease,380);

	promptContinue();
	ctx.restore();
}





