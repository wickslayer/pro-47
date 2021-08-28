class Target{
 
 constructor(x,y){
 var options={
 isStatic:true 
 }
 this.w=100;
 this.h=100;

 this.x=x;
 this.y=y;

 this.body= Bodies.rectangle(x,y,20,20,options);
 World.add(world,this.body);
 this.image= loadImage("images/target.png");

 }

  display(){
  var pos=this.body.position;
  imageMode(CENTER);
  fill("WHITE");
  image(this.image,pos.x,pos.y,this.w,this.h);
}

}