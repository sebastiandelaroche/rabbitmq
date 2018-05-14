export const PREFETCH = 1;

export const QUEUE = {
    autoDelete: false,
    durable: true,
    exclusive: false,
};

export const EXCHANGE = {
    durable: true,
    autoDelete: false,
};

export const CONSUME = {
    noAck: false,
    exclusive: false,
};

export const PUBLISH = {
    persistent: true,
};
