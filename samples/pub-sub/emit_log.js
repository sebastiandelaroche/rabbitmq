const amqp = require('amqplib/callback_api');

amqp.connect('amqp://root:pass@0.0.0.0', function (err, conn) {
    conn.createChannel(function (err, ch) {
        const ex = 'logs';
        const msg = process.argv.slice(2).join(' ') || 'Hello World!';

        ch.assertExchange(ex, 'fanout', { durable: false });
        ch.publish(ex, '', new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});