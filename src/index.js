const amqp = require('amqplib');
const publish = require('./publish');
const subscribe = require('./subscribe');

// E.g
// const config = {
//     url: 'amqp://root:pass@0.0.0.0',
//     service: 'nest-service',
//     context: 'nest',
// };

module.exports = config => amqp.connect(config.url)
    .then(conn => conn.createChannel())
    .then(channel => ({
        publish: publish(channel, config),
        subscribe: subscribe(channel, config),
    }));
