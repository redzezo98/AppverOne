import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { postIDtoSever } from './Sever';

export default class Dayoff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: "2016-05-15",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.customHeader}>
          <View style={styles.goBack}>
            <SafeAreaView>
              <TouchableOpacity
                style={styles.gobackImage}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <FontAwesomeIcon icon={faArrowLeft} size={24} color="#161924" />
              </TouchableOpacity>
            </SafeAreaView>
          </View>
          <View style={styles.viewDayoff}>
            <Text style={styles.textDayoff}>Xin nghỉ phép</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.middleView}>
            <View style={styles.main}>
              <View style={styles.day}>
                <View style={styles.startDay}>
                  <Text style={styles.text}>Từ ngày</Text>
                  <View style={{
                    marginTop: 10,
                    borderWidth: 1,
                    backgroundColor: '#C1C0C0',
                    width: 100,
                    height: 30,
                  }}>
                    <Text style={{
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>05/05/2020</Text>
                  </View>
                </View>
                <View style={styles.endDay}>
                  <Text style={styles.text}>Đến ngày</Text>
                </View>
              </View>
              <View style={styles.reason}></View>
              <View style={styles.otherReason}></View>
              <View style={styles.details}></View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ED0DB',
  },
  customHeader: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: '#FFF',
  },
  gobackImage: {
    margin: 10,
  },
  goBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDayoff: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
  },
  textDayoff: {
    fontSize: 18,
  },
  middleView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 540,
    width: 360,
    marginTop: 30,
    borderRadius: 20,
  },
  day: {
    flex: 1,
    flexDirection: 'row'
  },
  reason: {
    flex: 1,
  },
  otherReason: {
    flex: 1,
  },
  details: {
    flex: 1,
  },
  startDay: {
    flex: 1,
    margin: 20,
  },
  endDay: {
    flex: 1,
    margin: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3790C7'
  }
})
