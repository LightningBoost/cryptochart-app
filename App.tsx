import React from 'react';
import dayjs from 'dayjs';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import client from './src/services/graphql';
import DefaultRoutes from './src/routes';
import {store, persistor} from './src/providers/Store';
import {BottomSheet} from './src/components/BottomSheet';

// initialize localized format
dayjs.extend(localizedFormat);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null} />
          <DefaultRoutes />
          <BottomSheet />
        </Provider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
