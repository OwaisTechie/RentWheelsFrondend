import React,{useSelector,useContext,useState} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {Colors, General_Styles, Images} from '../../Theme';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import styles from './ProfileStyle';
// import { AuthContext } from '../../Components/context';
import { userAuth } from '../userAuthentication/userAuth';
// import {useSelector} from 'react-redux';

import CustomSwitch from '../../Components/Custom_Switch/CustomSwitch';
const Profile = () => {
  const [tab,setTab] = useState(1);
  // const userInfo = useSelector((state) => state);
  // const {loginState} = useContext(AuthContext);
  // const {signIn} =userAuth();
  // console.log('loginState', loginState.user);


  const onSelectSwitch = (value) =>{
    setTab(value);
  }
  const info = {
    name: 'raffay',
    phone: '+923472913440',
    email: 'raffaykahn65@gmail.com',
    address: 'R-20 Bagh-e-Malir',
    gender: 'male',
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          height: General_Styles.generalHeight / 4,
          width: General_Styles.generalWidth,
          backgroundColor: Colors.darkgrey,
          justifyContent: 'center',
        }}>
        <ImageBackground
          source={Images.profileGif}
          style={{
            height: General_Styles.generalHeight / 6,
            width: General_Styles.generalHeight / 6,
            resizeMode: 'contain',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              info.gender != 'men' ? Images.menProfile : Images.womenProfile
            }
            style={{
              height: General_Styles.generalHeight / 10,
              width: General_Styles.generalHeight / 10,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </ImageBackground>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            marginTop: 10,
            fontSize: General_Styles.generalWidth / 15,
          }}>
          {info.name}
        </Text>
      </View>
      <View>
        <View style={styles.gap}></View>
        {/* list start */}
        <View style={styles.pickupListMain}>
          <View style={styles.iconContain}>
            <Icon3
              name="phone"
              size={General_Styles.generalHeight / 30}
              color={Colors.primary_green}
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={{width: General_Styles.generalWidth / 40}}></View>

          <Text style={styles.nameTitle} numberOfLines={1}>
            {info.address}
          </Text>
        </View>
        {/* list end */}
        <View style={styles.gap}></View>
        {/* list start */}
        <View style={styles.pickupListMain}>
          <View style={styles.iconContain}>
            <Icon3
              name="envelope"
              size={General_Styles.generalHeight / 40}
              color={Colors.primary_green}
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={{width: General_Styles.generalWidth / 40}}></View>

          <Text style={styles.nameTitle} numberOfLines={1}>
            {info.email}
          </Text>
        </View>
        {/* list end */}
        <View style={styles.gap}></View>
        {/* list start */}
        <View style={styles.pickupListMain}>
          <View style={styles.iconContain}>
            <Icon3
              name="map-marker"
              size={General_Styles.generalHeight / 30}
              color={Colors.primary_green}
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={{width: General_Styles.generalWidth / 40}}></View>

          <Text style={styles.nameTitle} numberOfLines={2} ellipsizeMode="tail">
            {info.phone}
          </Text>
        </View>
        {/* list end */}
      </View>
      <View style={styles.gap}></View>
    </View>
  );
};

export default Profile;
