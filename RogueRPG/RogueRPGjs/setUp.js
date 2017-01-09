// This file runs first and is meant to set up anything that will be used in all files from here forward

var ctx = document.getElementById("ctx").getContext("2d"); 
ctx.mozImageSmoothingEnabled = false;// better graphics apparently
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.font = '30px Arial';

var playerWidth = 64;
var playerHeight = 64;
var TILE_SIZE = 64;
var HEIGHT = 600;
var WIDTH = 800;
var enemyEncounterRate = 0.04;
var findPotionRate = 0.02;
//variable that determines when player can proceed with game, stalls battle function for animations.
var timeuntilAction = 0;
var classSelectionPosition = 1;
var damageDealt = 0;
var counterDamageDealt = 0;
var healAmount = 0;
var potionHealAmount = 0;
var manaCost = 0;
var damageAnimationDuration = 24;
var potionCountBeforePotionUse = 0;
var disappear;
var showStats = false;
var playerClass;
var enemyAttackFirst = false;

//time in which shift is rendered inactive after clicking it to show stats, and the stat bar initial position hidden away
var inactiveTime = 0;
var statsBarPositionX = -310;
var transitionBarX = -800;

//position of prompt to continue text
var promptContinueX = 690;
var promptContinueY = 590;

// spells mana cost
var magicalBlastManaCost = 1;
var healManaCost = 3;

//place holder for values of level up stat increases
var hpIncrease;
var manaIncrease;
var attackIncrease;
var magicIncrease;
var defeneseIncrease;
var speedIncrease;

//drawing the player and enemy images, moral of story this is 
//the position that I want them at in battle
//ctx.fillRect(100,280,200,200); // player position
//ctx.fillRect(425,60,250,250); // enemy position


var Img = {};
Img.HomeScreen = new Image();
Img.HomeScreen.src = 'img/HomeMenuScreen.png';

Img.TowerFloor5 = new Image();
Img.TowerFloor5.src = "img/TowerFloor5.png";
Img.TowerFloor4 = new Image();
Img.TowerFloor4.src = "img/TowerFloor4.png";
Img.TowerFloor3 = new Image();
Img.TowerFloor3.src = "img/TowerFloor3.png";
Img.TowerFloor2 = new Image();
Img.TowerFloor2.src = "img/TowerFloor2.png";
Img.TowerFloor1 = new Image();
Img.TowerFloor1.src = "img/TowerFloor1.png";

//characters
Img.WizardKing = new Image();
Img.WizardKing.src = "img/WiseWizardKing.png";
Img.FightingLord = new Image();
Img.FightingLord.src = "img/BrokenFighter.png";
Img.Mage = new Image();
Img.Mage.src = "img/Mage.png";
Img.Warrior = new Image();
Img.Warrior.src = "img/Warrior.png";
Img.Ranger = new Image();
Img.Ranger.src = "img/Ranger.png";


//Opening Screen
Img.GameTitle = new Image();
Img.GameTitle.src = 'img/RightToRule.png';
Img.EnterToBegin = new Image();
Img.EnterToBegin.src = 'img/EnterToBegin.png';

//enemy images
Img.snake = new Image();
Img.snake.src = "img/snake.png";
Img.enchanter = new Image();
Img.enchanter.src = "img/Enchanter.png";
Img.warriorofold = new Image();
Img.warriorofold.src = "img/WarriorofOld.png";

//magic effects
Img.magicalBlast = new Image();
Img.magicalBlast.src = "img/MagicalBlast.png";









