//Levels and the xp required to level up to the next level

var levelUpPoints = {
	1:20,
	2:40,
	3:80,
	4:120,
	5:200,
	6:350,
	7:600,
	8:1000,
}

checkIfLevelUp = function(){
	for(var level in levelUpPoints){
		if(level == player.level){
			if(player.xp >= levelUpPoints[level]){
				calculateLevelUpIncreases();
				player.level += 1;
				player.xp = 0;
				player.levelUpSelectionPosition = 1;
				player.upgradePoints = 2;
				timeUntilAction = 32;
				return true;
			}
			return false;
		}
	}
}

calculateLevelUpIncreases = function(){
	hpIncrease = increaseAmount(player.hpAffinity);
	manaIncrease = increaseAmount(player.manaAffinity);
	attackIncrease = increaseAmount(player.attackAffinity);
	magicIncrease = increaseAmount(player.magicAffinity);
	defenseIncrease = increaseAmount(player.defenseAffinity);
	speedIncrease = increaseAmount(player.speedAffinity);
}
increaseAmount = function(x){
	var amount = 0;
	while(x >= 1){
		amount += 1;
		x -= 1;
	}
	if(Math.random() < x)
		amount += 1;
	return amount;
};


updateLevelUp = function(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	ctx.save();
	ctx.stroke;
	ctx.textAlign = "left";
	ctx.font = '30px Bold';
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,450,800,150);//lower black bar
	ctx.drawImage(player.image,450,100,300,300); //player image
	ctx.fillText("Training Points: "+player.upgradePoints, 500, 40);
	ctx.fillText(player.hp+" / "+player.maxhp+" hp", 120, 80);
	ctx.fillText(player.mana+" / "+player.maxMana+" mana", 120, 130);
	ctx.fillText(player.attack+" attack", 120, 180);
	ctx.fillText(player.magic+" magic", 120, 230);
	ctx.fillText(player.defense+" defense", 120, 280);
	ctx.fillText(player.speed+" speed", 120, 330);
	ctx.fillText("+ 2",350,80);
	ctx.fillText("+ 2",350,130);
	ctx.fillText("+ 1",350,180);
	ctx.fillText("+ 1",350,230);
	ctx.fillText("+ 1",350,280);
	ctx.fillText("+ 1",350,330);
	if(player.levelUpSelectionPosition === 1)
		ctx.fillText(">",90,80);
	if(player.levelUpSelectionPosition === 2)
		ctx.fillText(">",90,130);
	if(player.levelUpSelectionPosition === 3)
		ctx.fillText(">",90,180);
	if(player.levelUpSelectionPosition === 4)
		ctx.fillText(">",90,230);
	if(player.levelUpSelectionPosition === 5)
		ctx.fillText(">",90,280);
	if(player.levelUpSelectionPosition === 6)
		ctx.fillText(">",90,330);
	variableLevelUpText();
}

variableLevelUpText = function(){
	ctx.textAlign = "center"
	ctx.font = "30px Bold";
	ctx.fillStyle = ("#FFFFFF");
	if(timeUntilAction > 26){
		return;
		ctx.restore();
	}
	if(levelUpStates.chooseStat)
		ctx.fillText("Please select which stat you would like to train.",WIDTH/2,530);
	if(levelUpStates.hpUp)
		ctx.fillText("You train your aerobic capacity, increasing you hp by 2!",WIDTH/2,530);
	if(levelUpStates.manaUp)
		ctx.fillText("You practice patience and meditation, increasing you mana by 2!",WIDTH/2,530);
	if(levelUpStates.attackUp)
		ctx.fillText("You performed rigorous training, increasing you attack by 1!",WIDTH/2,530);
	if(levelUpStates.magicUp)
		ctx.fillText("You studied the ancient arts, increasing your magic by 1!",WIDTH/2,530);
	if(levelUpStates.defenseUp){
		ctx.fillText("After taking many blows, your skin hardened,",WIDTH/2,510);
		ctx.fillText("increasing you defense by 1!",WIDTH/2,550);
	}
	if(levelUpStates.speedUp){
		ctx.fillText("You ran for miles, increasing your speed by 1!",WIDTH/2,530);
	}
	if(levelUpStates.upgradesOut){
		ctx.fillText("You have utilized all of your training points,",WIDTH/2,510);
        ctx.fillText("may your decisions pay off. . .",WIDTH/2,550);
	}
	if(levelUpStates.learnedHeal){
		ctx.font = "26px Bold";
		ctx.fillText("After an epiphany while reading magical works you uncover a new spell,",WIDTH/2,510);
        ctx.fillText("you can now use the spell heal!",WIDTH/2,550);
	}

	promptContinue();
}









