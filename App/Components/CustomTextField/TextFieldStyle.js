import {StyleSheet, Dimensions} from 'react-native';
import {Colors, ApplicationStyles} from '../../Theme';
import {textFieldHeight} from '../../Helpers/Helper';
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const margin = 20;
export default StyleSheet.create({
  text_container: {
    width: width / 1.08,
    height: textFieldHeight,
    alignSelf: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: Colors.lightPrimaryGreen,
  },
  icon_style: {
    alignSelf: 'center',
    marginLeft: margin,
  },
  text_input: {
    width: width / 1.4,
    marginLeft: 15,
    backgroundColor: 'transparent',
    height: textFieldHeight,
    fontSize: heighto / 45,
  },
});
