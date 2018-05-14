import * as amqp from 'amqplib';
import * as defaultConfig from './default.config';

const handlerDecorate = (channel: amqp.Channel, handler) => (message) =>
    handler(message, () => channel.ack(message), () => channel.nack(message));

export default (channel: amqp.Channel, busConfig: any) => async (name: string, handler: (message, ack, nack) => void, context: string, opts: any = {}) => {
    const exchange = context || busConfig.context;
    const queueName = `${exchange}.${name}`;

    channel.prefetch(defaultConfig.PREFETCH);
    channel.assertExchange(exchange, 'topic', { ...defaultConfig.EXCHANGE, ...opts.exchange });
    await channel.assertQueue(queueName, { ...defaultConfig.QUEUE, ...opts.queue });
    await channel.bindQueue(queueName, exchange, name);
    channel.consume(queueName, handlerDecorate(channel, handler), { ...defaultConfig.CONSUME, ...opts.consume });
};
