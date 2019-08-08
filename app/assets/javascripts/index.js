$(document).on('turbolinks:load', function(){
  $(function(){
  
  
  // ユーザーリスト
  function buildHTML(user){
    console.log(user);
    var html = `<div id="user-seach-result">
                    <div class ="chat-group-user clearfix">
                      <p class ="chat-group-user__name">${user.name}</p>
                    <div class ="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>
              </div>`;
          $('#user-search-result').append(html);
      }
      // ユーザーいっち致なし
  function appendErrMsgToHTNL(msg){
    var html = `<p>
                      <div id = "user-search-result">${msg}</div>
                </p>`
    $('#user-search-result').append(html);
  }
  var member_list = $('#chat-group-users');
  // 追加ユーザーリスト作成
    function addUser(userId,userName) {
    var html = `
                <div class='chat-group-user-${userId} chat-group-user clearfix' id='chat-group-user-${userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`;
    member_list.append(html);  //viweのmember_listに上のHTMLを出力している
      }
  // ユーザー検索
  // イベント発火
  $(document).on('keyup', '#user-search-field', function(e){
    e.preventDefault();
    var input = $.trim($(this).val());
    $.ajax({
      url: '/users',
      type: 'GET',
      data: ('keyword=' + input),
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(user__name){
      $('#user-search-result').empty();  //idがresultの子要素のliを削除する
      if (user__name.length !== 0) {
        user__name.forEach(function(user){
          buildHTML(user);
        });
      }
      else {
        appendErrMsgToHTNL("一致するユーザーがいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  // 追加ボタンクリック時の処理
  $(document).on("click",".user-search-add", function(){
    console.log(this);
    $('#chat-group-users').val();
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    addUser(userId,userName);
    console.log(userId);
    console.log(userName);
    $(this).parent().remove();
  });
  // 削除ボタンクリック時の処理
  $(document).on('click',".user-search-remove",function(){
    $(this).parent().remove();
  });
});
});