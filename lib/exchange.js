function Exchange(connPromise) {

  var _exchange = ''
    , _type = ''
    , _opts = {};

  this.configure = function(exchange, type, opts) {
    _exchange = exchange || '';
    _type = type || '';
    _opts = opts || {};
    return this;
  }

  this.publish = function(routingKey, msg) {
    return connPromise.then(function(conn) {
      return conn.createChannel().then(function(ch) {
        return ch.assertExchange(_exchange, _type, _opts).then(function() {
          ch.publish(_exchange, routingKey, new Buffer(JSON.stringify(msg)));
          return ch.close();
        });
      });
    });
  }

  return this;
}

module.exports = Exchange;