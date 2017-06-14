import express from 'express';
import {schema} from './schema';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
    graphqlExpress,
    graphiqlExpress,
} from 'graphql-server-express';



const PORT = 4000;
const server = express();
// 从http://localhost:3000的请求允许跨域
server.use('*', cors({origin: 'http://c-local.163.com:3000'}));

server.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
}));

server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

server.listen(PORT, () => console.log(`server listen on the PORT: ${PORT}`));
