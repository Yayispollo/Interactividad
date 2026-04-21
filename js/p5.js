function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(30,70, 200);
    strokeWeight(10);
    fill_color = map(mouseX, 0, windowWidth, 0, 255);
    fill_color2 = map(mouseY,0, windowHeight, 0, 100);
    stroke(0,0,0);
    fill(mouseX, mouseY,50);
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