var sound;
var ctrls;
var gui;
var pos;
var snows = [];
var snowss = [];
var smokes = [];
var time;

function preload(){
    
}

function setup(){
    createCanvas( windowWidth, windowHeight );
    

    ctrls = {
        wind : 0,
        snow : 1,
        smoke : 0,
    }




    gui = new dat.GUI();
    var g = gui.addFolder("Controls");
    gui.add(ctrls, 'wind', -5, 5);
    gui.add(ctrls, 'snow', 1, 5);
    gui.add(ctrls, 'smoke', 1, 5);
    g.open();

    var slength = snows.length

   
}
    


function draw() {

    background( 1 );

    if(snows.length < (50 * ctrls.snow) ){
      snows.push(new Snow(random(1,4),random(),random(1, 500)));
    }

    for (var i = 0; i < snows.length ; i++) {

    var winds = createVector((0.01 * ctrls.wind),0);
    var gravity = createVector(0, 0.1*snows[i].mass);
    snows[i].applyForce(winds);
    snows[i].applyForce(gravity);
    snows[i].draw();
    snows[i].update();
    snows[i].checkEdges();
  }
    
}



//object class

function Snow(m,x,y) {
  this.mass = m;
  this.position = createVector((x * width),-y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
}

  Snow.prototype.applyForce = function(force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  }
    
  Snow.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.i = snows.length;
  }

  Snow.prototype.draw = function() {
    noStroke();
    fill(255,127);
    ellipse(this.position.x,this.position.y,this.mass*5,this.mass*5);
  }

  Snow.prototype.checkEdges = function() {
    if (this.position.x > width || this.position.x < 0 || this.position.y > height ) {
      this.position.y = random(0,-50);
      this.position.x = random(0,width);
      this.velocity = createVector(0,0);
    }

}
