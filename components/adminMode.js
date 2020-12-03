import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class adminMode extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.customHeader}>
          <View style={styles.setting}>
            <View style={styles.goBack}>
              <SafeAreaView>
                <TouchableOpacity style={styles.gobackImage}
                  onPress={() => {
                    this.props.navigation.goBack()
                  }}>
                  <FontAwesomeIcon icon={faArrowLeft} size={24} color='#161924' />
                </TouchableOpacity>
              </SafeAreaView>
            </View>
            <View style={styles.settingView}>
              <Text style={styles.settingHeader}>Cài đặt</Text>
            </View>
          </View>
          <View style={styles.user}>
            <View style={styles.avatar}>
              <Image style={styles.avatarImage}
                source={require('../images/logo_avatar.png')} />
            </View>
            <View style={styles.inforUser}>
              <Text style={styles.settingText}>Lê Đức Lộc</Text>
              <Text style={styles.settingText}>blah blah</Text>
            </View>
            <View style={styles.name}></View>

          </View>
        </View>
        <View style={styles.logOut}>

          <TouchableOpacity
            onPress={async ()=>{
              await AsyncStorage.clear()
              this.props.navigation.navigate('Login',{logoutStatus:'ok'})
            }}
          >
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    height: 110,
    backgroundColor: '#FFF'
  },
  setting: {
    flex: 2,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  settingView: {
    flex: 4,
    marginLeft: 100,
  },
  settingHeader: {
    fontSize: 18
  },
  user: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    flex: 1,
    margin: 10,

  },
  name: {
    flex: 4,
  },
  inforUser: {
    flex: 3,
    flexDirection: 'column',

  },
  settingText: {
    fontSize: 18,
  },
  goBack: {
    flex: 1,
  },
  gobackImage: {
    margin: 10,
  },
  logOut: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    margin: 10,
    height: 30,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: '#959393'
  }
});
