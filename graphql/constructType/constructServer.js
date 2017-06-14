var express = require('express')
var graphqlHTTP = require('express-graphql')
var graphql = require('graphql')


var fakeDatabase = {
    'a': {
        id: 'a',
        name: 'slice'
    },

    'b': {
        id: 'b',
        name: 'bob'
    }
};

var userType = new graphql.GraphQLObjectType({
    name: 'type',
    fields: {
        id: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString}
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {type: graphql.GraphQLString}
            },
            resolve: (_, {id}) => {
                return  fakeDatabase[id];
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({query: queryType});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000)
console.log('Running ...')
