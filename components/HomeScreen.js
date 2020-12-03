import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getTimeFromSever } from './Sever'

const dunggio = 'Bạn vẫn đang đi làm đúng giờ';
const duytri = 'Hãy cố gắng duy trì nhé!';


class FlatListItem extends Component {
  render() {
    return (
      <View style={styles.timeInfor} >
        <Text style={styles.textShow}>{this.props.item.timeIn}</Text>
        <Text style={styles.textShow}>{this.props.item.timeOut}</Text>
      </View>
    );
  }
}

export default class HomeScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      ID: this.props.navigation.getParam('ID', 'None'),
      timeIn: [],
      timeOut: [],
      name: '',
      day: '',
      refreshing: false,
    };
  }
  componentDidMount() {
    this.refreshDataFromSever();

  }
  refreshDataFromSever = () => {
    const link = 'http://8049a77d9374.ngrok.io/gettime/' + this.state.ID
    this.setState({ refreshing: true });
    getTimeFromSever(link).then((response) => {
      this.setState({ timeIn: response.timeIn })
      this.setState({ timeOut: response.timeOut })
      this.setState({ name: response.user })
      this.setState({ refreshing: false });
    })
  };

  onRefresh = () => {
    this.refreshDataFromSever();
  }

  render() {

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#2981C8', '#53AFC3']}
          style={styles.linearGradient}>
          <View style={styles.topView}>
            <View style={styles.buttonView}>
              <View style={styles.logoView}>
                <Image source={require('../images/avtOfLoc.png')} />
              </View>
              <View style={{
                marginBottom: 20,
              }}>
                <Text style={{ fontSize: 20, color: "#2981C8" }}>{this.state.name}</Text>
              </View>
              <SafeAreaView>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'flex-end', margin: 15 }}
                  onPress={() => {
                    this.props.navigation.navigate('admin')
                  }}>
                  <FontAwesomeIcon icon={faBars} size={24} color="#161924" />
                </TouchableOpacity>
              </SafeAreaView>
            </View>

            <View style={styles.infor}>
              <View style={styles.day}>
                <Text>{this.state.day}</Text>
              </View>
              <View style={styles.time}>
                <View style={styles.textTime}>
                  <View style={styles.inView}>
                    <Text style={styles.textIn}>Vào</Text>
                  </View>
                  <View style={styles.outView}>
                    <Text style={styles.textIn}>Ra</Text>
                  </View>
                </View>
                <View style={styles.timeInfor}>
                  <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                    />
                  }
                  
                    //data={flatListData}
                    data={this.state.timeIn}
                    renderItem={({ item, index }) => {
                      //console.log({item},{index})
                      return (
                        <FlatListItem
                          item={item} index={index}
                          parentFlatList={this}>
                        </FlatListItem>
                      );
                    }}></FlatList>
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                      />
                    }
                    //data={flatListData}
                    data={this.state.timeOut}
                    renderItem={({ item, index }) => {
                      //console.log({item},{index})
                      return (
                        <FlatListItem
                          item={item} index={index}
                          parentFlatList={this}>
                        </FlatListItem>
                      );
                    }}></FlatList>

                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.middleView}>
          <View style={styles.main}>
            <View style={styles.textView}>
              <Text style={styles.text1}>{dunggio}</Text>
              <Text style={styles.text2}>{duytri}</Text>
            </View>
            <View style={styles.button}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('dayoff');
                  }}>
                  <View style={styles.button1}>
                    <Image
                      style={styles.imageButton1}
                      source={require('../images/button1.jpg')}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.buttonView1}>
                  <Text style={styles.buttonText1}>Nghỉ phép</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Screen2', { test: 'test' });
                  }}>
                  <View style={styles.button2}>
                    <Image
                      style={styles.imageButton2}
                      source={require('../images/button2.jpg')}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.buttonView2}>
                  <Text style={styles.buttonText2}>Đi muộn</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('signup');
                  }}>
                  <View style={styles.button3}>
                    <Image
                      style={styles.imageButton3}
                      source={require('../images/signup.png')}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.buttonView3}>
                  <Text style={styles.buttonText3}>Đăng ký</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ED0DB',
  },
  topView: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  middleView: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  buttonView: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  main: {
    width: 360,
    alignContent: 'center',
    height: 290,
    backgroundColor: '#FFF',
    marginTop: 20,
    borderRadius: 20,
  },
  infor: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    height: 170,
    width: 360,
    marginTop: 20,
    borderRadius: 20,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    flex: 4,
    flexDirection: 'column',
  },
  timeInfor: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeIn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inView: {
    height: 30,
    width: 100,
    backgroundColor: 'green',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  outView: {
    height: 30,
    width: 100,
    backgroundColor: 'blue',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textIn: {
    fontSize: 16,
  },
  textIn: {
    fontSize: 16,
    color: '#FFF'
  },
  textTime: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  timeOut: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  linearGradient: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  textView: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  text1: {
    fontSize: 18,
  },
  text2: {
    fontSize: 18,
  },
  button: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonView1: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  buttonText: {
    fontSize: 16,
  },
  buttonView2: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText2: {
    fontSize: 16,
  },
  buttonView3: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  buttonText3: {
    fontSize: 16,
  },
  button1: {
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  imageButton1: {
    width: 50,
    height: 50,
  },
  button2: {
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  imageButton2: {
    width: 50,
    height: 50,
  },
  button3: {
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 30,
  },
  imageButton2: {
    width: 60,
    height: 60,
  },
  flatListItem: {
    flexDirection: 'row',
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  textShow: {
    fontSize: 18,
    margin: 10,
  },
});

