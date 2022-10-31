import React, {useState} from 'react';
import {View, Modal, Image, Dimensions, StyleSheet, Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Images, Colors} from '../../Theme';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import {useSelector} from 'react-redux';
import Custom_btn from '../Custom_btn/Custom_btn';

const DriverAlert = (props) => {
  return props.showalert ? (
    <View style={styles.fullScreenView}>
      <View style={styles.loaderView}>
        <Image
          source={Images.nbp_loader}
          style={styles.image}
          resizeMode={'contain'}
        />
        <Text
          style={{
            alignSelf: 'center',
            fontSize: width / 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Are You Sure You Want to Pick Up this Package ?
        </Text>
        <View style={styles.gap}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: width / 10,
          }}>
          <Custom_btn
            btn_txt={'Yes'}
            onPress={() => {
              props.onPress1();
            }}
            btn_width={width / 3}
            backgroundColor={Colors.primary_green}
          />

          <Custom_btn
            btn_txt={'No'}
            onPress={() => {
              props.onPress2();
            }}
            btn_width={width / 3}
            backgroundColor={Colors.grey}
          />
        </View>
        <View style={styles.littlegap}></View>
      </View>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  fullScreenView: {
    position: 'absolute',
    height: height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  loaderView: {
    width: width / 1.1,

    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 10,
  },
  image: {width: width / 2, height: width / 2, alignSelf: 'center'},
  gap: {
    height: height / 40,
  },
  littlegap: {
    height: height / 60,
  },
});

export default DriverAlert;
