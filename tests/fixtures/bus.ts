export const config = {
    url: 'amqp://root:pass@0.0.0.0',
    service: 'nest-service',
    context: 'nest',
};

export const subscribe = {
    name: 'create',
};

export const publish = {
    name: 'create',
    message: 'test message',
};