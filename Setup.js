import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class App extends Component {
   render() {
    return (
      <WebView        
        source={{ uri: "https://evening-earth-70925.herokuapp.com/login"}}
        originWhitelist={['*']}
        style={{ marginTop: 20 }}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
          console.log(event.nativeEvent.data);
        }}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        domStorageEnabled={true}
        useWebKit={true}
      />
    );
  }
}