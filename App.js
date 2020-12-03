import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-ionicons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import {faRobot} from '@fortawesome/free-solid-svg-icons';

// =============================== Screen ================================
import LoginDone from './components/LoginDone';
import HomeScreen from './components/HomeScreen';
import TimeKeeping from './components/TimeKeeping';
import Dayoff from './components/Dayoff';
import Late from './components/Late';
import Notification from './components/Notification';
import Test2 from './components/Test2';
import SignUp from './components/SignUp';
import adminMode from './components/adminMode';
import LoginScreen from './components/Login'
// =======================================================================
import Test4 from './components/Test4';

import {
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  containter: {
    flexDirection: 'column',
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollview: {
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  inputView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6BB7EA',
    height: 40,
    width: 200,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  buttonFinger: {
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 40,
    width: 40,
    backgroundColor: '#80BAE0',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  inputID: {
    height: 55,
    width: 350,
    marginTop: 30,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#F9F9FA',
  },
  inputPassword: {
    height: 55,
    width: 350,
    marginTop: 30,
    marginLeft: 30,
    margin: 20,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#F9F9FA',
  },
});

const Stack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title:'Trang chủ',
        tabBarIcon: ({ focused, horizontal, tintColor }) =>{
          return <FontAwesomeIcon icon={faHome} size={16}  color ={tintColor}/>
        },
      })
    },
    TimeKeeping: {
      screen: TimeKeeping,
      navigationOptions: () => ({
        title:'Chấm Công',
        tabBarIcon: ({ focused, horizontal, tintColor }) =>{
          return <FontAwesomeIcon icon={faRobot} size={16}  color ={tintColor}/>
        },
      })
    },
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      initialRouteName: 'Home',
      tabBarOptions: {
      
        activeTintColor: '#2981C8',
        activeBackgroundColor: '#FFF',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 14,
        },
      },
    }),
  },
);


const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerShown: false,
        headerMode: 'none',
        headerBackTitle: null,
      })
    },
    Home: {
      screen: Stack,
      navigationOptions: () => ({
        headerShown: false,
        headerMode: 'none',
        headerBackTitle: null,
      }),
    },
    admin: {
      screen: adminMode,
      navigationOptions: () => ({
        headerShown: false,
        headerMode: 'none',
        headerBackTitle: null,
      }),
    },
    signup: {
      screen: SignUp,
      navigationOptions: () => ({
        headerShown: false,
        headerMode: 'none',
        headerBackTitle: null,
      }),
    },
    dayoff: {
      screen: Dayoff,
      navigationOptions: () => ({
        headerShown: false,
        headerMode: 'none',
        headerBackTitle: null,
      })
    },
    Screen2: Late,
    Screen3: Notification,
    LoginD: LoginDone,
    Test: Test4,

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      initialRouteName: 'Login',
    }),
  },
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  static navigationOptions = {
    headerShown: false,
    headerMode: 'none',
  };

  render() {
    return <AppContainer />;
  }
}
