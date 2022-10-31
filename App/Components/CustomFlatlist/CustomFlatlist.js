import React from "react";
import { View ,FlatList,TouchableOpacity,Dimensions,Text} from "react-native";
const heighto = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
import styles from './CustomFlatlistStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Colors,ApplicationStyles} from '../../Theme'
//=======props 
//data
//status
//------items in data
//*********for component show
//hastitle
//has_icon
//hastitle_value
//+++++values
//title_value
//value
//title 
const CustomFlatlist = (props) => { 
    return (
        <FlatList
        data={props.data}
        renderItem=
        {
            ({item})=>
            (
            <View>
                {item.hastitle?<Text style={styles.main_title}>{item.title}</Text>:null}
            <TouchableOpacity style={[ApplicationStyles.shadow,styles.fieldstyle,{backgroundColor:props.status=='active'?Colors.overall_view_color:Colors.White}]}>
                <View style={{flexDirection:'row'}}>
                    {item.has_icon?<Icon name={item.icon_name} size={23} color={props.status=='active'?Colors.White:Colors.icon_color} style={styles.tem_icon}/>:null}
                <View style={{alignSelf:'center'}}>
                {item.hastitle_value?<Text style={[styles.temp_title,{color:props.status=='active'?Colors.White:Colors.icon_color}]}>{item.title_value}</Text>:null}
                <Text style={[styles.value_text,{color:props.status=='active'?Colors.White:Colors.icon_color}]}>{item.value}</Text>
                </View>
                </View>
                <Icon name={'arrow-forward-ios'} size={20} color={props.status=='active'?Colors.White:Colors.icon_color} style={styles.arrow_icon}/>
            </TouchableOpacity>
            </View>
            )
        }
        />  
          );
};

export default CustomFlatlist;
