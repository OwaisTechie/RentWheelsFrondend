import React, {useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import Color from '../../Theme/Colors'

const AlertView = ({title, message, buttonColor, jsonPath}) => {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={alertVisible} />
      <View style={styles.centeredView}>
        <View style = {styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView:{
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      flex:1
    },
    modalView:{
      width:'80%',
      margin:10,
      backgroundColor:Color.White,
      borderRadius:10,
      padding:15,
      alignItems:'center',
      shadowColor:Color.Black,
      shadowOffset:{
        width:0,
        height:2
      },
      shadowOpacity:0.25,
      shadowRadius:3.85,
      elevation:5,
    },
    textStyle:{
      color:Color.Black,
      textAlign:'center',
      fontSize:20,
      marginTop:20
    },
    okStyle:{
      color:Color.White,
      textAlign:'center',
      fontSize:20
    },
    modalText:{
      textAlign:'center',
      fontWeight:'bold',
      fontSize:34,
      shadowColor:Color.Black,
      shadowOffset:{
        width:0,
        height:2
      },
      shadowOpacity:0.3,
      shadowRadius:3.84,
      elevation:5
    }
})

export default AlertView;
