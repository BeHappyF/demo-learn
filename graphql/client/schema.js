import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from  'graphql';
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

function getPersonByURL(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`)
        .then(res => res.json())
        .then(json => json.person);
}

const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'xxx',

    fields: () => ({
        firstName: {
            type: GraphQLString,
            resolve: (person) => person.first_name,
        },
        lastName: {
            type: GraphQLString,
            resolve: (person) => person.last_name,
        },
        email: {type: GraphQLString},
        username: {type: GraphQLString},
        id: {type: GraphQLString},
        friends: {
            type: new GraphQLList(PersonType),
            resolve: (person) =>
                person.friends.map(getPersonByURL)
        }
    })
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'xxx',

    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: (root, args) =>
                getPersonByURL(`/people/${args.id}/`)
        }
    })
})

export default new GraphQLSchema({
    query: QueryType,
})
