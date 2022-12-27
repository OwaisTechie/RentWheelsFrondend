import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../Theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const Review = props => {
  const {navigation, route} = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rating and reviews</Text>
        {/* <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-left"
              style={{
                fontSize: 30,
                color: Colors.lightPurple,
                padding: 12,
                // backgroundColor: Colors.Black,
                // borderRadius: 10,
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              color: Colors.lightPurple,
            }}>
            Review
          </Text>
        </View> */}
      </View>
    </View>
  );
};
const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = Colors.lightPurple;

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const iconScanColor = Colors.lightPurple;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '100%',
    backgroundColor: Colors.backgroundLight,
    position: 'relative',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.lightPurple,
  },
  titleInfo: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'justify',
    color: Colors.paleorange,
  },
  direction: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#989CA5',
  },
  header: {
    width: '100%',
    height:hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:Colors.lightPurple,
    justifyContent:'center',
    // paddingTop: 16,
  },
  headerText:{
    color:Colors.White,
    fontSize:hp('3%'),
    fontWeight:'bold'
  },
  dot: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 32,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  renderImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  renderProduct: {
    width: wp('100%'),
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleBrandText: {
    margin: 6,
  },
  Specification: {
    flexDirection: 'column',
    backgroundColor: Colors.White,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 6,
    marginVertical: 6,
    width: 110,
    height: 90,
    elevation: 3,
  },
  SpecificationText: {color: Colors.lightPurple, fontSize: 15},
  addressContainer: {
    borderRadius: 20,
    borderColor: Colors.backgroundMedium,
    borderWidth: 2,
    width: '100%',
    height: '10%',
    paddingHorizontal: 4,
    justifyContent: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,

    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});

export default Review;
