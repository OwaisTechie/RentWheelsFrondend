import {StyleSheet, Dimensions} from 'react-native';
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  overlay: {
    width: width / 1.09,
    borderRadius: 10,
  },
  gap: {
    height: heighto / 30,
  },
  alert_text: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    width: width / 1.6,
    textAlign: 'center',
  },
});
