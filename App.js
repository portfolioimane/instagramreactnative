import {StatusBar } from 'expo-status-bar'
import React, { Component} from 'react'
import {View, Text } from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store=createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAXWCwHRMRla1qYXdXVZRp25o2NknQZoTE",

  authDomain: "instagram-demo-fcc45.firebaseapp.com",

  projectId: "instagram-demo-fcc45",

  storageBucket: "instagram-demo-fcc45.appspot.com",

  messagingSenderId: "1041494301114",

  appId: "1:1041494301114:web:a887d69892e9aa7141a583",

  measurementId: "G-N3DGF7GQGH"

};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator ();

export class App extends Component {
  constructor(props){
  super (props);
  this.state = {
    loaded: false,
   }
  }
componentDidMount (){
  firebase.auth().onAuthStateChanged( (user)=> {
        if(!user){
      this.setState({
        loggedIn: false,
        loaded: true,
      })
    }else {
      this.setState({
        loggedIn: true,
        loaded: true,
      })
      }
  })
  }
  render() {
    const {loggedIn, loaded}=this.state;
    if(!loaded){
      return(
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
          </View>
        )
    }
    if(!loggedIn){
        return (       
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Landing">
         <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown : false}}/>
         <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
         </Stack.Navigator>
        </NavigationContainer>             
      );
    }

    return(
        <Provider store= {store}>
          <MainScreen />
        </Provider>      
        )
  }
}
export default App