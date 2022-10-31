import {StyleSheet, Dimensions, ColorPropType,StatusBar} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import {Colors} from '../../Theme';

const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.lightPurple,
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
    flex:1,
    // justifyContent:'center',
    marginTop:heightPercentageToDP('4%'),
    alignItems:'center'
  },
  brandViewText:{
    color:'#ffffff',
    fontSize:30,
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  bottonView:{
    flex:3,
    backgroundColor:'white',
    // bottom:60,
    borderTopLeftRadius:60

  },

  bottonTextView:{
    marginVertical:widthPercentageToDP('2%'),
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
