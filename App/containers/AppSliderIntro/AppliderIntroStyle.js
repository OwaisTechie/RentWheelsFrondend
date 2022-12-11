import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../Theme';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  icon_contain: {
    justifyContent: 'center',
  },
  slide_view: {
    flex: 1,
    height: height,
    width: width,
    marginTop:height/15
    // justifyContent: 'center',
  },
  main_text: {
    fontWeight: 'bold',
    fontSize: 23,
    color: Colors.Black,
    textAlign: 'center',
  },
  gap: {
    height: height / 30,
  },
  little_gap: {
    height: height / 50,
  },
  sub_text: {
    color: Colors.backgroundMedium,
    fontSize: 18,
    // alignSelf: 'center',
    textAlign: 'center',
  },
});
