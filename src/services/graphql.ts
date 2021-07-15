import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5001/cryptocharts-fdc64/us-central1/api',
  cache: new InMemoryCache(),
});

export default client;
