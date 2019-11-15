$(function() {
  function buildHTML(message) {
    let image = message.image
      ? `<img class= "lower-message__image" src=${message.image} >`
      : "";
    let html = `<div class="message_body" data-message-id= "${message.id}">
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.date}
            </div>
          </div>
          <div class="message__text">
            <p class="message__text">
              ${message.content}
            </p>
          </div>
          ${image}
        </div>`;
    $('.messages').append(html);
  }

  function ScrollToNewMessage() {
    $(".messages").animate(
      { scrollTop: $(".messages")[0].scrollHeight },
      "fast"
    );
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })

      .done(function(data) {
        let html = buildHTML(data);
        $(".messages").append(html);
        ScrollToNewMessage();
        $('form')[0].reset();
        $(".form__submit").prop("disabled", false);
      })
      .fail(function() {
        alert("error");
        $(".form__submit").prop("disabled", false);
      });
  });

  let reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.message_body:last').data('message-id');
      $.ajax({
        url:  "api/messages",
        type: 'GET',
        data: {last_id: last_message_id},
        dataType: 'json'
      }).done(function(messages) {
        let insertHTML = '';
        messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      }).fail(function() {
        alert('自動更新に失敗しました');
      })
    };
  };
  setInterval(reloadMessages, 4000);
});