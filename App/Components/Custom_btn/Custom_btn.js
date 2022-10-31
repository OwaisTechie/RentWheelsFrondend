import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Colors, Images} from '../../Theme';
const Button = ({title,width, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: width,
        backgroundColor: '#05375a',
        // backgroundColor: Colors.Black,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: Colors.White, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;