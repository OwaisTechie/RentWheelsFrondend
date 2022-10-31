import React from 'react';

import {View, Text, StyleSheet,Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Colors, Fonts} from '../../Theme';



const TwoPointSlider = ({values, min, max, prefix, postfix, onValueChange}) => {
  return (
    <MultiSlider
      values={values}
      sliderLength={Fonts.SIZES.width - Fonts.SIZES.padding * 2 - 45}
      min={min}
      max={max}
      step={1}
      markerOffsetY={20}
      selectedStyle={{
        backgroundColor: Colors.lightPurple
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: Colors.lightgrey,
      }}
      minMarkerOverlapDistance={50}
      customMarker={e => {
        return (
          <View
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 4,
                borderColor: Colors.White,
                backgroundColor:Colors.lightPurple,
                ...styles.shadow
              }}
            />
            <Text style={{marginTop:5,textAlign:'center',width:Fonts.SIZES.width/5,color:Colors.darkgrey,...Fonts.FONTS.body3}}>
                {prefix}{e.currentValue}{postfix}
            </Text>
          </View>
        );
      }}
      onValuesChange={(values) => onValueChange(values)}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});

export default TwoPointSlider;
