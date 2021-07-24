import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://cryptochart.sa.ngrok.io/cryptocharts-fdc64/us-central1/api',
  cache: new InMemoryCache(),
});

export default client;
