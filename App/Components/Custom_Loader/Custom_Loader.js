import React, {useState} from 'react';
import {View, Modal, Image, Dimensions, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Images} from '../../Theme';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import {useSelector} from 'react-redux';

const Custom_Loader = (props) => {
  const {Loader} = useSelector(state => state.auth);
  return Loader ? (
    <View style={styles.fullScreenView}>
      <View style={styles.loaderView}>
        <Image
          source={Images.nbp_loader}
          style={styles.image}
          resizeMode={'cover'}
        />
      </View>
    </View>
  ) 
  : null;
};
const styles = StyleSheet.create({
  fullScreenView: {
    position: 'absolute',
    flex:1,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  loaderView: {
    flex:2,
    width: width / 2,
    height: height / 5,
    overflow: 'hidden',
    position: 'absolute',
    opacity: 1,
  },
  image: {width: '100%', height: '100%'},
});

export default Custom_Loader;
