import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../Theme';
import {btnStandardHeight} from '../../Helpers/Helper';
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  gap: {
    height: heighto / 40,
  },
  btn_container: {
    backgroundColor: Colors.primary_green,
    width: width / 3,
    height: btnStandardHeight,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
  },
});
