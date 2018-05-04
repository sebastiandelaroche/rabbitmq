const defaultOpts = {
    persistent: true,
};

module.exports = (channel, config) => (context, routingKey, message, opts = {}) => {
    channel.assertExchange(context, 'topic', { durable: false });
    channel.publish(context, routingKey, new Buffer(message), {}, { ...defaultOpts, ...opts });
};
