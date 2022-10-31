import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../Theme';

const TextButton = ({label, labelStyle, buttonContainerStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightPurple,
        ...buttonContainerStyle,
      }}
      onPress={onPress}
      >
        <Text style={{color:Colors.White,...Fonts.FONTS.h3,...labelStyle}}>
            {label}
        </Text>
      </TouchableOpacity>
  );
};

export default TextButton;
