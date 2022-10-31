import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {CustomIcons, Fonts} from '../../Theme';

const TextIconButton = ({
  containerStyle,
  label,
  labelStyle,
  icon,
  iconStyle,
  type,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text style={{...Fonts.FONTS.body3, ...labelStyle}}>{label}</Text>
      <CustomIcons
      style={{marginLeft:5}}
        color={iconStyle.color}
        type={type}
        name={icon}
        size={25}
      />
    </TouchableOpacity>
  );
};

export default TextIconButton;
