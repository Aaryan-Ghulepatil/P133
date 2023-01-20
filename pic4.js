status="";
img="";
objects="";
function preload(){
   img=loadImage("https://i.postimg.cc/D0Lny4SF/fruit-basket.png");
}
function setup(){
   canvas=createCanvas(640,420);
   canvas.center();
   objectDetector= ml5.objectDetector("cocossd",modelLoaded);
   document.getElementById("status").innerHTML="Detecting Objects"; 
}
function draw(){
   image(img,0,0,640,420);
   if(status !=""){
      for(i=0; i<objects.length; i++){
         document.getElementById("status").innerHTML="Object(s) Detected";
         fill("red");
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
         noFill();
         stroke("red");
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }
   }
}

function back(){
   window.location="index.html"
}

function modelLoaded(){
   console.log("Model Loaded");
   status="true";
   objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
   if(error){
    console.error(error);
   }
   else{
    console.log(results);
    objects=results;

   }
}