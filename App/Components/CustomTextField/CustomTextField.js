import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './TextFieldStyle';
import {ApplicationStyles, Colors} from '../../Theme';
import Icon from 'react-native-vector-icons/Feather';
// import TextInputMask from 'react-native-text-input-mask';

//props
//placeholder
//maxLength
//ispass
//text_input
//keyboardType
//icon_namec
//Textfield_label
//backgroundColor
//onChangeText
//left_icon_name
//onPress_icon
//masked
//disabled
const margin = 6;
const CustomTextField = (props) => {
  let masked = props.masked;
  return (
    <View>
      <Text
        style={{
          marginLeft: 30,
          marginBottom: 5,
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        {props.Textfield_label}
      </Text>
      <View
        style={[
          styles.text_container,
          {backgroundColor: Colors.textFieldCOlor, alignItems: 'center'},
        ]}>
        <Icon
          name={props.icon_name}
          color={Colors.primary_green}
          style={styles.icon_style}
          size={20}
        />
        <TextInput
          placeholder={props.placeholder}
          style={styles.text_input}
          maxLength={props.maxLength}
          secureTextEntry={props.ispass}
          value={props.text_input}
          keyboardType={props.keyboardType}
          onChangeText={(value) => {
            props.onChangeText(value);
          }}
          render={(props) => <TextInputMask {...props} mask={masked} />}
          theme={{
            colors: {primary: Colors.textFieldCOlor, secondary: Colors.White},
          }}
        />
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => {
            props.onPress_icon;
          }}>
          <Icon
            name={props.left_icon_name}
            color={Colors.primary_green}
            style={styles.icon_style}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTextField;
