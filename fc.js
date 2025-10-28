const messagesContent = $('.msgs-content');
const messageInput = $('.msg-input');
const messageSubmit = $('.msg-submit');
const avatarImage = 'pp.jpg';
const fakeMessages = [
  'p',
  'zakky',
  'bole kenalan ga?',
  'oya salken ya',
  'nm lu sp kl bole tau',
  'btw lu tinggal dmn',
  'oh gw jg sby haha',
  'daerah mana?',
  'wah deket ternyata',
  'bisa kali ngajak lu keluar wkw',
  'suka ngegame ga?',
  'sama gw jg suka hh',
  'game yg sering lu mainin ap',
  'gw jg maen epep, mabar ga?',
  'knp gamau?'
];
let minutes = 0;
$(window).on('load', function() {
  messagesContent.mCustomScrollbar();
  setTimeout(fakeMessage, 100);
});
function updateScrollbar(){
  messagesContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
};
function addTimestamp(){
  const date = new Date();
  const minutesNow = date.getMinutes();
 
  if(minutes !== minutesNow){
    minutes = minutesNow;
    const timeStamp = $('<div class="timestamp"></div>').
    text(`${date.getHours()}:${minutes}`);
    $('.msg:last').append(timeStamp);
  };
};
function addMessageToPage(msg, isPersonal = false){
  const message = $('<div class="msg"></div>').text(msg);
  if(isPersonal){
    message.addClass('msg-personal');
    } else {
      const figure = $('<figure class="avatar"></figure>');
      const image = $('<img>').attr('src', avatarImage);
      figure.append(image);
      message.addClass('new').prepend(figure);
  };
  $('.mCSB_container').append(message);
  addTimestamp();
  updateScrollbar();
};

function insertMessage(){
  const messageText = messageInput.val().trim();
  if (messageText === '') {
    return false;
  };
  addMessageToPage(messageText, true);
  messageInput.val(null);
  setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100);
};
messageInput.on('keydown', function(e){
  if(e.which === 13){
    insertMessage();
    return false;
  };
});
messageSubmit.on('click', insertMessage);
function fakeMessage(){
  if(messageInput.val() !== ''){
    return false; 
  };
  const loadingMessage = $('<div class="msg loading new"></div>');
  const figure = $('<figure class="avatar"></figure>');
  const image = $('<img>').attr('src', avatarImage);
  figure.append(image);
  loadingMessage.append(figure).append($('<span></span>'));
  $('.mCSB_container').append(loadingMessage);
  updateScrollbar();
  
  setTimeout(function() {
    loadingMessage.remove();
    if (fakeMessages.length > 0) { // Tambahkan pengecekan ini
      addMessageToPage(fakeMessages.shift());
    }
    }, 1000 + (Math.random() * 20) * 100);
}
