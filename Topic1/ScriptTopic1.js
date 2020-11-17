$(function(){

  function smotion(btnnumber){

      $('.change-btn'+btnnumber).on('click',function(){
      var $displaySlide=$('.active'+btnnumber);
      $displaySlide.removeClass('active'+btnnumber);

      if($(this).hasClass('down-btn'+btnnumber)){
        $displaySlide.next().addClass('active'+btnnumber);
      }else{
        $displaySlide.prev().addClass('active'+btnnumber);
      }

      var slideIndex=$('.slide'+btnnumber).index($('.active'+btnnumber));
      $('.change-btn'+btnnumber).show();

      if (slideIndex==0) {
        $('.up-btn'+btnnumber).hide();
      } else if(slideIndex==2) {
        $('.down-btn'+btnnumber).hide();
      }

      for(var i=0;i<3;i++){
        if($('.slide1 > li').eq(i).hasClass('.active'+btnnumber)){
          var c=$('.slide1 > li').eq(i).data('option');
          $('.bet h1').text(c);
        }
      }

      });
  }



  smotion(1);
  //smotion(2);
  //smotion(3);


});
