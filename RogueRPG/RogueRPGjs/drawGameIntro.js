


drawGameIntro = function(){
  
  //black background, must be drawn in every screen
  ctx.stroke;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,800,600);

  //don't want text immediately appearing
  if(inactiveTime > 26)
    return;
  //rules that will be applied to all text drawn here after for most part
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";

  if(gameIntroStates.screen1){
    ctx.font = "italic 30px Bold";
    ctx.fillText("The time has come my son, my reign is drawing towards its end",400,200);
    ctx.fillText("No longer must you wait to climb the Tower of Ascalla",400,300);
    promptContinueIntro();
  }

  if(gameIntroStates.screen2){
    ctx.font = "italic 30px Bold";
    ctx.fillText("The people of Ghalicas need you to make the ascent,",400,200);
    ctx.fillText("They need a strong ruler to lead them to a golden age,",400,250);
    ctx.fillText("The culmination of your training will be finally tested",400,300);
    promptContinueIntro();
  }

  if(gameIntroStates.screen3){
    ctx.font = "italic 30px Bold";
    ctx.fillText("If you are to succeed, your ascent to the throne shall",400,200);
    ctx.fillText("go uncontested by the outer royal families,",400,250);
    ctx.fillText("and the people shall embrace you as their new ruler",400,300);
    promptContinueIntro();
  }

  if(gameIntroStates.screen4){
    ctx.font = "italic 30px Bold";
    ctx.fillText("However, if you were to fail. . .",400,200);
    ctx.fillText("Well, I presume you know what your fate would be",400,250);
    ctx.fillText("You are better off dying in the Tower than returning unsuccessful",400,300);
    promptContinueIntro();
  }

  if(gameIntroStates.screen5){
    ctx.font = "italic 30px Bold";
    ctx.fillText("Your royal blood grants your heightened powers,",400,200);
    ctx.fillText("You are a direct descendent of the ancient ones",400,250);
    ctx.fillText("And you are the rightful successor to my throne",400,300);
    promptContinueIntro();
  }

  if(gameIntroStates.screen6){
    ctx.font = "italic 30px Bold";
    ctx.fillText("As you climb, the ancient blood within you will awaken",400,200);
    ctx.fillText("and you will become capable of feats impossible for mortals,",400,250);
    ctx.fillText("skills that I continued to hone in my thousand year reign",400,300);
    promptContinueIntro();
  }

  if(gameIntroStates.screen7){
    ctx.font = "italic 30px Bold";
    ctx.fillText("Every ruler to sit upon Ghalicas' throne has had",400,200);
    ctx.fillText("to face this trial, now it is your turn to win your Right to Rule. . .",400,250);
    promptContinueIntro();
  }



  //Class Selection Screen
  if(gameIntroStates.selectClass){
    ctx.font = "30px Bold";
    ctx.fillText("What is your class, rightful prince of Ghalicas",400,150);
    ctx.font = "20px Bold";
    ctx.fillText("(Use WASD controls to move the cursor)",400,200);

    //Will want this to be grey in game, background to selections, location of selections
    ctx.textAlign = "left";
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(50,275,200,200);
    ctx.fillRect(300,275,200,200);
    ctx.fillRect(550,275,200,200);

    ctx.drawImage(Img.Warrior,50,275,200,200);
    ctx.drawImage(Img.Mage,300,275,200,200);
    ctx.drawImage(Img.Ranger,550,275,200,200);

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.font = "italic 30px Bold";
    ctx.fillText("Warrior",150,240);
    ctx.fillText("Mage",400,240);
    ctx.fillText("Ranger",650,240);


    //these are the stat boosts listed for each respective class
    ctx.font = "italic 20px Bold";
    ctx.fillText("(+hp,attack,defense)",150,260);
    ctx.fillText("(+mana,magic)",400,260);
    ctx.fillText("(+attack,speed)",650,260);

    //this will place arrow for where selection position currently is
    ctx.font = "40px Bold";
    if(classSelectionPosition === 1)
      ctx.fillText("^",150,510);
    if(classSelectionPosition === 2)
      ctx.fillText("^",400,510);
    if(classSelectionPosition === 3)
      ctx.fillText("^",650,510);

    ctx.font = "italic 30px Bold";
    ctx.fillText('"Remember that strength always comes at a price. . ."',400,530);
    promptContinueIntro();
  }

  if(gameIntroStates.screen8){
    ctx.font = "30px Bold";
    ctx.fillText("Key Notes:",400,100);
    ctx.textAlign = "left"
    ctx.font = "22px Bold";
    ctx.fillText("-As you walk through the tower you regenerate health and mana",50,200);
    ctx.fillText("-You find potions randomly as you wander, which recover health",50,300);
    ctx.fillText("-Enemies will randomly appear to contest you within the Tower",50,400);
    ctx.textAlign = "center"
    promptContinueIntro();
  }

  if(gameIntroStates.finalScreen){
    ctx.font = "italic 30px Bold";
    ctx.fillText("Best of luck my son, may the gods of above be with",400,200);
    ctx.fillText("you for your trials, you shall awaken at the tower",400,250);
    ctx.fillText("may you survive the 5 floors that have killed so many. . .",400,300);
    promptContinueIntro();
  }
}






          