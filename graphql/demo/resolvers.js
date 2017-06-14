const channels = [{
    id: 1,
    name: 'soccer',
}, {
    id: 2,
    name: 'baseball',
}];
let nextId = 3;

export default {
    Query: {
        channels: () => {
            return channels;
        }
    },
    Mutation: {
        addChannel: (root, {name}) => {
            const newChannel = { id: nextId++, name: name };
            channels.push(newChannel);
            return newChannel;
        }
    }
}

