const config = {
    url: 'amqp://root:pass@0.0.0.0',
    service: 'nest-service',
    context: 'nest',
};

const init = async () => {
    const bus = await require('../src')(config);
    const context = 'test';
    const action = 'test';
    const handler = (message) => {
        console.log('message', message.content.toString());
    };

    await bus.subscribe(context, action, handler);
    console.log(`I'm subscribed!`)
};

init();