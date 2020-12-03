import React, { Component } from 'react'
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

export default class LoginDone extends Component {
    static navigationOptions = {
        headerShown : false,
        headerMode: 'none'
      }
    render() {
        return (
            <View>
        <ImageBackground
          style={[styles.fixed, styles.containter, {zIndex: -1}]}
          source={require('../images/Login.png')}>
          <ScrollView style={[styles.scrollview]}>
            <View style={styles.logo}>
              <Image source={require('../images/logo_2.png')} />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.textUser}>Chào mừng bạn, Lê Đức Lộc</Text>
            </View>
            <View styles={styles.inputView}>
              <TextInput
                onChangeText={(text) => this.setState({RightPassword: text})}
                style={styles.inputPassword}
                secureTextEntry={true}
                keyboardType="phone-pad"
                placeholder="Enter your Password"
              />
            </View>
            <View style={styles.buttonView}>
              <View >
                <TouchableOpacity 
                style={styles.buttonLogin}
                onPress={() => {
                if (
                  this.state.RightID != 'admin' ||
                  this.state.RightPassword != 'admin'
                ) {
                  alert('Wrong Id or password, please try again!');
                  return;
                } else {
                  this.props.navigation.navigate('Home');
                }}}
                >
                  <Text style={{flex:1}} >Login</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonFinger}>
                <Image source={require('../images/finger.png')} />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
        )
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
    textUser: {
        padding: 20,
        color: 'black',
        fontSize: 16
    }
  });