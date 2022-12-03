import React, {useSelector, useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors, CustomIcons, General_Styles, Images} from '../../Theme';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import styles from './ProfileStyle';

// import { AuthContext } from '../../Components/context';
import {userAuth} from '../userAuthentication/userAuth';
// import {useSelector} from 'react-redux';

import CustomSwitch from '../../Components/Custom_Switch/CustomSwitch';
import CustomInput from '../../Components/CustomTextField/CustomInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-number-input';
import CustomButton from '../../Components/Custom_btn/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {set} from 'immer/dist/internal';
const Profile = () => {
  const username = useRef();
  const phoneInput = useRef();
  const email = useRef();
  const [cnicFront, setCnicFront] = useState('');

  const [cnicBack, setCnicBack] = useState('');

  const [licenseFront, setLicenseFront] = useState('');

  const [licenseBack, setlicenseBack] = useState('');

  const [UtilityBills, setUtilityBills] = useState('');

  const [cnicVerification, setCnicVerification] = useState('');
  const [loader, setLoader] = useState(false);
  const [tab, setTab] = useState(1);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [switchValue, setSwitchValue] = useState('1');
  // const userInfo = useSelector((state) => state);
  // const {loginState} = useContext(AuthContext);
  // const {signIn} =userAuth();
  // console.log('loginState', loginState.user);

  const onSelectSwitch = value => {
    setTab(value);
  };
  const info = {
    name: 'Owais',
    phone: '+923472913440',
    email: 'raffaykahn65@gmail.com',
    address: 'R-20 Bagh-e-Malir',
    gender: 'male',
  };

  function ProfileView() {
    return (
      <View>
        <View
          style={{
            height: General_Styles.generalHeight / 5,
            width: General_Styles.generalWidth,
            // marginBottom:General_Styles.generalWidth-,
            // backgroundColor: Colors,
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
        <View style={styles.fieldContainer}>
          {/* <View style={styles.gap}></View> */}
          {/* list start */}
          <View>
            <CustomInput
              placeholder="Enter your username"
              iconName="account-key-outline"
              type="materialCommunity"
              label="Username"
              returnKeyType="next"
              returnKeyLabel="next"
              // onSubmitEditing={() => {
              //   password.current.focus();
              // }}
              ref={username}
              // onBlur={'handleBlur('username')'}
              // error={errors.username}
              // touched={touched.username}
              onChangeText={e => console.log(e)}
              keyboardAppearance="dark"
            />
            <CustomInput
              placeholder="Enter your Email"
              iconName="account-key-outline"
              type="materialCommunity"
              label="Email"
              returnKeyType="next"
              returnKeyLabel="next"
              // onSubmitEditing={() => {
              //   password.current.focus();
              // }}
              ref={email}
              // onBlur={'handleBlur('username')'}
              // error={errors.username}
              // touched={touched.username}
              onChangeText={e => console.log(e)}
              keyboardAppearance="dark"
            />

            <View>
              <Text
                style={{
                  marginVertical: hp('1%'),
                  fontSize: 16,
                  color: '#05375a',
                  // color:Colors.grey,
                }}>
                Phone
              </Text>
            </View>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              containerStyle={{
                height: hp('8%'),
                width: hp('43%'),
                backgroundColor: Colors.White,
                borderRadius: 18,
                borderWidth: 1,
                marginBottom: hp('1%'),
                borderColor: Colors.darkgrey,
              }}
              textContainerStyle={{
                backgroundColor: Colors.White,
                paddingVertical: 6,
                borderRadius: 18,
              }}
              defaultCode="PK"
              layout="first"
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setFormattedValue(text);
              }}
              withDarkTheme
              withShadow
              // autoFocus
            />
            <CustomInput
              placeholder="Enter your Address"
              iconName="account-key-outline"
              type="materialCommunity"
              label="Address"
              returnKeyType="next"
              returnKeyLabel="next"
              // onSubmitEditing={() => {
              //   password.current.focus();
              // }}
              ref={email}
              // onBlur={'handleBlur('username')'}
              // error={errors.username}
              // touched={touched.username}
              onChangeText={e => console.log(e)}
              keyboardAppearance="dark"
            />
          </View>
        </View>
      </View>
    );
  }

  const openImageLibrary = (e) => {
    ImagePicker.openPicker({
      // multiple: true,
      compressImageQuality: 0.5,
      // maxFiles: `4`,
      mediaType: 'photo',
      showsSelectedCount: true,
    }).then(
      async imgs => {
        const img = await ImagePicker.openCropper({
          mediaType: 'photo',
          path: imgs.path,
          cropping: true,
        });
        let imageData = {
          image: img.path,
        };
        console.log('IMAGE ->> ', imageData);
        if(e == 'cnicFront'){

          setCnicFront(img.path);
        }
        else{
          setCnicBack(img.path)
        }
      },
      // setImages(result);
      // return result;
    );
  };

  function DocumentView() {
    return (
      <View style={{flex: 1, marginVertical: hp('1%')}}>
        <View style={{alignItems: 'center'}}>
          <Text>
            Click on the document then 1. Attach the document from the gallery
            or 2. click on the camera icon to take the picture directly
          </Text>
        </View>
        {/* <View > */}
        <View style={styles.gap} />

        {/* // Cnic front and back */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: wp('100%'),
          }}>
          {/* Cnic front  */}
          <View style={{width: wp('40%')}}>
            <View style={{alignItems: 'center'}}>
              <Text>Cnic Front Side</Text>
              <Text style={{fontSize: 12}}>Required</Text>
            </View>
            <View>
              <View style={{marginVertical: 10}}>
                <View
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent:'center',
                    borderStyle: 'dotted',
                    height: 150,
                    // width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {cnicFront == '' ? (
                    <TouchableOpacity onPress={openImageLibrary('cnicFront')}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <CustomIcons
                          type="fa"
                          name="id-card-o"
                          size={30}
                          color={Colors.lightPurple}
                        />
                        {/* <Text>Add Photos</Text> */}
                        {/* </View> */}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={{position: 'relative'}}>
                      <TouchableOpacity
                        style={{justifyContent: 'center', alignItems: 'center'}}
                        activeOpacity={0.9}>
                        <Image
                          style={{
                            width: 120,
                            height: 100,
                            // marginRight: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            borderRadius: 16,
                            borderWidth: 4,
                            // borderColor:
                            //   index === indexSelected ? Colors.lightPurple : 'white',
                            borderColor: Colors.lightPurple,
                          }}
                          source={{uri: cnicFront}}
                          resizeMode="contain"
                        />

                        <TouchableOpacity
                          style={{position: 'absolute', right: 4, top: 5}}
                          onPress={() => setCnicFront('')}
                        >
                          <CustomIcons
                            name={'ios-close-circle'}
                            type={'ionicon'}
                            color={Colors.White}
                            size={25}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          {/* Cnic back */}
          <View style={{width: wp('40%')}}>
            <View style={{alignItems: 'center'}}>
              <Text>Cnic Back Side</Text>

              <Text style={{fontSize: 12}}>Required</Text>
            </View>
            <View>
              <View style={{ marginVertical: 10}}>
              <View
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent:'center',
                    borderStyle: 'dotted',
                    height: 150,
                    // width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {cnicBack == '' ? (
                    <TouchableOpacity onPress={openImageLibrary('cnicBack')}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <CustomIcons
                          type="fa"
                          name="id-card-o"
                          size={30}
                          color={Colors.lightPurple}
                        />
                        {/* <Text>Add Photos</Text> */}
                        {/* </View> */}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={{position: 'relative'}}>
                      <TouchableOpacity
                        style={{justifyContent: 'center', alignItems: 'center'}}
                        activeOpacity={0.9}>
                        <Image
                          style={{
                            width: 120,
                            height: 100,
                            // marginRight: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            borderRadius: 16,
                            borderWidth: 4,
                            // borderColor:
                            //   index === indexSelected ? Colors.lightPurple : 'white',
                            borderColor: Colors.lightPurple,
                          }}
                          source={{uri: cnicBack}}
                          resizeMode="contain"
                        />

                        <TouchableOpacity
                          style={{position: 'absolute', right: 4, top: 5}}
                          onPress={() => setCnicBack('')}
                        >
                          <CustomIcons
                            name={'ios-close-circle'}
                            type={'ionicon'}
                            color={Colors.White}
                            size={25}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* // Lincence front and back */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: wp('100%'),
          }}>
          {/* front */}
          <View style={{width: wp('40%')}}>
            <View style={{alignItems: 'center'}}>
              <Text>Licence Front Side</Text>
              <Text style={{fontSize: 12}}>Required</Text>
            </View>
            <View>
              <View style={{marginVertical: 10}}>
                <TouchableOpacity
                  // onPress={openImageLibrary}
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    borderStyle: 'dotted',
                    height: 150,
                    width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {/* <View > */}
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomIcons
                      type="fa"
                      name="id-card-o"
                      size={30}
                      color={Colors.lightPurple}
                    />
                    {/* <Text>Add Photos</Text> */}
                    {/* </View> */}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* back */}
          <View style={{width: wp('40%')}}>
            <View style={{alignItems: 'center'}}>
              <Text>Licence Back Side</Text>

              <Text style={{fontSize: 12}}>Required</Text>
            </View>
            <View>
              <View style={{alignItems: 'center', marginVertical: 10}}>
                <TouchableOpacity
                  // onPress={openImageLibrary}
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    borderStyle: 'dotted',
                    height: 150,
                    width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {/* <View > */}
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomIcons
                      type="fa"
                      name="id-card-o"
                      size={30}
                      color={Colors.lightPurple}
                    />
                    {/* <Text>Add Photos</Text> */}
                    {/* </View> */}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* // Utility bills and Cnic Verification */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: wp('100%'),
          }}>
          {/* Utility */}

          <View style={{width: wp('40%')}}>
            <View style={{alignItems: 'center'}}>
              <Text>Utility Bills</Text>
              <Text style={{fontSize: 12}}>Required</Text>
            </View>
            <View>
              <View style={{marginVertical: 10}}>
                <TouchableOpacity
                  // onPress={openImageLibrary}
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    borderStyle: 'dotted',
                    height: 150,
                    width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {/* <View > */}
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomIcons
                      type="fa"
                      name="id-card-o"
                      size={30}
                      color={Colors.lightPurple}
                    />
                    {/* <Text>Add Photos</Text> */}
                    {/* </View> */}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Cnic Verification */}

          <View style={{width: wp('40%')}}>
            <View style={{alignItems: 'center'}}>
              <Text>Cnic Verification</Text>

              <Text style={{fontSize: 12}}>Required</Text>
            </View>
            <View>
              <View style={{alignItems: 'center', marginVertical: 10}}>
                <TouchableOpacity
                  // onPress={openImageLibrary}
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    borderStyle: 'dotted',
                    height: 150,
                    width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {/* <View > */}
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomIcons
                      type="fa"
                      name="id-card-o"
                      size={30}
                      color={Colors.lightPurple}
                    />
                    <Text
                      style={{
                        color: Colors.lightPurple,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Your face with Cnic without mask and glasses
                    </Text>
                    {/* </View> */}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* </View> */}
      </View>
    );
  }

  return (
    <View
      style={{backgroundColor: 'white', flex: 1, paddingHorizontal: wp('2%')}}>
      <View
        style={{
          // height: General_Styles.generalHeight / 4,
          marginBottom: hp('1%'),
          // width: General_Styles.generalWidth,
          // backgroundColor: Colors,
          justifyContent: 'center',
        }}>
        <CustomSwitch
          selectionMode={1}
          option1="Profile"
          option2="Documents"
          onSelectSwitch={e => setSwitchValue(e)}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {switchValue == '1' ? ProfileView() : DocumentView()}
      </ScrollView>
      <View>
        {switchValue == '1' ? (
          <CustomButton loader={loader} onPress={() => 'Login'} title="Login" />
        ) : (
          <CustomButton
            loader={loader}
            onPress={() => console.log('Submit')}
            title="Update Document"
          />
        )}
      </View>
    </View>
  );
};

export default Profile;
