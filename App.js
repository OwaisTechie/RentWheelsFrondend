import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  LogBox
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import Route from './App/Navigators/StackNavigator/MainNavigator/index';
// import {Provider} from 'react-redux';
// import store from './App/Redux/Store/Store';
// import Custom_Loader from './App/Components/Custom_Loader/Custom_Loader';
// import CustomAlert from './App/Components/Custom_Alert/CustomAlert';
// import GlobalAlert from './App/Components/GlobalAlert/GlobalAlert';
import store from './App/Redux/store/store';
import {Provider, useDispatch} from 'react-redux';
import Custom_Loader from './App/Components/Custom_Loader/Custom_Loader';
import {View} from 'react-native-animatable';
import CustomInput from './App/Components/CustomTextField/CustomInput';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from './App/Theme';
import { setIpAddrees } from './App/Redux/auth/Reducer/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from './App/Config/IpAddress';

LogBox.ignoreAllLogs(true);

const App = props => {
  const dispatch = useDispatch();
  const [showRoute,setShowRoute] = useState(false)
  const [ipAddress,setAddress] = useState(false)
  const [modalVisible, setModalVisible] = useState(true);
  const handleSubmit = () => {
    // dispatch(setIpAddrees(ipAddress))
    ip.setIp(ipAddress);
    // AsyncStorage.setItem('ipAddress',ipAddress);
    setModalVisible(!modalVisible)
    setShowRoute(true);
    // console.log("IPADDRESS ->> ",ipAddress);
  }
  
  if(!showRoute) {
    return (<Route />)
  }

  return (
      <View>
        
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <View style={{width:widthPercentageToDP('80%')}}>
                  <CustomInput
                    placeholder={'Enter Ip Address'}
                    iconName="ios-timer-sharp"
                    type="ionicon"
                    label="Ip Address"
                    value={ipAddress}
                    returnKeyType="next"
                    returnKeyLabel="next"
                    onChangeText={values => setAddress(values)}
                    selectTextOnFocus={false}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                  />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleSubmit}>
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        {/* {showRoute &&  */}
        {/* <Route /> */}
        {/* } */}
      </View>
  );
};

const AppWrapper = () => {

  return (
    <Provider store={store}>
      <App /> 
      <Toast />
      <Custom_Loader />
    </Provider>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  modalView: {
    padding:15,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor:Colors.lightPurple,
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

export default AppWrapper;
