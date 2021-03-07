import React from 'react';
import dayjs from 'dayjs';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import client from './src/services/graphql';
import DefaultRoutes from './src/routes';
import Store from './src/providers/Store';

// initialize localized format
dayjs.extend(localizedFormat);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <Store>
          <DefaultRoutes />
        </Store>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
