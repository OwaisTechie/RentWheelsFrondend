import {StyleSheet, Dimensions} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {Colors, General_Styles, Images} from '../../Theme';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
export default StyleSheet.create({
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
});
