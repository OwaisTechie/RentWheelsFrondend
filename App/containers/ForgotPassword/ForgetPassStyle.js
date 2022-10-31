import  {StyleSheet,Dimensions} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'white'
    },
    gap:{
      height:heighto/40,
    },
  })