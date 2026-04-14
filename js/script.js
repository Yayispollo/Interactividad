
document.addEventListener("click", function(){
    //alert("Hola pejarlagarto");
//document.addEventListener("click", function(){
    document.body.style.backgroundColor = "blue";
})
 let red = 0, green = 0, blue = 0;

 document.addEventListener("click",changeColor);

function changeColor(){
    red = Math.random() * 255;
    green = Math.random() * 255;
    blue = Math.random() * 255;   
    //const random = Math.random()*255;
    const rgb = "rgb(" + red + ", " + green + ", " + blue + ")";
    document.body.style.backgroundColor = rgb;
} 