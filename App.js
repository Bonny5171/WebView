import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { decode } from 'base-64';

const URI = "https://evening-earth-70925.herokuapp.com/login";
const style = { justifyContent: 'center', height: '100%', paddingHorizontal: 20, flexDirection: 'column' };

export default class App extends Component {
  state = {
    login: '',
    senha: '',
    page: 'login',
    token: '',
    
  }

  _renderLogin = () => {
    return (
      <View style={style}>
        
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          onChangeText={(login) => this.setState({login})}
          placeholder="Usuário"
        />

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          onChangeText={(senha) => this.setState({senha})}
          placeholder="Senha"
        />

        <Button
          onPress={() => this.setState({ page: 'webview' })}
          title="Logar"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

      </View>
    )
  }

  _renderWebView = () => {
    return (
      <WebView        
        source={{ uri: URI }}
        originWhitelist={['*']}
        style={{ marginTop: 20 }}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
          console.log(event.nativeEvent.data);
          this.setState({ page: 'setup', token: event.nativeEvent.data })
        }}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        domStorageEnabled={true}
        useWebKit={true}
      />
    );
  }

  _renderSetup = () => {
    const objectRes = decode(this.state.token);
    return (
      <View style={style}>
        <Text>Voce esta logado, iniciando download do banco de dados.</Text>
        <Text>{objectRes}</Text>
      </View>
    )
  }

  render() {
    if (this.state.page === 'login') {
      return this._renderLogin();
    }

    if (this.state.page === 'webview') {
      return this._renderWebView();
    }

    if (this.state.page === 'setup') {
      return this._renderSetup();
    }

    return (
      <View style={style}>
        <Text>Defina uma pagina inicial</Text>
      </View>
    );
  }
}