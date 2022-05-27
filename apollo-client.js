import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.STEPZEN_HOST_URL,
  headers: {
    Authorization: `ApiKey ${process.env.STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
