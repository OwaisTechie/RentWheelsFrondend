import React, {
  useSelector,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
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
// import ImagePicker from 'reac';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {set} from 'immer/dist/internal';
import ModalPoup from '../../Components/CustomModal/ModalPopup';
import {SIZES} from '../../Theme/Fonts';
import axios from 'axios';
import {getHeaders} from '../../Constant/requestHeaders';
import { Config } from '../../Config/Config';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const maskRowHeight = Math.round((height - 300) / 20);
const maskColWidth = (width - 300) / 2;

const Profile = () => {
  const username = useRef();
  const phoneInput = useRef();
  const email = useRef();
  const [cnicFront, setCnicFront] = useState('');

  const [cnicFrontImage, setCnicFrontImage] = useState('');
  const [cnicBackImage, setCnicBackImage] = useState('');
  const [licenseFrontImage, setLicenseFrontImage] = useState('');
  const [licenseBackImage, setLicenseBackImage] = useState('');
  const [utilityBillImage, setUtilityBillImage] = useState('');
  const [cnicVerificationImage, setCnicVerificationImage] = useState('');

  const [openCamera, setOpenCamera] = useState(false);
  const [documentValue, setDocumentValue] = useState('');

  const [cnicBack, setCnicBack] = useState('');

  const [licenseFront, setLicenseFront] = useState('');

  const [licenseBack, setlicenseBack] = useState('');

  const [utilityBills, setUtilityBills] = useState('');

  const [cnicVerification, setCnicVerification] = useState('');

  const [showfilterModal, setShowFilterModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tab, setTab] = useState(1);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [switchValue, setSwitchValue] = useState('1');
  // const userInfo = useSelector((state) => state);
  // const {loginState} = useContext(AuthContext);
  // const {signIn} =userAuth();
  // console.log('loginState', loginState.user);

  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const onPressButton = async () => {
    const photo = await camera.current.takePhoto({
      flash: 'off',
      qualityPrioritization: 'speed',
    });

    let photoUrl = 'file://' + photo.path;
    console.log('PHOTO->>', photoUrl);
    setCnicFront(photoUrl);
    setOpenCamera(false);
  };

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

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Access to photos',
            message: 'Our App would like to access your photos n your device',
            buttonNegative: 'Deny',
            buttonPositive: 'Allow',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return granted;
        } else {
          await Linking.openSettings();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      return true;
    }
  };

  const updateDocument = async () => {
    const header = await getHeaders('multipart').then(data => {
      return data;
    });
    console.log('HEADERS ->>', header);
    setLoader(true);
    const formData = new FormData();

    formData.append('cnicFront', {
      name: cnicFrontImage.path.split('/').pop(),
      type: cnicFrontImage.mime,
      uri:
        Platform.OS === 'android'
          ? cnicFrontImage.path
          : files.path.replace('file://', ''),
    });
    formData.append('cnicBack', {
      name: cnicBackImage.path.split('/').pop(),
      type: cnicBackImage.mime,
      uri:
        Platform.OS === 'android'
          ? cnicBackImage.path
          : files.path.replace('file://', ''),
    });
    formData.append('licenseFront', {
      name: licenseFrontImage.path.split('/').pop(),
      type: licenseFrontImage.mime,
      uri:
        Platform.OS === 'android'
          ? licenseFrontImage.path
          : files.path.replace('file://', ''),
    });
    formData.append('licenseBack', {
      name: licenseBackImage.path.split('/').pop(),
      type: licenseBackImage.mime,
      uri:
        Platform.OS === 'android'
          ? licenseBackImage.path
          : files.path.replace('file://', ''),
    });
    formData.append('utilityBill', {
      name: utilityBillImage.path.split('/').pop(),
      type: utilityBillImage.mime,
      uri:
        Platform.OS === 'android'
          ? utilityBillImage.path
          : files.path.replace('file://', ''),
    });
    formData.append('image', {
      name: cnicVerificationImage.path.split('/').pop(),
      type: cnicVerificationImage.mime,
      uri:
        Platform.OS === 'android'
          ? cnicVerificationImage.path
          : files.path.replace('file://', ''),
    });
    const baseUrl = Config.baseUrl.main;
    const endpoint = Config.endpoint;
    console.log('Config ==>', Config);
    const URL = `${baseUrl}${endpoint.user.verifyUser}`;
    console.log('baseURL1 ==>', URL);
    axios
      .post(
        URL,
        formData,
        header,
      )
      .then(response => {
        setLoader(false);
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Success',
          text2: response.data.Message,
          visibilityTime: 5000,
          autoHide: true,
        });
        
      })
      .catch(error => {
        setLoader(false);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: error.response.data.Message,
          text2: `${error.response.status}`,
          visibilityTime: 5000,
          autoHide: true,
        });
        console.log('EEEE', error);
      });
  };

  useEffect(() => {
    requestExternalWritePermission();
  }, []);

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
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    height: 150,
                    // width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {cnicFront == '' ? (
                    <TouchableOpacity onPress={() => ModalOpen('cnicFront')}>
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
                            // borderWidth: 4,
                            // borderColor:
                            //   index === indexSelected ? Colors.lightPurple : 'white',
                            // borderColor: Colors.lightPurple,
                          }}
                          source={{uri: cnicFront}}
                          resizeMode="contain"
                        />

                        <TouchableOpacity
                          style={{position: 'absolute', right: 4, top: 5}}
                          onPress={() => setCnicFront('')}>
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
              <View style={{marginVertical: 10}}>
                <View
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    height: 150,
                    // width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {cnicBack == '' ? (
                    <TouchableOpacity onPress={() => ModalOpen('cnicBack')}>
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
                          onPress={() => setCnicBack('')}>
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
                <View
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    height: 150,
                    // width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {licenseFront == '' ? (
                    <TouchableOpacity onPress={() => ModalOpen('licenseFront')}>
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
                          source={{uri: licenseFront}}
                          resizeMode="contain"
                        />

                        <TouchableOpacity
                          style={{position: 'absolute', right: 4, top: 5}}
                          onPress={() => setLicenseFront('')}>
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
          {/* back */}
          <View style={{width: wp('40%')}}>
            <View style={{alignItems: 'center'}}>
              <Text>Licence Back Side</Text>

              <Text style={{fontSize: 12}}>Required</Text>
            </View>
            <View>
              <View style={{marginVertical: 10}}>
                <View
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    height: 150,
                    // width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {licenseBack == '' ? (
                    <TouchableOpacity onPress={() => ModalOpen('licenseBack')}>
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
                          source={{uri: licenseBack}}
                          resizeMode="contain"
                        />

                        <TouchableOpacity
                          style={{position: 'absolute', right: 4, top: 5}}
                          onPress={() => setlicenseBack('')}>
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
                <View
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    height: 150,
                    // width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {utilityBills == '' ? (
                    <TouchableOpacity onPress={() => ModalOpen('utilityBills')}>
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
                          source={{uri: utilityBills}}
                          resizeMode="contain"
                        />

                        <TouchableOpacity
                          style={{position: 'absolute', right: 4, top: 5}}
                          onPress={() => setUtilityBills('')}>
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

          {/* Cnic Verification */}

          <View style={{width: wp('40%')}}>
            <View style={{alignItems: 'center'}}>
              <Text>Cnic Verification</Text>

              <Text style={{fontSize: 12}}>Required</Text>
            </View>
            <View>
              <View style={{marginVertical: 10}}>
                <View
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dotted',
                    height: 150,
                    // width: '100%',
                    borderColor: Colors.backgroundMedium,
                  }}>
                  {cnicVerification == '' ? (
                    <TouchableOpacity
                      onPress={() => ModalOpen('cnicVerification')}>
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
                        <Text style={{textAlign: 'center'}}>
                          Cnic Verification with face Without glasses and mask.
                        </Text>
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
                          source={{uri: cnicVerification}}
                          resizeMode="contain"
                        />

                        <TouchableOpacity
                          style={{position: 'absolute', right: 4, top: 5}}
                          onPress={() => setCnicVerification('')}>
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
        {/* </View> */}
      </View>
    );
  }

  function renderCamera() {
    if (device == null) {
      console.log('first');
      return <View style={{flex: 1}} />;
    } else {
      console.log('HEWL');
      return (
        <View style={{flex: 1}}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            enableZoomGesture
            photo={true}
          />

          <View style={styles.maskOutter}>
            <View
              style={[{flex: maskRowHeight}, styles.maskRow, styles.maskFrame]}
            />
            <View style={[{flex: 30}, styles.maskCenter]}>
              <View style={[{width: maskColWidth}, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{width: maskColWidth}, styles.maskFrame]} />
            </View>
            <View
              style={[{flex: maskRowHeight}, styles.maskRow, styles.maskFrame]}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              bottom: SIZES.padding,
              left: 0,
              right: 0,
            }}>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.White,
              }}
              onPress={onPressButton}>
              <CustomIcons
                type="fa"
                name="camera-retro"
                size={35}
                // style={{window}}
                color={Colors.lightPurple}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  const ModalOpen = e => {
    setDocumentValue(e);
    setShowFilterModal(true);
  };

  const openImageLibrary = () => {
    ImagePicker.openPicker({
      // multiple: true,
      compressImageQuality: 0.7,
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

        switch (documentValue) {
          case 'cnicFront':
            setCnicFrontImage(img);
            setCnicFront(img.path);
            break;
          case 'cnicBack':
            setCnicBackImage(img);
            setCnicBack(img.path);
            break;
          case 'licenseFront':
            setLicenseFrontImage(img);
            setLicenseFront(img.path);
            break;
          case 'licenseBack':
            setLicenseBackImage(img);
            setlicenseBack(img.path);
            break;
          case 'utilityBills':
            setUtilityBillImage(img);
            setUtilityBills(img.path);
            break;
          case 'cnicVerification':
            setCnicVerificationImage(img);
            setCnicVerification(img.path);
        }

        setShowFilterModal(false);
      },
      // setImages(result);
      // return result;
    );
  };

  const openCameraLibray = () => {
    // setOpenCamera(true)
    setShowFilterModal(false);
    // setSwitchValue('2');
    ImagePicker.openCamera({
      compressImageMaxHeight: 300,
      compressImageMaxWidth: 300,
      // width: 300,
      // height: 400,
      compressImageQuality: 0.7,
      cropping: true,
    }).then(image => {
      setCnicFrontImage(image);
      console.log(image.path);
      setCnicFront(image.path);
    });
  };

  // if (device == null) {
  //   return <ActivityIndicator size={20} color={'red'} />;
  // }

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: wp('2%'),
        paddingBottom: hp('10%'),
      }}>
      {/* { */}
      {/* openCamera ? renderCamera() : */}
      <View>
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

          <View>
            {switchValue == '1' ? (
              <CustomButton
                loader={loader}
                onPress={() => 'Login'}
                title="Login"
              />
            ) : (
              <CustomButton
                loader={loader}
                onPress={updateDocument}
                title="Update Document"
              />
            )}
          </View>
        </ScrollView>
      </View>

      {/* } */}

      <ModalPoup
        visible={showfilterModal}
        onClose={() => setShowFilterModal(false)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <View
            style={{
              borderRadius: 20,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
              // borderStyle: 'dotted',
              height: hp('15%'),
              width: wp('40%'),
              borderColor: Colors.backgroundMedium,
            }}>
            <TouchableOpacity onPress={openImageLibrary}>
              {/* onPress={() => console.log("Touch ",touchValue)}> */}
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomIcons
                  type="ant"
                  name="picture"
                  size={30}
                  color={Colors.lightPurple}
                />
                <Text>Using Gallery</Text>
                {/* </View> */}
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderRadius: 20,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
              // borderStyle: 'dotted',
              height: hp('15%'),
              width: wp('40%'),
              borderColor: Colors.backgroundMedium,
            }}>
            <TouchableOpacity onPress={openCameraLibray}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomIcons
                  type="ionicon"
                  name="ios-camera"
                  size={30}
                  color={Colors.lightPurple}
                />
                <Text>Using Camera</Text>
                {/* </View> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPoup>
    </View>
  );
};

export default Profile;
