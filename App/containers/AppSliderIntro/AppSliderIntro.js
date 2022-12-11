//import liraries
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './AppliderIntroStyle';
import Swiper from 'react-native-swiper';
import {Colors, Images} from '../../Theme';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
// createColors a component

const AppSliderIntro = (props) => {
  const [page, setCurrentPage] = useState(0);
  const swiper = useRef(null);
  const [enable, setEnable] = useState(true);


  const onChangeIndex = (index) => {
    setCurrentPage(index)
  }

  return (
    <View style={styles.container}>

      <Swiper
      loop={false}
        onIndexChanged={ (index) => onChangeIndex(index)}
        // scrollEnabled={ isScrollEnabled }
        // onMomentumScrollEnd ={_onMomentumScrollEnd}
        // onIndexChanged={page => setCurrentPage(page)}
        key={1010101}
        index={0}
        dot={
          <View
            style={{
              backgroundColor: Colors.paleorange,
              elevation: 6,
              width: 8,
              height: 8,
              borderRadius: 1000,
              marginLeft: 6,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: Colors.paleorange,
              width: 40,
              height: 8,
              borderRadius: 1000,
            }}
          />
        }
        paginationStyle={{
          bottom: '3%',
          left: '68%',
        }}>
        <View style={styles.slide_view}>
          <Image
            source={Images.slider_image1}
            style={{
              width: width - 50,
              height: height / 2 - 50,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Text style={styles.main_text}>Rent Cars near You</Text>
          <View style={styles.little_gap}></View>
          <Text style={styles.sub_text}>
            Conveinent locations just a short walk away.
          </Text>
        </View>
        <View style={styles.slide_view}>
          <Image
            source={Images.slider_image2}
            style={{
              width: width - 50,
              height: height / 2 - 50,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />

          <Text style={styles.main_text}>
            Rent a perfect car for any occasion
          </Text>
          <View style={styles.little_gap}></View>
          <Text style={styles.sub_text}>
            Enjoy the comforts of a rental car with the ease of booking.
          </Text>
        </View>
        <View style={styles.slide_view}>
          <Image
            source={Images.slider_image3}
            style={{
              width: width,
              height: height / 2 - 100,
              resizeMode: 'center',
              alignSelf: 'center',
            }}
          />

          <Text style={styles.main_text}>Need a Car ?</Text>
          <Text style={styles.main_text}>Rent it quickly now!</Text>
          <View style={styles.little_gap}></View>
          <Text style={styles.sub_text}>
            you can choose your ideal car and book it easly with us.
          </Text>
        </View>
      </Swiper>
      <TouchableOpacity
        style={{position: 'absolute', bottom: '3%'}}
        onPress={() => {
          props.navigation.replace('Login');
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: Colors.paleorange,
            marginLeft: 10,
          }}>
          {page == 2 ? 'Done' : 'Skip'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles

//make this component available to the app
export default AppSliderIntro;
