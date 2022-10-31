import { StyleSheet ,Dimensions} from 'react-native'
import {Colors} from '../../Theme'
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
   flex:1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#F1F1F1',
  },
  Image_style:{
    width:width * 2 - 200,
    height:height * 2 - 200,
    resizeMode:'contain',
    // alignSelf:'center'
  },
  // Text_style :{
  //   Color: '#EFB250',
  //   fontSize: 20,
  //   fontFamily:''
  // }
 
})
