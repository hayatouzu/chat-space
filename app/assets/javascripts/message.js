$(function() {
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message" src=${message.image}>`:``;
    var html = `<div class="message">
                            <div class="upper-info">
                                <div class="upper-info__user">
                                    ${ message.user_name }
                                </div>
                                <div class="upper-info__date">
                                    ${ message.time }
                                </div>
                            </div>
                            <div class="message__data">
                                <p class="message__text">
                                    ${ message.content }
                                </p>
                                ${image}
                            </div>
                        </div>`
        return html;
    }
    function scroll(){
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    }
  $(".new_message").on("submit",function(e){
    e.preventDefault();
    // var input = $(".input-box__text").val();
    // console.log(input);
    var formData = new FormData(this);
    var url = $(this).attr('aciton');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      // data: {message: {sss: input}},
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(text){
      var html = buildHTML(text);
      $('.messages').append(html);
      $('.input-box__text').val('');
      $('.form__submit').prop('disabled',false);
      scroll()
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled',false);
    })
    return false;
  });
});