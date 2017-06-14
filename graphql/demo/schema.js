import resolvers from './resolvers';
import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} from 'graphql-tools';

const typeDefs = `
type Channel {
  id: ID!
  name: String
}

type Query {
  channels: [Channel]
}

type Mutation {
    addChannel(name: String!): Channel
}
`;

const schema = makeExecutableSchema({typeDefs, resolvers});
// addMockFunctionsToSchema({schema});

export { schema };
