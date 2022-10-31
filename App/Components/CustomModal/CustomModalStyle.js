import  {StyleSheet,Dimensions} from 'react-native';
import  {Colors,ApplicationStyles}from '../../Theme'
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const margin=20;
export default StyleSheet.create({
    modal_container: {
      width:width/1.08,
      height:45,
      borderWidth:1,
      borderColor:Colors.primary_green,
      backgroundColor:Colors.White,
      alignSelf:'center',
      borderRadius:100,
      flexDirection:'row'
    },
     gap:{
      height:heighto/40,
    },
  
  
  })