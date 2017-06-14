import Vue from 'vue';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj2k7qghcsgsf01116zwg632t'
  }),
  dataIdFromObject: r => r.id
});

Vue.use(VueApollo, {
  apolloClient
});

export default apolloClient;
