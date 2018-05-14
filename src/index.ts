import * as amqp from 'amqplib';
import publish from './publish';
import subscribe from './subscribe';

const createChannels = connection => Promise.all([
    connection.createChannel(),
    connection.createChannel(),
]);

export const bus = (config) => amqp.connect(config.url)
    .then(connection => createChannels(connection).then(channels => [connection, channels]))
    .spread((connection, [publishChannel, subscribeChannel]) => ({
        connection,
        publish: publish(publishChannel, config),
        subscribe: subscribe(subscribeChannel, config),
    }));
