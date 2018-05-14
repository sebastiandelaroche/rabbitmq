import { bus as createBus } from '../../src';
import * as fixtures from '../fixtures/bus';

describe('functional test', () => {

    it('should publish a message to the queue of rabbitmq and the subscribe listen it', async () => {
        const bus = await createBus(fixtures.config);

        const assertFn = (message, ack) => {
            console.log(message.toString());
            ack();
        };

        await bus.subscribe(fixtures.subscribe.name, assertFn, null);
        await bus.publish(fixtures.publish.name, fixtures.publish.message, null);
    });

});
