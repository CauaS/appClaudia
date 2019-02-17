import React,  { Component } from 'react';
import Router from './src/Router';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers/';
import ReduxThunk from 'redux-thunk';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EFA9E6',
    accent: '#EFA9E6',
  }
};

export default class Main extends Component {

  componentWillMount(){
    // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAZF5nEdHtF7Gi8TdCXl5NpMJdndse8hXQ",
      authDomain: "bdclaudia1.firebaseapp.com",
      databaseURL: "https://bdclaudia1.firebaseio.com",
      projectId: "bdclaudia1",
      storageBucket: "bdclaudia1.appspot.com",
      messagingSenderId: "449030129294"
    };
      firebase.initializeApp(config);
    }
  render() {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <PaperProvider theme={theme}>
             <Router />
          </PaperProvider>
       </Provider>
    );
  }
}
