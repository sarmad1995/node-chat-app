var socket = io();
socket.on('connect', () => {
  console.log('connected to server');
});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', (newMessage) => {
  console.log('newEmail', newMessage);
});
