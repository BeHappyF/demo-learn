var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// 构建一个schema(方案)，使用GraphQL语言
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world2!';
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,     // 可以在开发环境下去debugger每个api
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
