import {StyleSheet, Dimensions} from 'react-native';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
import {Colors} from '../../Theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPrimaryGreen,
    height: height,
  },
  gap: {
    height: height / 30,
  },
  little_gap: {
    height: height / 50,
  },
  icon_contain: {
    flexDirection: 'row',
    width: width / 1.4,
    height: height / 23,

    alignSelf: 'center',
    borderRadius: 20,
  },
  icon_text: {
    marginLeft: 10,
    alignSelf: 'center',
    fontSize: 17,
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 20,
  },
  logout_cointain: {},
  view_contain: {
    width: width / 1.36,
    backgroundColor: Colors.White,
    alignSelf: 'flex-end',
    height: height,
    borderTopLeftRadius: 20,
  },
});
