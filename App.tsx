import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import client from './src/services/graphql';
import Chart from './src/components/Chart';
import {CombinedDarkTheme} from './src/style/theme';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <Chart />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
