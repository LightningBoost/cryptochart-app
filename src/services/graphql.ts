import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://cryptochart.sa.ngrok.io',
  cache: new InMemoryCache(),
});

export default client;
