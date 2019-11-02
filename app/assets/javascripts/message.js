$(document).on('turbolinks:load', function(){
  function buildMessage(message){
    var img = (message.image) ? `<img class= "chat__main__messages__message__lower-message__image" src=${message.image} >` : "";
    var html = `<div class="chat__main__messages__message">
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
      $('#message_content').val('')
        $('.chat__main__messages').animate({
      scrollTop: $('.chat__main__messages')[0].scrollHeight}, "fast");
      $(".chat__mchain__form__form")[0].reset();
        })
        
    .fail(function(){
      alert('投稿がありません');
    })
    .always(function(){
      $('.chat__mchain__form__submit').prop('disabled', false);
    })
  })
});
