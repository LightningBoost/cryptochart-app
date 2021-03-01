import React from 'react';
import dayjs from 'dayjs';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import client from './src/services/graphql';
import DefaultRoutes from './src/routes';
import redux from './src/providers/Store';

// initialize localized format
dayjs.extend(localizedFormat);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <Provider store={redux().store}>
          <PersistGate persistor={redux().persistor} loading={null} />
          <DefaultRoutes />
        </Provider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
