import {StyleSheet, Dimensions} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {Colors, General_Styles, Images} from '../../Theme';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = width * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = width * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = Colors.lightPurple;

const scanBarWidth = width * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = width * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const iconScanColor = Colors.lightPurple;

export default StyleSheet.create({
  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: 'white',
  },
  main_heads: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
  },
  sub_text: {
    color: Colors.paleorange,
    alignSelf: 'center',
  },
  touch_view: {
    marginRight: 5,
  },
  flatlist_view: {
    width: width / 5,
    height: width / 5,
    backgroundColor: Colors.White,
    margin: 10,
    borderRadius: 1000,
    justifyContent: 'center',
    elevation: 6,
  },
  flatlist_text: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.primary_green,
  },
  gap: {
    height: height / 30,
  },
  little_gap: {
    height: height / 60,
  },
  pickupListMain: {flexDirection: 'row', marginHorizontal: width / 10},
  nameTitle: {
    fontSize: width / 20,
    fontWeight: 'bold',
    width: width / 2,
    color: Colors.grey,
  },
  iconContain: {
    height: height / 25,
    width: height / 25,
    backgroundColor: Colors.lightPrimaryGreen,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  fieldContainer: {paddingHorizontal: widthPercentageToDP('4%')},
  columnText: {flexDirection: 'column', alignSelf: 'center'},
  titleText: {fontSize: width / 25, color: Colors.grey},
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    elevation: 10,
    backgroundColor: Colors.paleorange,
    alignSelf: 'center',
    margin: 2,
  },

  topOverlay: {
    flex: 1,
    height: width,
    width: width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: width ,
    width: width,
    
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom: width * 0.25,
  },

  leftAndRightOverlay: {
    height: width * 0.65,
    width: width,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },

});
