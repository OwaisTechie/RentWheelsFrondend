import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Colors, Images} from '../../Theme';
const CustomButton = ({title,width,height, onPress = () => {},props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}

      style={{
        height: height || 55,
        width: width || '100%',
        borderRadius: 18,
        // backgroundColor: '#3E3D40',
        backgroundColor: '#05375a',
        // marginVertical: 10,
        marginBottom:5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
      >
      <Text style={{color: Colors.White, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;