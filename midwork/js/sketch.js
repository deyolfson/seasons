var sound;
var ctrls;
var gui;
var pos;
var snows = [];

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


    for (var i = 0; i < (20 * ctrls.snow) ; i++) {
    snows[i] = new Snow(random(1,4),random(),0); 
    }
}
    


function draw() {

    background( 1 );

    for (var i = 0; i < snows.length; i++) {
    var winds = createVector((0.01 * ctrls.wind),0);
    var gravity = createVector(0, 0.1*snows[i].mass);
    snows[i].applyForce(winds);
    snows[i].applyForce(gravity);
    snows[i].update();
    snows[i].display();
    snows[i].checkEdges();
  }
    
}



//object class

function Snow(m,x,y) {
  this.mass = m;
  this.position = createVector((x * width),y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);

  this.applyForce = function(force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  };
    
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(255,127);
    ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
  };

  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  };

}









