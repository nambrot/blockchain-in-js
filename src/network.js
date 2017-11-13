import io from 'socket.io-client';
const socket = io();

export const subscribeTo = (type, callback) => {
  socket.on('channel', function(data){
    if (data.type === type) {
      callback(data.payload)
    }
  })
}

export const publish = (type, payload) => {
  socket.emit('channel', { type, payload })
}
