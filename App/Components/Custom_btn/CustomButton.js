import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Colors, Images} from '../../Theme';
import LottieView from 'lottie-react-native';
const CustomButton = ({title, width, height,loader=false,props, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      disabled={loader}
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: height || 55,
        width: width || '100%',
        borderRadius: 18,
        // backgroundColor: '#3E3D40',
        backgroundColor: '#05375a',
        // marginVertical: 10,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}>
      {loader ? (
        <LottieView
        style={{
          width: 200,
          height: 110,
          
          // marginLeft: - 5
        }}
          resizeMode="cover"
          source={require('../../Assets/animations/lf30_editor_x8anivwd.json')}
          autoPlay
          loop
        />
      ) : (
        <Text style={{color: Colors.White, fontWeight: 'bold', fontSize: 18}}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
