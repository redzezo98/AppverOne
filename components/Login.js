import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postAccounttoSever } from './Sever'
import SplashScreen from '../components/splashScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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

export default class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    headerMode: 'none',
  };
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      isLoading: true,
      username: '',
      password: '',
      Token: '',
      checkFlag: '',
    };
  }

  activeLogout = async () => {
      console.log('clear_done')
      await AsyncStorage.clear();
  };

  onSubmit = async () => {
    console.log(this.state.username);
    const account = {
      ID: this.state.username,
      password: this.state.password,
    };
    let key = await postAccounttoSever(account).then((result) => {
      return result.result;
    });
    if (key !== 'ok') {
      alert('Wrong Id or password, please try again!');
      return;
    } else {
      try {
        this.setState({ Token: 'abc123' });
        await AsyncStorage.setItem('token', 'abc123');
        await AsyncStorage.setItem('username', this.state.username);
        await AsyncStorage.setItem('password', this.state.password);
        await AsyncStorage.setItem('checkFlag', 'true');
      } catch (error) {
        console.error(error);
      }
      console.log(this.state.username);
      let data = { ID: this.state.username };
      this.setState({username:''})
      this.setState({password:''})
      console.log(data);
      this.props.navigation.navigate('Home', data);
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const checkFlag = await AsyncStorage.getItem('checkFlag');
      if (value !== null) {
        this.setState({ Token: value });
      }
      if (username !== null) {
        this.setState({ username });
      }
      if (password !== null) {
        this.setState({ password });
      }
      if (checkFlag !== null) {
        this.setState({ checkFlag });
      }
    } catch (err) { }
  };

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({ isLoading: false });
    }
    console.log('check')
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    const logoutStatus = this.props.navigation.getParam('logoutStatus', 'None')

    if (this.state.checkFlag === 'true') {
      return (
        this.props.navigation.navigate('Home', { ID: this.state.username })
      )
    } else {
      return (
        <View>
          <ImageBackground
            style={[styles.fixed, styles.containter, { zIndex: -1 }]}
            source={require('../images/Login.png')}>
            <ScrollView 
            keyboardShouldPersistTaps='handled'
            style={[styles.scrollview]}>
              <View style={styles.logo}>
                <Image source={require('../images/logo_2.png')}/>
              </View>
              <KeyboardAwareScrollView>
              <View style={styles.inputView}>
                <TextInput
                  onChangeText={(text) => this.setState({ username: text })}
                  style={styles.inputID}
                  placeholder="Enter your ID"
                  autoFocus={true}
                  value={this.state.username}
                />
              </View>
              </KeyboardAwareScrollView>
              <KeyboardAwareScrollView>
              <View styles={styles.inputView}>
                <TextInput
                  onChangeText={(text) => this.setState({ password: text })}
                  style={styles.inputPassword}
                  secureTextEntry={true}
                  keyboardType="phone-pad"
                  placeholder="Enter your Password"
                  value = {this.state.password}
                />
              </View>
              </KeyboardAwareScrollView>

              <View style={styles.buttonView}>
                <View>
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={this.onSubmit}>
                    <Text style={{ flex: 1 }}>Login</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonFinger}>
                  <Image source={require('../images/finger.png')} />
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }
  }
}

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
