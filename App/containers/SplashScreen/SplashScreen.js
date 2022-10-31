import React, {useEffect} from 'react';
import {View, Text, Image,} from 'react-native';
import styles from './SplashScreenStyle';
import {Colors, Images} from '../../Theme';
const SplashScreen = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('AppSliderIntro');
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Images.Splash_gif2} style={styles.Image_style} />
      {/* <Text style={styles.Text_style}>RENT WHEELS</Text> */}
    </View>
  );
};

export default SplashScreen;
