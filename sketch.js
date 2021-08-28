const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var world,engine;
var BulletG;
var bullet;
var targetG; 
var gameState="wait";
var score=0;
var trial=30;

function preload(){
gunIMG = loadImage("images/M416.jpeg");
targetIMG = loadImage("images/target.png");
bulletIMG = loadImage("images/bullet.png");
m416SOUND = loadSound("sounds/m416sound.mp3");
targetHit = loadSound("sounds/targethit.mp3");
checkpointSOUND = loadSound("sounds/checkPoint.mp3");
restartIMG = loadImage("images/restart.png");
gameOverIMG = loadImage("images/gameOver.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight); 
  engine=Engine.create();
  world=engine.world; 
  gun= createSprite(160,320,20,20);
  restart1= createSprite(width/2,(height/2),20,20);
  restart1.addImage(restartIMG);
  restart1.visible=false;
  gameOver= createSprite(width/2,(height/2)-100,20,20);
  gameOver.addImage(gameOverIMG);
  gameOver.visible=false;
  gun.addImage(gunIMG);
  gun.scale=0.8
  gun.visible=false;
  gun.setCollider("Rectangle",0,0,gun.width,gun.height);
  //gun.debug=true;
  targetG=new Group();
  bulletG=new Group();
}


function draw() {
background("black");
textSize(40)
text(mouseX+" , "+mouseY,200,30);
textSize(20);
fill("lightblue")
text("Score ="+score,width-200,50);
text("trials remaining ="+trial,width-200,70)
if(keyDown("SPACE")&& gameState==="wait"){
gameState="play" 
  }
if(gameState=== "wait"){

fill("WHITE") 
textSize(30)
text("WICK'S TRAINING",width/2-60,50);
//add a logo for the name
text("HOW TO PLAY",45,120);
text("1) press Righ Arrow to shoot",45,180);
text("2)every target gives you 50 points",45,210)
text("3)goal=1000 points",45,240)
text("have fun *-*",45,280)
text("Press SPACE key to start the game",(width/3)+20,height-80);
gameOver.visible=false;
restart1.visible=false;
 
}
else if(gameState==="play"){
  gun.visible=true;
  gun.y=mouseY;
  fill("white");
  text(mouseX+" , "+mouseY,200,30);
  spawnTarget();
  if(keyDown("RIGHT_ARROW")){
  summonBullet();
  }
  if(targetG.isTouching(bulletG)){
  targetHit.play();
  bulletG.destroyEach();
  //targetG.destroy();
  score=score+50;
  //bullet.visible=false
  
  
  }

    if(score>=100 || (trial<=0 && score<100)){

    gameState="end";
  }
}
   else if(gameState==="end"){
      if(score>=100){
        gameState="end"
        restart1.visible=true
          gameOver.visible=true
      
      text("WON",width/2, (height/2)+100);
       
      if(mousePressedOver(restart1)){
        reset();
      }
        }
else if(trial<=0 && score<100){
  gameOver.visible=true
  restart1.visible=true
  text("LOSE",width/2, (height/2)+100);
  if(mousePressedOver(restart1)){
    reset();
  }
}
     
}
else{
  console.log("error");
}
  drawSprites(); 
}



function spawnTarget(){
if(frameCount%120===0){
var target= createSprite(width-300,100,20,20);
target.velocityY=2
target.addImage(targetIMG);
target.lifetime=800;
target.scale=0.1
targetG.add(target); 
if(score>=500){
target.velocityY=4
target.y=150
}
}
}


function summonBullet(){
    bullet= createSprite(160,320,20,20);
    m416SOUND.play();
    bullet.y=gun.y-6;
    bullet.x=gun.x+150;
    bullet.velocityX=6;
    bullet.addImage(bulletIMG);
    bullet.lifetime=200;
    bullet.scale= 0.06;
    //bullet.depth = gun.depth;
    //gun.depth = gun.depth + 1;
    bulletG.add(bullet);
    trial=trial-1
  }

  function win(){
    restart1.visible=true
    gameOver.visible=true
//restart1.visible=true
text("WON",width/2, (height/2)+100);
 
if(keyDOWN("R")){
  reset();
}
  }



  function reset(){
    gameState="wait";
 score=0;
  gameOver.visible=false;
  restart1.visible=false;
  gun.visible=false
  //target.visible=false
  bullet.visible=false
 
  }


