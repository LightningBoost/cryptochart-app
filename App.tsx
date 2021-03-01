import React from 'react';
import dayjs from 'dayjs';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import client from './src/services/graphql';
import {CombinedDarkTheme, CombinedDefaultTheme} from './src/style/theme';
import DefaultRoutes from './src/routes';

// initialize localized format
dayjs.extend(localizedFormat);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <PaperProvider theme={CombinedDefaultTheme}>
          <NavigationContainer theme={CombinedDefaultTheme}>
            <DefaultRoutes />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
