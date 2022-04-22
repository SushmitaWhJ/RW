var canW;
var canH;
var engine;
var world;
//variables for PC (Kate)
var kateIdle;
var kateJump;
var kateWalk;
var kateSword;
var kateShield;
var kateHammer;
var kateCharge;

//variables for NPC
var scene;
var ground;
var invisibleGround1;
var invisibleGround2;
var invisibleGround3;
var invisibleGround4;
var invisibleGround5;
var invisibleGround6;
var invisibleGround7;
var invisibleGround8;
var invisibleGroundGroup;
var enemy1;
var enemy2;
var enemy3;
var enemiesGroup;
//var enemy4;
var powerCoins;
var coinImg;

const PLAY = 1;
const END = 0;
const START = 2;
var gameState = START;

var getReadyImg;

//variables for console

function preload() {
    scene = loadImage("Assets/Scene1.png");
  
    kateIdle = loadAnimation("/Assets/KateSprites/KateIdle.png");
  
    kateWalk = loadAnimation("/Assets/KateSprites/KateWalk1.png","/Assets/KateSprites/KateWalk2.png","/Assets/KateSprites/KateWalk3.png","/Assets/KateSprites/KateWalk4.png");
    kateJump = loadAnimation("/Assets/KateSprites/KateJump1.png","/Assets/KateSprites/KateJump2.png","/Assets/KateSprites/KateJump3.png","/Assets/KateSprites/KateJump3.png","/Assets/KateSprites/KateJump2.png","/Assets/KateSprites/KateJump1.png");
    kateSword = loadAnimation("/Assets/KateSprites/KateSword1.png","/Assets/KateSprites/KateSword2.png","/Assets/KateSprites/KateSword3.png","/Assets/KateSprites/KateSword4.png","/Assets/KateSprites/KateSword5.png","/Assets/KateSprites/KateSword6.png");
    kateShield = loadAnimation("/Assets/KateSprites/KateShield.png");
  
    //load the image of enemy
    enemy1 = loadImage("Assets/Enemy1.png");
    enemy2 = loadImage("Assets/Enemy2.png");
    enemy3 = loadImage("Assets/Enemy3.png");
    enemy4 = loadImage("Assets/Enemy4_1.png");
    //enemy4 = loadAnimation("/Assets/Enemy4_1.png","/Assets/Enemy4_2.png");

    coinImg = loadImage("Assets/Coin.png")

    getReadyImg = loadImage("Assets/GetReady.png")
  }

function setup() {
    /*var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if(isMobile){
      canW = displayWidth;
      canH = displayHeight;
      createCanvas(displayWidth+80,displayHeight);
    } else {
      canW = windowWidth;
      canH = windowHeight;
      createCanvas(windowWidth,windowHeight);
    }*/
    createCanvas(windowWidth, windowHeight);
    
  
    enemiesGroup = new Group();

}

function draw() {
  background(0);
  drawSprites();
  if (gameState === START) {
    textSize(20);
    text("Use the up arrow key to start.", width/2-125, height/2+100);
    image(getReadyImg, width/2-150, height/2-250,300,250);

    if (keyIsDown(UP_ARROW)) {
      //create the sprite of your character
      kate = createSprite(150,550,20,50);
      //adding scale and position to your character
      kate.scale = 0.1;
      kate.addAnimation("idling",kateIdle);
      kate.addAnimation("jumping",kateJump);
      kate.addAnimation("walking",kateWalk);
      kate.setAnimation("idling");

      //add sprite
      ground = createSprite(1280,570,256,32);
      //add image of the scene
      ground.addImage("scene1", scene);

      //create invisible ground for each of the uneven surface
      invisibleGround1 = createSprite(30,580,100,340);
      invisibleGround2 = createSprite(150,580,980,20);
      invisibleGround3 = createSprite(400,550,160,40);
      invisibleGround4 = createSprite(800,590,160,40);
      invisibleGround5 = createSprite(960,630,160,40);
      invisibleGround6 = createSprite(1240,630,240,40);
      invisibleGround7 = createSprite(1880,590,1040,40);
      invisibleGround8 = createSprite(1720,550,400,40);

      invisibleGround1.visible = false;
      invisibleGround2.visible = false;
      invisibleGround3.visible = false;
      invisibleGround4.visible = false;
      invisibleGround5.visible = false;
      invisibleGround6.visible = false;
      invisibleGround7.visible = false;
      invisibleGround8.visible = false;

      powerCoins = createSprite(2440,550,10,10);
      powerCoins.addImage(coinImg);
      powerCoins.scale = 0.1;

      score = 0;

      ground.depth + 1;
        
      gameState = PLAY;
      }
    } else if (gameState === PLAY){
      spawnEnemies();
      runControls();

      textSize(20);
      text("Score: "+ score, 500,50);
      score = score + Math.round(getFrameRate()/60);

      //can't go out from the wall
      if (kate.x > 150 || kate.x < 150) {
        kate.x = 150;
      }

      //colide with the ground
      kate.collide(invisibleGround1);
      kate.collide(invisibleGround2);
      kate.collide(invisibleGround3);
      kate.collide(invisibleGround4);
      kate.collide(invisibleGround5);
      kate.collide(invisibleGround6);
      kate.collide(invisibleGround7);
      kate.collide(invisibleGround8);

      if(enemiesGroup.isTouching(kate)){
        gameState = END;
        gameOver();
      }

      if (powerCoins.isTouching(kate)) {
        success();
        console.log("You won!");
        kate.destroy();
      }

    } else if (gameState === END) {
      enemiesGroup.setVelocityXEach(0);
      enemiesGroup.setLifeTimeEach(-1);
      kate.velocityY = 0;
    }

} 

function runControls() {
  if (keyIsDown(RIGHT_ARROW)) {
    kate.changeAnimation("walking");
    //kate.x += 4;
    ground.x -= 4;
    powerCoins.x -= 4;
    invisibleGround1.x -= 4;
    invisibleGround2.x -= 4;
    invisibleGround3.x -= 4;
    invisibleGround4.x -= 4;
    invisibleGround5.x -= 4;
    invisibleGround6.x -= 4;
    invisibleGround7.x -= 4;
    invisibleGround8.x -= 4;
  }

  if (keyIsDown(LEFT_ARROW)) {
    kate.changeAnimation("walking");
    //kate.x -= 4;
    ground.x += 4;
    powerCoins.x += 4;
    invisibleGround1.x += 4;
    invisibleGround2.x += 4;
    invisibleGround3.x += 4;
    invisibleGround4.x += 4;
    invisibleGround5.x += 4;
    invisibleGround6.x += 4;
    invisibleGround7.x += 4;
    invisibleGround8.x += 4;
  }
  
  if (keyIsDown(UP_ARROW) && kate.y >= 500) {
    kate.changeAnimation("jumping");
    kate.velocityY = -20;
  }

  kate.velocityY += 4;
}

function spawnEnemies() {
    if (frameCount % 80 === 0) {
      var randomNum = Math.round(random(1, 2))
      var xPosition = 0;
        if (randomNum === 1) {
          xPosition = width;
         } else {
          xPosition = 0;
        }
      
      var ghost = createSprite(xPosition, height - 250);
      ghost.scale = 0.1;
      ghost.velocityX = -(5 + 3 * score/100);

      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: ghost.addImage(enemy1);
                
            break;
        case 2: ghost.addImage(enemy2);
                
            break;
        case 3: ghost.addImage(enemy3);
                
            break;
        default:break;
      }
    
      enemiesGroup.add(ghost);
      ghost.lifetime = 500;
    }
}

function gameOver() {
  swal(
    {
      title: `I'm Sorry!`,
      imageUrl: "Assets/GameOver.jpg",
      imageSize: "200x200",
      text: "Thanks for playing, your score was: " + score + "!!",
      confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  )
}

function success() {
  swal({
    title: "SUCCESS !!!",
    text: "You have done it !!! ",
    imageUrl: "Assets/Coin.png"
    });
}

//Thank you Teacher Sheena!
