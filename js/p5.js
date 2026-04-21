function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(30,70, 200);
    Stroke(0,0,0);
    strokeweight(5);
    fill(255, 0, 0);
  ellipse(mouseX, mouseY, 50, 50);
}
/*
function mousePressed(){
    background(30,70, 200);
    noStroke();
    fill(150, 200, 0);
    ellipse(mouseX, mouseY, 100, 100);
}
    */
   function windowresized(){
    resizeCanvas( Width, Height);
}