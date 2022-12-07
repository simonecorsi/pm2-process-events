const net = require('net');
const { EventEmitter } = require('events');
const Message = require('amp-message');
const pm = require('picomatch');

class Pm2ProcessEvents extends EventEmitter {
  constructor(socketPath = `${process.env.HOME}/.pm2/pub.sock`) {
    super();
    this.socket = net.createConnection({
      path: socketPath,
    });

    this.socket.on('error', (error) => {
      this.emit('error', error);
    });

    this.matchers = new Map();
  }

  destroy() {
    this.socket.removeAllListeners();
    return this.socket.destroy();
  }

  on(wildcard = '*', userHandler) {
    if (!this.matchers.has(wildcard)) {
      this.matchers.set(wildcard, pm(wildcard));
    }
    this.socket.addListener('data', (data) => {
      const payload = this.filter(data, wildcard, this.matchers.get(wildcard));
      // skip if filtered
      if (!payload) return;
      return userHandler(payload);
    });
  }

  filter(data, wildcard, matcher) {
    const msg = new Message(data);
    const namespace = msg.shift();
    if (wildcard !== '*' && !matcher(namespace)) return;
    const payload = msg?.args?.[0] || {};
    return { event: namespace, payload };
  }
}

module.exports = Pm2ProcessEvents;
