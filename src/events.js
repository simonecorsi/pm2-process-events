const net = require('net');
const { EventEmitter } = require('events');
const Message = require('amp-message');

class Pm2ProcessEvents extends EventEmitter {
  constructor(socketPath = `${process.env.HOME}/.pm2/pub.sock`) {
    super();
    this.socket = net.createConnection({
      path: socketPath,
    });
    this.socket.on('data', this.handler.bind(this));
    this.socket.on('error', (error) => {
      this.emit('error', error);
    });
  }

  destroy() {
    return this.socket.destroy();
  }

  handler(data) {
    const msg = new Message(data);
    const namespace = msg.shift();
    if (namespace.includes('process'))
      this.emit('event', namespace, ...msg.args);
  }
}

module.exports = Pm2ProcessEvents;
