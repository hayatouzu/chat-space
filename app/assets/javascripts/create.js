$(function(){
  $(".new-message__submit-btn").on("submit",function(){
    var input = $(".new-message__submit-btn").val();
    console.log(input);
  });
});