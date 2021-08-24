/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;
var kangaroo;
var inv_g;
var shrub;
var finish;
function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo=createSprite(200,290,80,80);
  kangaroo.addAnimation("all",kangaroo_running,kangaroo_collided);
  kangaroo.scale=.16;

  inv_g=createSprite(400,357,1005,15);
  inv_g.visible=false;

  finish=createSprite(400,100,400,20);
  finish.addImage(gameOverImg);
  finish.visible=false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  

  kangaroo.setCollider("circle",0,0,370);
  
 
  kangaroo.x=camera.position.x-270;
  spawnShrubs();
  spawnObstacles();
  
  
  if(gameState===PLAY){
 
 jungle.velocityX=-7;
 if(jungle.x < 100 ){
  jungle.x = width/2;
}
if (keyDown("space")&&kangaroo.y>=285) {
  kangaroo.velocityY=-15;
}

  kangaroo.velocityY = kangaroo.velocityY + 0.8
  kangaroo.collide(inv_g);
  if(kangaroo.isTouching(shrubsGroup)){
    score=score+1;
    
    shrubsGroup.destroyEach();
  }
  if(obstaclesGroup.isTouching(kangaroo)){
    kangaroo.destroy();
    finish.visible=true;
  }
  console.log(kangaroo.position.y);
  drawSprites();
    textSize(20);
    text("Score:"+score, 700,50);
  }
}

function spawnShrubs(){
if (frameCount % 150===0){
shrub=createSprite(camera.position.x+500,325,20,20);
shrub.addImage(shrub2);
shrub.scale=.09;
shrub.velocityX=-7;
shrubsGroup.add(shrub);
shrub.lifetime=200;
}

}

function spawnObstacles(){
  if (frameCount % 86===0){
  obstacle=createSprite(camera.position.x+700,325,20,20);
  obstacle.addImage(obstacle1);
  obstacle.scale=.14;
  obstacle.velocityX=-7;
  obstaclesGroup.add(obstacle);
  obstacle.lifetime=200;
  }
  
  }
