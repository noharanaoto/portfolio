let h1,m1,s1=0;

function DotPosition(val){

 let str = String(val);
 let dotPosition = 0;
  if(str.lastIndexOf('.') != -1){
    dotPosition = (str.length-1)-str.lastIndexOf('.');
  }
  return dotPosition;
}

function calDecmal(val1,val2,flag){

 let dotPosition1 = DotPosition(val1);
 let dotPosition2 = DotPosition(val2);
 let max = Math.max(dotPosition1,dotPosition2);

 let intValue1 = parseInt((val1.toFixed(max)).replace('.', ''));
 let intValue2 = parseInt((val2.toFixed(max)).replace('.', ''));
 let power = Math.pow(10,max);

 if(flag==1){
   h1 = (intValue1*intValue2) / (power*power);
   if(h1>255){h1=0;}
   h1=(Math.round(h1)).toString(16);
   if(h1.length == 1){h1="0"+h1;}
 }else if(flag==2){
   m1 = (intValue1*intValue2) / (power*power);
   if(m1>255){m1=0;}
   m1=(Math.round(m1)).toString(16);
   if(m1.length == 1){m1="0"+m1;}
 }else if(flag==3){
   s1 = (intValue1*intValue2) / (power*power);
   if(s1>255){s1=0;}
   s1=(Math.round(s1)).toString(16);
   if(s1.length == 1){s1="0"+s1;}
 }
}

function update(){

  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let back = document.getElementById("back");

  calDecmal(h,10.625,1);
  calDecmal(m,4.25,2);
  calDecmal(s,4.25,3);

  if(h<=9) h="0"+h;
  if(m<=9) m="0"+m;
  if(s<=9) s="0"+s;

  let color = "#"+h1+m1+s1;
  let time = String(h)+":"+String(m)+":"+String(s);
  back.style.backgroundColor = color;
  document.getElementById("clock1").innerHTML = "#"+h1+m1+s1;
  document.getElementById("clock2").innerHTML = time;
}

update();
setInterval(update,1000);
