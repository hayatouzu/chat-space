$(function() {
  
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message" src=${message.image}>`:``;
    var html = `<div class="message" data-id="${message.id}" data-group-id="${message.group_id}">
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

  $(function(){
  var group_id = $(".message:last").data("group-id");
  if (location.pathname == `/groups/${group_id}/messages`){
    setInterval(reloadMessages, 5000);
  }
  })
  // 自動更新
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("id");
    var group_id = $('.message:last').data('group-id');
    console.log(last_message_id);
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: `/groups/${group_id}/api/messages`,
      type: 'GET',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
        var html = insertHTML;
        $('.messages').append(html);
        scroll()
        })
    })
    .fail(function() {
      // alert('自動更新に失敗しました')
      alert('error');
    });
  };
});