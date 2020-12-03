import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Modal
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { postIDtoSever } from './Sever';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      idUser: '',
      nameUser: '',
      Password: '',
      rePassword: '',
      modalVisible: false,
      setModalVisible: false,
      modalVisibleHad: false,
      setModalVisibleHad: false,
    };
  }

  actionSignUp = async (data) => {
    if (this.state.idUser.length == 0 ||
      this.state.nameUser.length == 0 ||
      this.state.Password.length == 0 ||
      this.state.rePassword.length == 0) {
      Alert.alert("Bạn phải điền đầy đủ thông tin ");
      return;
    }

    if (this.state.rePassword !== this.state.Password) {
      Alert.alert('Not Comfirm');
      return;
    }

    postIDtoSever(data).then((result)=>{
      if(result.result  === 'ok'){
        this.setState({modalVisible: true})
      }else if(result.result==='had'){
        this.setState({modalVisibleHad: true})
      }
      else {
        Alert.alert('Sever lỗi')
      }
    })

    this.refreshDataFromSever

  }

  componentDidMount() {
    this.refreshDataFromSever();
  }

  refreshDataFromSever = () => {
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  };

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
          <View style={styles.viewSignUp}>
            <Text style={styles.textSignUp}>Đăng ký</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.middleView}>
            <View style={styles.main}>
              <View style={styles.logo}>
                <Text style={{fontSize : 20, color: "#2981C8"}}>Xác nhận thông tin nhân viên</Text>
              </View>
              <View style={styles.signUp}>
                <View style={styles.viewID}>
                  <View style={styles.idUser}>
                    <View style={styles.imageId}>
                      <Image
                        source={require('../images/signup_id.png')}
                        style={styles.imageView}
                      />
                    </View>
                    <View style={styles.viewInput}>
                      <TextInput
                        onChangeText={(text) => this.setState({ idUser: text })}
                        style={styles.inputID}
                        
                        placeholder="Enter employee's ID"
                        value={this.state.idUser}></TextInput>
                    </View>
                  </View>
                </View>
                <View style={styles.viewID}>
                  <View style={styles.idUser}>
                    <View style={styles.imageId}>
                      <Image
                        source={require('../images/signup_name.png')}
                        style={styles.imageView}
                      />
                    </View>
                    <View style={styles.viewInput}>
                      <TextInput
                        onChangeText={(text) => this.setState({ nameUser: text })}
                        style={styles.inputID}
                        placeholder="Enter employes's name"
                        value={this.state.nameUser}></TextInput>
                    </View>
                  </View>
                </View>
                <View style={styles.viewID}>
                  <View style={styles.idUser}>
                    <View style={styles.imageId}>
                      <Image
                        source={require('../images/signup_password.png')}
                        style={styles.imageView}
                      />
                    </View>
                    <View style={styles.viewInput}>
                      <TextInput
                        onChangeText={(text) => this.setState({ Password: text })}
                        style={styles.inputID}
                        placeholder="Enter employee's password"
                        value={this.state.Password}></TextInput>
                    </View>
                  </View>
                </View>
                <View style={styles.viewID}>
                  <View style={styles.idUser}>
                    <View style={styles.imageId}>
                      <Image
                        source={require('../images/signup_repass.png')}
                        style={styles.imageView}
                      />
                    </View>
                    <View style={styles.viewInput}>
                      <TextInput
                        onChangeText={(text) =>
                          this.setState({ rePassword: text })
                        }
                        style={styles.inputID}
                        placeholder="Re Enter Password"
                        value={this.state.rePassword}></TextInput>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.buttonView}>
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
                      <Text style={styles.modalText}>Bạn đã đăng ký thành công</Text>
                      <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "green" }}
                        onPress={() => {
                          this.setState({ modalVisible: false })
                          this.setState({ idUser: '' })
                          this.setState({ nameUser: '' })
                          this.setState({ Password: '' })
                          this.setState({ rePassword: '' })
                        }}
                      >
                        <Text style={styles.textStyle}>Kết Thúc</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisibleHad}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Mã ID đã được đăng ký</Text>
                      <Text style={styles.modalText}>Xin kiểm tra lại!</Text>
                      <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "green" }}
                        onPress={() => {
                          this.setState({ modalVisibleHad: false })
                          this.setState({ idUser: '' })
                          this.setState({ Password: '' })
                          this.setState({ rePassword: '' })
                        }}
                      >
                        <Text style={styles.textStyle}>Kết Thúc</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <TouchableOpacity
                  onPress={() => {
                    const newEmployee = {
                      Id: this.state.idUser,
                      Name: this.state.nameUser,
                      Password: this.state.Password,
                    };
                    console.log(newEmployee);
                    this.actionSignUp(newEmployee);
                  }}>
                  <View style={styles.buttonSignUp}>
                    <Text>Đăng ký</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  viewSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 125,
  },
  textSignUp: {
    fontSize: 18,
    color: '#2981C8'
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
  logo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  idUser: {
    flexDirection: 'row',
    marginTop: 30,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
  },
  signUp: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputID: {
    marginLeft: 20,
  },
  imageId: {
    flex: 1,
    width: 30,
    height: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    marginTop: 17,
    width: 30,
    height: 30,
  },
  viewInput: {
    flex: 4,
  },
  buttonView: {
    flex: 1,
  },
  buttonSignUp: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ED0DB',
  },
  //AddModal.js
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
