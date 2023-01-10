import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
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
import ModalPoup from '../../Components/CustomModal/ModalPopup';
import {SIZES} from '../../Theme/Fonts';
import axios from 'axios';
import {getHeaders} from '../../Constant/requestHeaders';
import {Config} from '../../Config/Config';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {updateProfile} from './apiCalls/apiCalls';
import {updateProfiles} from '../../Redux/auth/Reducer/authReducer';
import Toast  from 'react-native-toast-message';
import { getLocalHost } from '../../Constant/ConvertLocalHost';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const maskRowHeight = Math.round((height - 300) / 20);
const maskColWidth = (width - 300) / 2;

const Profile = () => {
  const userId = useSelector(state => state?.auth.users.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [email, setEmail] = useState('');
  // const [profilePic, setProfilePic] = useState('');
  const [cnicFront, setCnicFront] = useState('');
  const [profile, setprofilePicture] = useState('');

  // const [cnicFrontImage, setCnicFrontImage] = useState('');
  // const [cnicBackImage, setCnicBackImage] = useState('');
  // const [licenseFrontImage, setLicenseFrontImage] = useState('');
  // const [licenseBackImage, setLicenseBackImage] = useState('');
  // const [utilityBillImage, setUtilityBillImage] = useState('');
  // const [cnicVerificationImage, setCnicVerificationImage] = useState('');
  const [cnic, setCnic] = useState('');

  const [openCamera, setOpenCamera] = useState(false);
  const [documentValue, setDocumentValue] = useState('');

  const [isDocumentValidation, setIsDocumentValidation] = useState(false);
  const [cnicBack, setCnicBack] = useState('');
  const [pictureImage, setPictureImage] = useState('');
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
    if (
      cnicFront == '' ||
      cnicBack == '' ||
      licenseFront == '' ||
      licenseBack == '' ||
      utilityBills == '' ||
      cnicVerification == '' ||
      cnic == ''
    ) {
      Alert.alert('Document Validation', 'Please fill all the Documents!', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      const header = await getHeaders('multipart').then(data => {
        return data;
      });
      console.log('HEADERS ->>', header);
      setLoader(true);
      const formData = new FormData();

      formData.append('cnicNo',cnic);

      formData.append('cnicFront', {
        name: cnicFront.path.split('/').pop(),
        type: cnicFront.mime,
        uri:
          Platform.OS === 'android'
            ? cnicFront.path
            : cnicFront.path.replace('file://', ''),
      });
      formData.append('cnicBack', {
        name: cnicBack.path.split('/').pop(),
        type: cnicBack.mime,
        uri:
          Platform.OS === 'android'
            ? cnicBack.path
            : cnicBack.path.replace('file://', ''),
      });
      formData.append('licenseFront', {
        name: licenseFront.path.split('/').pop(),
        type: licenseFront.mime,
        uri:
          Platform.OS === 'android'
            ? licenseFront.path
            : licenseFront.path.replace('file://', ''),
      });
      formData.append('licenseBack', {
        name: licenseBack.path.split('/').pop(),
        type: licenseBack.mime,
        uri:
          Platform.OS === 'android'
            ? licenseBack.path
            : licenseBack.path.replace('file://', ''),
      });
      formData.append('utilityBill', {
        name: utilityBills.path.split('/').pop(),
        type: utilityBills.mime,
        uri:
          Platform.OS === 'android'
            ? utilityBills.path
            : utilityBills.path.replace('file://', ''),
      });
      formData.append('image', {
        name: cnicVerification.path.split('/').pop(),
        type: cnicVerification.mime,
        uri:
          Platform.OS === 'android'
            ? cnicVerification.path
            : cnicVerification.path.replace('file://', ''),
      });

      console.log('FORM DATA', formData);
      const baseUrl = Config.baseUrl.main;
      const endpoint = Config.endpoint;
      console.log('Config ==>', Config);
      const URL = `${baseUrl}${endpoint.user.verifyUser}`;
      console.log('baseURL1 ==>', URL);
      axios
        .post(URL, formData, header)
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
          console.log("ERR ->>",error)
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
    }
  };

  useEffect(() => {
    console.log('USERID ->> ', userId);
    var userData;
    if (typeof userId == 'string') {
      userData = JSON.parse(userId);
    } else {
      userData = userId;
    }
    const {username, email, phone, profilePicture, verification} = userData;
    if (verification) {
      let {image, cnicBack, cnicFront, licenseBack, licenseFront, utilityBill} =
        verification;

      console.log('utilityBills ->> ', utilityBill);
      console.log('utilityBills ->> ', licenseFront);
      console.log('utilityBills ->> ', licenseBack);
      setCnicBack(getLocalHost(cnicBack));
      setCnicFront(getLocalHost(cnicFront));
      setLicenseFront(getLocalHost(licenseFront));
      setlicenseBack(getLocalHost(licenseBack));
      setCnicVerification(getLocalHost(image));
      setUtilityBills(getLocalHost(utilityBill));
      
    }
    // var imageProfile = getLocalHost(profilePicture ? profilePicture : '');
    // console.log(imageProfile,"imageProfile")
    if(profilePicture){
      let pic=getLocalHost(profilePicture);
      setPictureImage(pic);
    }
    setPhoneInput(phone);
    setFormattedValue(phone);
    setUsername(username);
    setEmail(email);
  }, [userId]);

  useEffect(() => {
    requestExternalWritePermission();
  }, []);

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
            // setCnicFrontImage(img);
            setDocumentValue('');
            setCnicFront(img);
            break;
          case 'cnicBack':
            // setCnicBackImage(img);
            setDocumentValue('');
            setCnicBack(img);
            break;
          case 'licenseFront':
            // setLicenseFrontImage(img);
            setDocumentValue('');
            setLicenseFront(img);
            break;
          case 'licenseBack':
            // setLicenseBackImage(img);
            setDocumentValue('');
            setlicenseBack(img);
            break;
          case 'utilityBills':
            // setUtilityBillImage(img);
            setDocumentValue('');
            setUtilityBills(img);
            break;
          case 'profilePicture':
            setDocumentValue('');
            setPictureImage(img.path);
            setprofilePicture(img);
        }

        setShowFilterModal(false);
      },
      // setImages(result);
      // return result;
    );
  };

  const updateUser = () => {
    if (
      email == '' ||
      phoneInput == '' ||
      username == '' ||
      profile == null
    ) {
      Alert.alert('User Details', 'Please fill all User Detail!', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      let Payload = {
        email: email,
        profilePicture: profile,
        phone: phoneInput,
        username: username,
      };
      console.log('Payload ->> ', Payload);
      console.log('Payload PROFILE ->> ', Payload.profilePicture);
      setLoader(true);
      updateProfile(Payload, onUpdateSuccess, onUpdateFailure);
    }
  };

  const onUpdateSuccess = data => {
    setLoader(false);
    var userData;
    if (typeof userId == 'string') {
      userData = JSON.parse(userId);
    } else {
      userData = userId;
    }
    let Payload = {
      ...userData,
      email: email,
      profilePicture: profilePicture.path,
      phone: phoneInput,
      username: username,
    };
    dispatch(updateProfiles(Payload));
    console.log('data ->> ', data);
  };
  const onUpdateFailure = () => {
    console.log('Failure');
    setLoader(false);
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
      switch (documentValue) {
        case 'cnicFront':
          // setCnicFrontImage(img);
          setDocumentValue('');
          setCnicFront(image);
          break;
        case 'cnicBack':
          // setCnicBackImage(img);
          setDocumentValue('');
          setCnicBack(image);
          break;
        case 'licenseFront':
          // setLicenseFrontImage(img);
          setDocumentValue('');
          setLicenseFront(image);
          break;
        case 'licenseBack':
          // setLicenseBackImage(img);
          setDocumentValue('');
          setlicenseBack(image);
          break;
        case 'utilityBills':
          // setUtilityBillImage(img);
          setDocumentValue('');
          setUtilityBills(image);
          break;
        case 'profilePicture':
          setPictureImage(image.path);
          setprofilePicture(image);
          setDocumentValue('');
          break
        default:
        setCnicVerification(image);
        setDocumentValue('');
      }

      setShowFilterModal(false);
    });
  };

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
          {switchValue == '1' ? (
            // ProfileView

            <View>
              <View
                style={{
                  height: General_Styles.generalHeight / 5,
                  width: General_Styles.generalWidth,
                  // marginBottom:General_Styles.generalWidth-,
                  // backgroundColor: Colors,
                  justifyContent: 'center',
                }}>
                {/* <View style={{position: 'absolute',top:hp('12%'),left:wp('12%')}}>
                  <TouchableOpacity onPress={() => console.log("Why")} style={{backgroundColor:Colors.White,elevation:8,borderRadius:18,padding:3}}>

                  <CustomIcons
                    name={'camera'}
                    type={'entypo'}
                    color={Colors.Black}
                    size={25}
                  />
                  </TouchableOpacity>
                </View> */}
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
                      pictureImage == null
                        ? Images.menProfile
                        : {uri: pictureImage}
                    }
                    // source={Images.menProfile}
                    style={{
                      height: General_Styles.generalHeight / 10,
                      width: General_Styles.generalHeight / 10,
                      borderRadius: 75,
                      resizeMode: 'cover',
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
                  {username ? username : 'Owais'}
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
                    value={username}
                    // onSubmitEditing={() => {
                    //   password.current.focus();
                    // }}
                    // onBlur={'handleBlur('username')'}
                    // error={errors.username}
                    // touched={touched.username}
                    onChangeText={e => setUsername(e)}
                    keyboardAppearance="dark"
                  />
                  <CustomInput
                    placeholder="Enter your Email"
                    iconName="account-key-outline"
                    type="materialCommunity"
                    label="Email"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    value={email}
                    // onSubmitEditing={() => {
                    //   password.current.focus();
                    // }}
                    // onBlur={'handleBlur('username')'}
                    // error={errors.username}
                    // touched={touched.username}
                    onChangeText={e => setEmail(e)}
                    keyboardAppearance="dark"
                  />
                  <CustomInput
                    placeholder="Enter your Phone Number"
                    iconName="account-key-outline"
                    type="materialCommunity"
                    label="Phone"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    value={phoneInput}
                    // onSubmitEditing={() => {
                    //   password.current.focus();
                    // }}
                    // onBlur={'handleBlur('username')'}
                    // error={errors.username}
                    // touched={touched.username}
                    onChangeText={e => setPhoneInput(e)}
                    keyboardAppearance="dark"
                  />
                </View>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginVertical: 3,
                  }}
                  onPress={() => ModalOpen('profilePicture')}>
                  <View style={{marginHorizontal: 3}}>
                    <CustomIcons
                      name={'camera'}
                      type={'entypo'}
                      color={Colors.Black}
                      size={25}
                    />
                  </View>
                  <View>
                    <Text
                      style={{color: Colors.lightPurple, fontWeight: 'bold'}}>
                      Profile Picture
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // DocumentView()

            <View style={{flex: 1, marginVertical: hp('1%')}}>
              <View style={{alignItems: 'center'}}>
                <Text>
                  Click on the document then 1. Attach the document from the
                  gallery or 2. click on the camera icon to take the picture
                  directly
                </Text>
              </View>
              {/* <View > */}
              <View style={styles.gap} />

              <View>
                  <CustomInput
                    placeholder="Enter your Cnic"
                    iconName="account-key-outline"
                    type="materialCommunity"
                    label="Cnic"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    value={cnic}
                    // onSubmitEditing={() => {
                    //   password.current.focus();
                    // }}
                    // onBlur={'handleBlur('username')'}
                    // error={errors.username}
                    // touched={touched.username}
                    onChangeText={e => setCnic(e)}
                    keyboardAppearance="dark"
                  />

                </View>
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
                          <TouchableOpacity
                            onPress={() => ModalOpen('cnicFront')}>
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
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
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
                                  // borderWidth: 4,
                                  // borderColor:
                                  //   index === indexSelected ? Colors.lightPurple : 'white',
                                  // borderColor: Colors.lightPurple,
                                }}
                                source={{uri: cnicFront.path ? cnicFront.path : cnicFront}}
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
                          <TouchableOpacity
                            onPress={() => ModalOpen('cnicBack')}>
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
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
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
                                source={{uri: cnicBack.path ? cnicBack.path : cnicBack}}
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
                          <TouchableOpacity
                            onPress={() => ModalOpen('licenseFront')}>
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
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
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
                                source={{uri: licenseFront.path ? licenseFront.path : licenseFront}}
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
                          <TouchableOpacity
                            onPress={() => ModalOpen('licenseBack')}>
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
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
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
                                source={{uri: licenseBack.path ? licenseBack.path : licenseBack}}
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
                          <TouchableOpacity
                            onPress={() => ModalOpen('utilityBills')}>
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
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
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
                                source={{uri: utilityBills.path ? utilityBills.path : utilityBills}}
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
                            onPress={openCameraLibray}>
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
                                Cnic Verification with face Without glasses and
                                mask.
                              </Text>
                              {/* </View> */}
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <View style={{position: 'relative'}}>
                            <TouchableOpacity
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
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
                                source={{uri: cnicVerification.path ? cnicVerification.path : cnicVerification}}
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
          )}

          <View>
            {switchValue == '1' ? (
              <CustomButton
                loader={loader}
                onPress={updateUser}
                title="Update User"
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

      {/* Document Validation */}

      {/* <ModalPoup
        visible={isDocumentValidation}
        onClose={() => setIsDocumentValidation(false)}>
        <View
          style={{
            flex:1,
          }}>
          
        </View>
      </ModalPoup> */}
    </View>
  );
};

export default Profile;
