var bg , bgImg , logo ,start,rules,ruletext,x;
var gameState="start",oGroup,over,overImg,reset,resetImg,win;
var plr,plrImg,obstacle,h1,heart,a=0;
var score=80000,space,spaceImg,spaceGroup,fuel=100,lose,fuelSound;
var fimg=["logo.png","start.png","rules.png","ruletext.png","x.png",
"gameover.png","reset.png","win.png"];
var fr;
var oimg=["mercury.png","venus.png","earth.png","mars.png","jupiter.png","saturn.png","uranus.png",
"neptune.png","asteroid.png","satellite.png","rocket.png","meteor.gif","station.png"];
var o=[];
var frm=[];
var canvas;
function preload(){
  bgImg = loadImage("images/bg .jpg");
  heart = loadImage("images/heart.png");
  plrImg = loadImage("images/shuttle.png");

  for (var f=0;f<8;f++){
    frm[f]=loadImage("images/"+fimg[f]);
  }
  
  for(var i=0;i<13;i++){
    o[i]=loadImage("images/"+oimg[i]);

  }
  
  lose=loadSound("die.mp3");
  fuelSound=loadSound("checkPoint.mp3");
}

function setup() {
 canvas= createCanvas(1250,600);

  //background
  bg=createSprite(width/2,height/2,1000,500);
  bg.addImage(bgImg);
  bg.scale=0.8;
fr=new Form();
  
  //player shuttle
  plr = createSprite(250,height/2);
  plr.addImage(plrImg);
  plr.scale=0.3;

  //player lives
  h1=createSprite(1200,40);
  h1.addImage(heart);
  h1.scale=0.2;

  //gameover
  over=createSprite(width/2,200);
  over.addImage(frm[5]);
  over.scale=0.3;
over.visible=false;
  //reset
  reset=createSprite(width/2,450);
  reset.addImage(frm[6]);
  reset.scale=0.2;
reset.visible=false;
  oGroup=createGroup();
  spaceGroup=createGroup();
  plr.visible=false;
 }

function draw() {
  background("#0f1e34"); 

  var edges=createEdgeSprites();

  //making background infinite
  bg.velocityX=-(5+10-Math.round(score/8000));
  if(bg.x<500){
    bg.x=width/2;
  }
  if(gameState==="start"){
    score=80000;
    a=0;
    fuel=100;
      fr.display(); 
  }

    
   if(gameState==="play"){

    plr.visible=true;

    plr.y=World.mouseY;
    plr.collide(edges);
    plr.setCollider("rectangle",0,0,450,300);

    score=score - 10.8;
    fuel-=0.01;
    textSize(40);
    fill(204,255,255);
    textFont("tisa");
    text("Distance remaining:"+score ,200,40);
    text("miles",850,40);
    text("Fuel remaining: " + fuel,300,585);
    text("%",900,585);
    spawnObstacles();
    spaceStations();
    oGroup.scaleEach+=1;

    

    if(plr.isTouching(spaceGroup)){
      spaceGroup.destroyEach();
      fuelSound.play();
      fuel=100;
    }

    if((a===1 && plr.isTouching(oGroup) )|| fuel<0){
      console.log("a"+ a);
      a=2;
      oGroup.destroyEach();
      gameState="end";
      lose.play();
    }
    
    if((a===0 && plr.isTouching(oGroup)) || fuel<0){
      oGroup.destroyEach();
      a=1;
      h1.destroy();
      lose.play();
    }
    if((a===0|| a===1) && score<0){
      gameState="end";
      a=5;
    }

    camera .position.x=width/2;
   camera .position.y=height/2;
  
  }


   if(gameState=="end"){
plr.visible=false;

    over.visible=true;
    reset.visible=true;
    //reset.debug=true;

    if(a==5){
      over.addImage(frm[7]);
    }else{
      over.addImage(frm[5]);
    }
    

    if(mousePressedOver(reset)){ 
      gameState="start";
      over.visible=false;
      reset.visible=false;
    }

  };
  
  drawSprites();
}



function spawnObstacles(){
  if(frameCount%50===0){
    obstacle=createSprite(1250,100);
    obstacle.setCollider("circle",0,0,150);
    //obstacle.debug=true;
    var r=Math.round(random(0,11));
    obstacle.y=random(50,500)
    obstacle.lifetime=400;
    obstacle.addImage(o[r]);
    obstacle.scale =0.2;
      if(r<10){
      obstacle.velocityX=-(Math.round(random(8,12))+(10-Math.round(score/8000)));
      obstacle.velocityY=random(-2,2);
       }
    if(r===10){
      obstacle.y=500;
      obstacle.velocityX=-Math.round(random(8,12));
      obstacle.velocityY=-3;
             
    }

    if(r===11){
      obstacle.scale=1;
      obstacle.x=1000;
      obstacle.velocityX=-Math.round(random(8,12));
     obstacle.velocityY=Math.round(random(3,5));
             

    }
  //  obstacle.scale =0.2;
    oGroup.add(obstacle);
  }
}


function spaceStations(){
  if(frameCount%4500===0 && score!==80000){
    space=createSprite(1250,random(100,500));
    space.addImage(o[12]);
    space.scale=0.5;
    space.velocityX=-3;
    space.lifetime=400;
    spaceGroup.add(space);
  }
}


