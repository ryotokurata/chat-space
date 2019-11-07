$(document).on('turbolinks:load', function(){
  function buildMessage(message){
    var img = (message.image.url) ? `<img class= "chat__main__messages__message__lower-message__image" src=${message.image.url} >` : "";
    var html = `<div class="chat__main__messages__message">`
    if (message.content && img) {
    var html = `<div class="chat__main__messages__message"data-message-id="${message.id}">
    <div class="chat__main__messages__message__upper-message">
      <div class="chat__main__messages__message__upper-message__user-name">
          ${message.name}
      </div>
      <div class="chat__main__messages__message__upper-message__date">
          ${message.created_at}
      </div>
    </div>
    <div class="chat__main__messages__message__lower-message">
      <p class="chat__main__messages__message__lower-message__content">
          ${message.content}
      </p>
          ${img} 
    </div>
  </div>`
    } else if (message.content) {
     var html = `<div class="chat__main__messages__message"data-message-id="${message.id}">
     <div class="chat__main__messages__message__upper-message">
       <div class="chat__main__messages__message__upper-message__user-name">
           ${message.name}
       </div>
       <div class="chat__main__messages__message__upper-message__date">
           ${message.created_at}
       </div>
     </div>
     <div class="chat__main__messages__message__lower-message">
       <p class="chat__main__messages__message__lower-message__content">
           ${message.content}
       </p>
           ${img} 
     </div>
   </div>`
    } else if (img) {
      var html = `<div class="chat__main__messages__message"data-message-id="${message.id}">
     <div class="chat__main__messages__message__upper-message">
       <div class="chat__main__messages__message__upper-message__user-name">
           ${message.name}
       </div>
       <div class="chat__main__messages__message__upper-message__date">
           ${message.created_at}
       </div>
     </div>
     <div class="chat__main__messages__message__lower-message">
       <p class="chat__main__messages__message__lower-message__content">
           ${message.content}
       </p>
           ${img} 
     </div>
   </div>`
   };
   return html;
     
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url:url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })

    .done(function(message){
      var html = buildMessage(message);
      $('.chat__main__messages').append(html)
      $("#new_message")[0].reset();
        $('.chat__main__messages').animate({
          scrollTop: $('.chat__main__messages')[0].scrollHeight}, "fast");
        })
        
    .fail(function(){
      alert('投稿がありません');
    })
    .always(function(){
      $('.chat__main__form__submit').prop('disabled', false);
    })
    
  })

    function reloadMessages() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.chat__main__messages__message:last').data("message-id");
        $.ajax({
          //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
          url: 'api/messages',
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {last_id: last_message_id}
        })
        .done(function(messages) {
          if (message.length === 0){
            return;
          };
          var insertMessage = '';
          messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertMessage = buildMessage(message); //メッセージが入ったHTMLを取得
            $('.chat__main__messages').append(insertMessage);//メッセージを追加
          })
            $('.chat__main__messages').animate({scrollTop: $('.chat__main__messages')[0].scrollHeight}, 'fast');
          
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      } 
    };
    setInterval(reloadMessages,5000);
});