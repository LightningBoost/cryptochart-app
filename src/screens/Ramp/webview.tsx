import React from 'react';
import WebView from 'react-native-webview';

import SafeAreaView from '../../components/View/safeAreaView';

const RampWebView: React.FC = () => {
  return (
    <SafeAreaView edges={['bottom']}>
      <WebView
        onError={(e) => {
          console.log('webview error:', e.nativeEvent);
        }}
        onHttpError={(e) => {
          console.log('onHttpError error:', e.nativeEvent);
        }}
        // CORS settings
        // allowUniversalAccessFromFileURLs={true}
        onMessage={(event) => {
          console.log({event: event.nativeEvent.data});
        }}
        source={require('./ramp_template.html')}
      />
    </SafeAreaView>
  );
};

export default RampWebView;
