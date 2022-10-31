import  {StyleSheet,Dimensions} from 'react-native';
import { ceil } from 'react-native-reanimated';
import {Colors} from '../../Theme'
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
    fieldstyle:{
        width:width/1.08,
        height:45,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,
        alignSelf:'center',
        borderRadius:10000
    },
    main_title:
    {
        marginLeft:20
    },
    tem_icon:
    {
        marginLeft:10,
        alignSelf:'center'
    },
    temp_title:
    {
    alignSelf:'center',
    marginLeft:10,
    fontSize:17
    },
    value_text:
    {
        alignSelf:'center',
        marginLeft:5
    },
    arrow_icon:
    {
        marginRight:10,alignSelf:'center'
    }
})