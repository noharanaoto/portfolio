$(function(){
  let pi=Math.PI;
  let X,Y,theta=0;
  let path,largeFlag;
  let bSVG = $("#buttonSVG");
  let aMiddle = $("#amountMiddle");

  function calp(cx,cy,r,degree) {
    theta=degree*pi/180;
    X=cx+r*Math.sin(theta);
    Y=cy+(-1)*r*Math.cos(theta);
    largeFlag=( degree > 180 ) ? 1 : 0;
    path="M "+cx+" "+cy+
    " L "+cx+" "+cy/2+" A "+r+" "+r+" 0 "+largeFlag+" 1 "+ X +" "+ Y +"Z";
    aMiddle.attr("d",path);
  }

  bSVG.hide();

  $(".scrollBox").scroll(function () {
    if ($(this).scrollTop() > 10) {
         bSVG.fadeIn();
    } else {
         bSVG.fadeOut();
    }
    let sc = $(this).scrollTop();
    let win = $(this).get(0).scrollHeight-$(this).get(0).offsetHeight;
    let rate = Math.round(sc*100/win);
    calp(50,50,25,rate*3.59);
  });

  bSVG.click(function () {
     $(".scrollBox").animate({ scrollTop: 0 }, 500);
     return false;
  });

});
