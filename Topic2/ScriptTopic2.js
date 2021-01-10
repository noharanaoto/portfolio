parentWidth = $('#canvas').parent().width();
parentHeight = $('#canvas').parent().height();

let rainDrops = [];
let windowWidth = parentWidth;
let windowHeight = parentHeight;
let gravity;
let barWidth = windowWidth*2/9;
let barHeight = barWidth*3/40;
let barX = (windowWidth/2)-(barWidth/2);
let barY = (windowHeight*5)/6;

let umbrellaWidth = windowWidth*3/20;
let umbrellaHeight = umbrellaWidth*4/5;
let nowTime,startTime;
let oneInterval = 10000;
let elapsedTime,barCount = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');
  gravity = createVector(0,9.8/60);
  startTime=millis();
}

function draw() {
  background(65,81,91);

  if(random(1)<0.2){
    rainDrops.push(new rainDrop());
  }
  for(let i=rainDrops.length-1;i>=0;i--){
    rainDrops[i].update();
    rainDrops[i].show();
    if(rainDrops[i].done()){
      rainDrops.splice(i,1);
    }
  }

  fill(65,81,91);
  stroke(255);
  strokeWeight(2);
  //石突
  line(barX+(barWidth/2),(windowHeight/6)-umbrellaHeight*7/12+umbrellaHeight/2,
  barX+(barWidth/2),(windowHeight/6)-umbrellaHeight/2+umbrellaHeight/2);
  //本体
  arc(barX+(barWidth/2), (windowHeight/6)+umbrellaHeight/2,
  umbrellaWidth, umbrellaHeight, PI, 2*PI);
  //左
  arc(barX+(barWidth/2)-umbrellaWidth/3, (windowHeight/6)+umbrellaHeight/2,
  umbrellaWidth/3, umbrellaHeight/4, PI, 2*PI);
  //中心
  arc(barX+(barWidth/2), (windowHeight/6+umbrellaHeight/2),
  umbrellaWidth/3, umbrellaHeight/4, PI, 2*PI);
  //右
  arc(barX+(barWidth/2)+umbrellaWidth/3, (windowHeight/6)+umbrellaHeight/2,
  umbrellaWidth/3, umbrellaHeight/4, PI, 2*PI);
  //中棒
  line(barX+(barWidth/2),(windowHeight/6)-umbrellaHeight/8+umbrellaHeight/2,
  barX+(barWidth/2),(windowHeight/6)+umbrellaHeight/2+umbrellaHeight/2);

  fill(65,81,91);
  stroke(255);
  strokeWeight(4);
  //持ち手
  arc(barX+(barWidth/2)-umbrellaWidth/10, (windowHeight/6)+umbrellaHeight/2+umbrellaHeight/2,
  umbrellaWidth/5, umbrellaWidth/5, 0, PI);

  fill(65,81,91);
  stroke(255);
  strokeWeight(2);
  rect(barX,barY,barWidth,barHeight);

  nowTime = millis();
  elapsedTime = nowTime - startTime;
  if(elapsedTime >= oneInterval){
    fill(65,81,91);
    noStroke();
    rect(barX,barY,barWidth,barHeight);
    startTime = millis();
  }else{
    fill(255);
    noStroke();
    rect(barX,barY,barWidth*elapsedTime/oneInterval,barHeight);
  }
}

// -----------------------------------

function Particle(x,y,drop){
  this.pos = createVector(x,y);
  this.drop=drop;
  this.lifespan = 255;
  if(this.drop){
    this.vel = createVector(0,0);
  }else{
    this.vel = p5.Vector.random2D();
    if(this.vel.y >0){this.vel.y*=-1}
    this.vel.mult(random(2,10));
  }
  this.acc = createVector(0,0);

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.update = function(){
    if(!this.drop){
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function(){
    if(this.lifespan < 0){
      return true;
    }else{
      return false;
    }
  }

  this.show = function(){
    if(!this.drop){
      strokeWeight(2);
      stroke(213,219,236,this.lifespan);
    }else{
      strokeWeight(4);
      stroke(213,219,236);
    }
    point(this.pos.x,this.pos.y);
  }
}

// -----------------------------------

function rainDrop(){
  this.drop = new Particle(random(barX+(barWidth/2-umbrellaWidth/2),barX+(barWidth/2+umbrellaWidth/2)),windowHeight/6+umbrellaHeight/2,true);
  this.splashed = false;
  this.particles = [];

  this.done = function(){
    if(this.splashed && this.particles.length ===0){
      return true;
    }else{
      return false;
    }
  }

  this.update = function(){
    if(!this.splashed){
      this.drop.applyForce(gravity);
      this.drop.update();
      if(this.drop.pos.y >= barY){
        this.splashed = true;
        this.splash();
      }
    }
    for(let i=this.particles.length-1 ; i>=0;i--){
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if(this.particles[i].done()){
        this.particles.splice(i,1);
      }
    }
  }

  this.splash = function(){
    // this.particlesという空の配列に100個particleを入れる
    for(let i=0;i<10;i++){
      let p = new Particle(this.drop.pos.x,this.drop.pos.y);
      this.particles.push(p);
    }
  }

  this.show = function(){
    if(!this.splashed){
      this.drop.show();
    }
    // 入れた要素を表示させる
    for(let i=0;i<this.particles.length;i++){
      this.particles[i].show();
    }
  }
}
