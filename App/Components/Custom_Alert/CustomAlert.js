import React, {useState} from 'react';
import {View, Dimensions, TouchableOpacity, Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import styles from './CustomAlertStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../Theme';
import CustomBtn from '../../Components/Custom_btn/Custom_btn';
const width = Dimensions.get('screen').width;

//overlay_state
//props.onPressClosebtn()
//props.onPressCancel()
//props.onPressOkay()
//alert_text

const CustomAlert = (props) => {
  // const [overlay_state,setOverlayState]=useState(false)

  return (
    <Overlay
      animationType={'slide'}
      isVisible={props.overlay_state}
      overlayStyle={styles.overlay}>
      <View style={{width: width / 1.19}}>
        <TouchableOpacity
          onPress={() => {
            props.onPressClosebtn();
          }}>
          <Icon
            name={'close-circle'}
            style={{alignSelf: 'flex-end'}}
            size={25}
            color={Colors.primary_green}
          />
        </TouchableOpacity>
      </View>
      <Icon
        name={'alert-outline'}
        size={55}
        style={{alignSelf: 'center'}}
        color={Colors.alet_icon}
      />
      <View style={styles.gap}></View>
      <Text style={styles.alert_text}>{props.alert_text}</Text>
      <View style={styles.gap}></View>
      <Text
        style={{
          alignSelf: 'center',
          width: width / 1.5,
          textAlign: 'center',
          color: Colors.paleorange,
          margin: 15,
        }}>
        {props.alertShortText}
      </Text>
      {/* <View style={styles.gap}></View> */}
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        {props.iscancelbtn ? (
          <>
            <CustomBtn
              btn_txt={'Cancel'}
              onPress={() => {
                props.onPressCancel();
              }}
              btn_width={width / 3.5}
              backgroundColor={Colors.grey}
            />
            <View style={{width: 20}}></View>
          </>
        ) : null}
        <CustomBtn
          btn_txt={'Okay'}
          onPress={() => {
            props.onPressOkay();
          }}
          btn_width={width / 3.5}
          backgroundColor={Colors.primary_green}
        />
      </View>
    </Overlay>
  );
};

export default CustomAlert;
