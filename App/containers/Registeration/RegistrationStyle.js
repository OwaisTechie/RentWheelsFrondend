import {StyleSheet, Dimensions, ColorPropType,StatusBar} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import {Colors} from '../../Theme';

const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#05375a',
    // backgroundColor: '#3E3D40',

  },
  login:{
    color:'#161616',
    fontSize:34,
    textAlign:'center'
  },
  
  gap: {
    height: heighto / 40,
  },
  
  icon_style: {
    // alignSelf: 'center',
    
    fontSize: 40,
  },
  icon_text: {
    // alignSelf: 'center',
    // justifyContent: 'center',
    fontSize: 40,
    color: Colors.Black,
    fontWeight: 'bold',
  },
  brandView:{
    // flex:4,
    // justifyContent:'center',
    marginTop:heighto/30,
    alignItems:'center'
  },
  SignView:{
    flexDirection:'row',
    marginHorizontal:widthPercentageToDP('3%'),
    alignItems:'center',
  },
  brandViewText:{
    color:Colors.White,
    fontSize:30,
    marginLeft:widthPercentageToDP('1%')
    // fontWeight:'bold',
    // textTransform:'uppercase',
  },
  bottonView:{
    flex:1,
    // height:heightPercentageToDP('80%'),
    backgroundColor:'white',
    // bottom:60,
    borderTopLeftRadius:60,

  },

  bottonTextView:{
    marginVertical:5,
    flexDirection:'row',
    justifyContent:'center'
  },
  img_bg: {
    zIndex: -1,
    width: width,
    height: heighto,
    position: 'absolute',
  },
  main_logo: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});
