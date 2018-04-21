var socket = io();

scrollToBottom = () => {
  // Selectors and heights
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};
socket.on('connect', () => {
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error');
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  const formattedtime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedtime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});
socket.on('newLocationMessage', (message) => {
  const formattedtime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedtime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();
  const messageTextox = jQuery('[name=message');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextox.val()
  }, () => {
    messageTextox.val('');
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  socket.emit('createLocationMessage', {
    latitude: '34.0154952',
    longitude: '74.813191'
  });
  return null;
});
