// David Eyolfson & Hannah E Smith
// MidTerm Generative Code Spring 2015 -- Ryan Berkey

//----------- Gobal Vars ----------------

var ambient;
var pos;
var snows = [];
var snowss = [];
var smokes = [];
var time;
var bgmnt;
var mnt;
var tree;
var cabin;
var ambient;
var outside = true;




function preload(){
    bgmnt = loadImage('svg/mountainbackground.svg');
    mnt = loadImage('svg/mountains.svg');
    tree = loadImage('svg/tree.svg');
    cabin = loadImage('svg/cabin.svg');
    ambient = loadSound("sound/ambient.mp3");

}

function setup(){
    createCanvas( windowWidth, windowHeight );
    

    ambient.play();

   
}
    


function draw() {

    background( 175, 175, 200 );




    // paralax code X
    var disxc = dist(mouseX, 0, width/2, 0);
    var disx = disxc;
    if(mouseX <= width/2){
      disx = disxc * -1;
    };

    var paracab = (width*((disx/(width/2)) /4));
    var paraxmnt = -1.2 + ((disx/(width/2)) /5); 
    var paraxbgmnt = -1.2 + ((disx/(width/2))/25);
    var parawind = floor((disx/(width/2)) * 5);


    //paralax code Y

    var disyc = dist(0, mouseY, 0, 0);

    if(disyc <= 0){
      disyc = 1;
    };
    
    var fallfactor = 1 + (floor((disyc/height)* 10));
    

    

    
    //background snow

        if(snowss.length < 200 ){
      snowss.push(new Snow(random(1,2),random(),random(1, 500)));
    }

    for (var i = 0; i < snowss.length ; i++) {
    var winds = createVector((- 0.001 * parawind),0);
    var gravity = createVector(0, 0.01*snowss[i].mass * fallfactor);
    snowss[i].applyForce(winds);
    snowss[i].applyForce(gravity);
    snowss[i].draw();
    snowss[i].update();
    snowss[i].checkEdges();
  }


    //Load svgs to screen
    image(bgmnt, (width + paraxbgmnt * width), height / 4, width * 1.5 , height/1.5);
    image(mnt, (width + paraxmnt * width), height/ 2 , width * 1.5 , height/1.5);
    image(cabin, (width / 2) + paracab  , height * .6 , width * .3 , height * .3 );
    image(tree, (width / 4) - paracab , 0 , width * .5 , height * 1.25 );
    

    if(snows.length < 200 ){
      snows.push(new Snow(random(1,4),random(),random(1, 500)));
    }

    for (var i = 0; i < snows.length ; i++) {
    var winds = createVector((-0.03 * parawind),0);
    var gravity = createVector(0, 0.1*snows[i].mass * fallfactor );
    snows[i].applyForce(winds);
    snows[i].applyForce(gravity);
    snows[i].draw();
    snows[i].update();
    snows[i].checkEdges();
  }
  

     

    
    console.log(snows.length);
}







//object Snow front snow

function Snow(m,x,y) {
  this.mass = m;
  this.position = createVector((x * width),-y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  snows.index;
}

  Snow.prototype.applyForce = function(force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  }
    
  Snow.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
  }

  Snow.prototype.draw = function() {
    noStroke();
    fill(255,127);
    ellipse(this.position.x,this.position.y,this.mass*5,this.mass*5);
  }

  Snow.prototype.checkEdges = function() {

    

    if (this.position.y > height ) {
      this.position.y = 0 - random(1,30);
      this.velocity = createVector(0,0);
    };

    

   if ( this.position.x > width){ 
      this.position.x = 0;
    }  

   if (this.position.x < 0 ){
      this.position.x = width;
    }


}





