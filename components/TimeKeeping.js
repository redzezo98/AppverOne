import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Image,
  Modal,
  TouchableHighlight
} from 'react-native';

import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator';
import LinearGradient from 'react-native-linear-gradient';
import flatListData from './Testdata';
import { getUserFromSever, postImageToSever, postAnswertoSever } from './Sever';

class FlatListItem extends Component {
  render() {
    return (
      <View style={styles.flatListItem}>
        <Text style={styles.textShow}>{this.props.item.time}</Text>
        <Text style={styles.textShow}>{this.props.item.name}</Text>
      </View>
    );
  }
}
class FlatListItem2 extends Component {

  Choose = async () => {
    const data = {
      name: this.props.item.name,
      time: this.props.parentFlatList.state.time
    }
    postAnswertoSever(data).then((result) => {
      if (result !== null) {
        this.props.parentFlatList.setState({ modalVisible: false })
        this.props.parentFlatList.refreshDataFromSever();
      }
      else {
        Alert.alert(JSON.stringify(result))
      }
    })

  }

  render() {
    return (
      <View style={styles.flatListItem}>
        <TouchableOpacity
          style={{ ...styles.openButton }}
          onPress={this.Choose}
        >
          <Text style={styles.textShow}>{this.props.item.name}</Text>
          <Text style={styles.textShow}>{this.props.item.predict}%</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class TimeKeeping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RowKey: null,
      refreshing: false,
      userFromSever: [],
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      modalVisible: false,
      setModalVisible: false,
      modalVisible2: false,
      setModalVisible2: false,
      user: '',
      list: [],
      time: ''
    };
  }

  componentDidMount() {
    this.refreshDataFromSever();
  }

  refreshDataFromSever = () => {
    this.setState({ refreshing: true });
    getUserFromSever()
      .then((users) => {
        console.log(users);
        this.setState({ userFromSever: users });
        console.log(this.state.userFromSever);
        this.setState({ refreshing: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ userFromSever: [] });
        this.setState({ refreshing: false });
      });
  };

  onRefresh = () => {
    this.refreshDataFromSever();
  }

  launchCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        privateDirectory: true
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        var d = new Date()
        let minutes = ''
        if (d.getMinutes() >= 0 && d.getMinutes() < 10) {
          minutes = '0' + d.getMinutes()
        } else {
          minutes = d.getMinutes()
        }
        let time = d.getHours() + ':' + minutes
        const data = {
          base64: response.data,
          time: time
        }
        this.setState({ modalVisible2: true })
        postImageToSever(data).then((result) => {
          if (result !== null) {
            this.setState({ modalVisible2: false })
            //this.setState({ user: result.name })
            this.setState({ list: result.list })
            this.setState({ time: result.time })
            //console.log(this.state.user)
            this.setState({ modalVisible: true })
          }
          else {
            Alert.alert(JSON.stringify(result))
          }
        })
        const source = { uri: response.uri };
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      // return <Image source={require('./assets/dummy.png')}
      //   style={styles.images}
      // />
    }
  }

  action = async () => {
    await this.launchCamera()
    console.log('yo')

  }


  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#2981C8', '#53AFC3']}
          style={styles.linearGradient}>
          <View style={styles.topView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {this.renderFileData()}
                  <Text style={styles.modalText}>Xác nhận bạn là: </Text>
                  <FlatList
                    //data={flatListData}
                    data={this.state.list}
                    renderItem={({ item, index }) => {
                      //console.log({item},{index})
                      return (
                        <FlatListItem2
                          item={item} index={index}
                          parentFlatList={this}>
                        </FlatListItem2>
                      );
                    }}></FlatList>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible2}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{marginBottom: 10}}>
                    <TextLoader  text="Đang chờ xử lý" />
                  </View>
                  
                  <CirclesLoader />
                  
                </View>
               
              </View>
            </Modal>
            <TouchableOpacity
              onPress={this.launchCamera}
            >

              <View style={styles.timeKeeping}>
                <Image source={require('../images/timekeeping.png')} />
                <Text style={styles.timeKeepingText}>Chấm công</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.middleView}>
          <View style={styles.main}>
            <View style={styles.show}>
              <FlatList

                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />
                }
                //data={flatListData}
                data={this.state.userFromSever}
                renderItem={({ item, index }) => {
                  //console.log({item},{index})
                  return (
                    <FlatListItem item={item} index={index}></FlatListItem>
                  );
                }}></FlatList>
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
  linearGradient: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 170,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  timeKeeping: {
    width: 120,
    height: 120,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  timeKeepingText: {
    fontSize: 18,
    marginTop: 10,
  },
  buttonKeep: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
  },
  middleView: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  main: {
    width: 360,
    alignContent: 'center',
    height: 400,
    backgroundColor: '#FFF',
    marginTop: 20,
    borderRadius: 20,
  },
  show: {
    flex: 1,
    margin: 20,
  },
  textShow: {
    fontSize: 18,
    margin: 10,
  },
  flatListItem: {
    flexDirection: 'row',
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  //test
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: 250,
    height: 50,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
