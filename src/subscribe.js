const defaultOpts = {};

const handlerDecorate = (channel, handler) => (message) =>
    handler(message, () => channel.ack(message), () => channel.nack(message));

module.exports = (channel, config) => async (context, routingKey, handler, opts = {}) => {
    channel.assertExchange(context, 'topic', { durable: false });
    const queueName = `${context}.${routingKey}`;
    await channel.assertQueue(queueName, { exclusive: true });
    await channel.bindQueue(queueName, context, routingKey);
    channel.consume(queueName, handlerDecorate(channel, handler), { noAck: true });
};
