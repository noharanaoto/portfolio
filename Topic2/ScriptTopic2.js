$(function() {

  let background = $(".background");
  let dropNumber = 100;

  function dropAppend(n){
    for(let i=1;i<=n;i++){
      background.append('<div class="drop"></div>');
    }
  }

  dropAppend(dropNumber);

});
