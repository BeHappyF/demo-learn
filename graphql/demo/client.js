import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} from 'graphql-tools';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';
import typeDefs from './schema';

import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';

// makeExecutableSchema：创建一个可执行的schema
// const schema = makeExecutableSchema({ typeDefs });

// mock
// addMockFunctionsToSchema({ schema });
// const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
});


const client = new ApolloClient({
  networkInterface,
});


// client端的查询
client.query({
    query: gql`
        query ChannelsQuery {
            channels {
                id
                name
            }
        }
    `,
}).then (({data}) => console.log(data.channels));
    // 返回的是一个对象，对象下只有一个字段data...
