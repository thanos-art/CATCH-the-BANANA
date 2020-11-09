var monkey , monkey_running, monkey_collided, ground,groundImage;
var banana ,bananaImage, obstacle, obstacleImage,gameover,gameoverImg,restart,restartImg
var bananaGroup, obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
 //Spelling is wrong // obstaceImage = loadImage("obstacle.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("grass.jpg");
  gameoverImg = loadImage("GAMEOVER.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600,300);
  monkey = createSprite(90,270,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.13;
  
  ground=createSprite(600,290,1200,10);
  ground.velocityX = -4;
  ground.x =ground.width/2;
  console.log(ground.x)
  ground.shapeColour="black"
  
  ground.depth = monkey.depth;
  monkey.depth = monkey.depth + 3;
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.3;
  gameover.visible = false;
  
  restart = createSprite(300,240);
  restart.addImage(restartImg);
  restart.scale = 0.1;
 
  bananaGroup = new Group();
 obstacleGroup = new Group();
}

function draw() {
  background("skyblue")
   fill("black");
  textSize(25);
  
   if (gameState === PLAY)
 {// here code for to move the sword
   
   restart.visible = false;
   gameover.visible = false;
   
  bananas();
   obstacles();
  
   round.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/80);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 165) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 1
    
     if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
   
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score = score+1;
   }
   
}
   else if (gameState === END) {
      gameover.visible = true;
      restart.visible = true;
     
     //change the monkey animation
      monkey.changeAnimation("collided", monkey_collided);
    
    ground.velocityX = 0;
     
     bananaGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
  
     if(mousePressedOver(restart)) {
      reset();
    }
   }
  monkey.collide(ground);
  text("Score : " + score,470,50);
  drawSprites();
}

  function reset()
{
  gameState = PLAY;
  restart.visible = false;
  gameover.visible = false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("running", monkey_running);
  score = 0;
}

 function bananas()
{
  
  if(World.frameCount%80 === 0) { 
     banana=createSprite(560,120,20,20);
     banana.addImage(bananaImage);
     banana.x=Math.round(random(550,570)); 
     banana.velocityX=-(15 + score/2);
     banana.setlifetime=100;
     banana.scale = 0.1;
     bananaGroup.add(banana);  
   }
}

function obstacles()
{    
  if(World.frameCount%150 === 0) 
  { 
     obstacle =createSprite(300,256,20,50);
    //here spelling is correct but above where we have loaded image there spelling is wrong which i have now commented and corrected on next line
     obstacle.addImage(obstacleImage)
     obstacle.x=Math.round(random(555,585)); 
     obstacle.velocityX=-(10 + score/2);
     obstacle.setlifetime=100;
     obstacle.scale = 0.15;
    // you added sprite image to group
     //obstacleGroup.add(obstacleImage); 
    //you should have added the sprite 
    obstacleGroup.add(obstacle); 
      
  }
}