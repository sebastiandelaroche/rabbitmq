import * as amqp from 'amqplib';
import * as defaultConfig from './default.config';

export default (channel: amqp.Channel, busConfig: any) => (name: string, message: any, context: string, opts: any = {}) => {
    const exchange = context || busConfig.context;
    const messageBuffer = new Buffer(message);

    channel.assertExchange(exchange, 'topic', { ...defaultConfig.EXCHANGE, ...opts.exchange });
    channel.publish(exchange, name, messageBuffer, { ...defaultConfig.PUBLISH, ...opts.publish });
};
