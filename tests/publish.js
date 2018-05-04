const config = {
    url: 'amqp://root:pass@0.0.0.0',
    service: 'nest-service',
    context: 'nest',
};

const init = async () => {
    const bus = await require('../src')(config);
    const context = 'test';
    const action = 'test';
    const message = 'Hi test !';

    bus.publish(context, action, message);
};

init();
