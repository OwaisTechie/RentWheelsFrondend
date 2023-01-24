import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
  StatusBar,
  FlatList,
  Keyboard,
  Dimensions,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../Components/Custom_btn/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {Colors, CustomIcons} from '../../../Theme';
import {ScrollView} from 'react-native-gesture-handler';
import CustomDropdown from '../../../Components/CustomDropdown/CustomDropdown';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {addVehicle, getVehicleCategies} from './apiCalls/apiCalls';
import CustomSwitch from '../../../Components/Custom_Switch/CustomSwitch';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomInput from '../../../Components/CustomTextField/CustomInput';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ModalPoup from '../../../Components/CustomModal/ModalPopup';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from '../../../Theme/mapStyle';
const GoogleApikey = 'AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g';
import { useNavigation } from '@react-navigation/native';
const RegisteredVehicles = () => {
  const navigation = useNavigation();
  const [pickupFlag, setPickupFlag] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [spinner,setSpinner] = useState(false);
  const [pickupText, setPickupText] = useState('');
  const [inputs, setInputs] = useState({
    vehicleCategory: '',
    vehicleType: '',
    fuelType: '',
    images: [],
    yearItems: '',
    brand: '',
    model: '',
    registrationNumber: '',
    noOfSeats: '',
    noOfDoors: '',
    noOfAirbags: '',
    description: '',
    selfDriveDailyCharges: '',
  });
  const [errors, setErrors] = useState({});
  const mapRef = useRef();
  const [showfilterModal, setShowFilterModal] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [SchemaSteps, setSchemaSteps] = useState(0);
  const [pickupLocation, setPickupLocation] = useState({
    latitude: 24.860966,
    longitude: 66.990501,
  });
  const [formikErrors, setFormikErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAvailableForSelfDrive, setIsAvailableForSelfDrive] = useState(false);
  const [isAircondition, setIsAircondition] = useState('');
  const [isAutomatic, setIsAutomatic] = useState('');
  const [isplaces, setIsPlaces] = useState(false);
  const [value, setValue] = useState(null);
  const [active, setActive] = useState(false);
  const userId = useSelector(state => state?.auth?.users?.user);
  const auth = useSelector(state => state?.auth);
  // code remains same
  const [indexSelected, setIndexSelected] = useState(0);
  // const vehicleCategory = useRef(null);
  // const year = useRef(null);
  // const brand = useRef(null);
  // const model = useRef(null);
  // const registrationNumber = useRef(null);
  // const noOfSeats = useRef(null);
  // const noOfDoors = useRef(null);
  // const noOfAirbags = useRef(null);
  // const description = useRef(null);
  // const selfDriveDailyCharges = useRef(null);
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };

  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const [vehiclePapers, setVehiclePapers] = useState([]);
  const [vehicleInsurance, setVehicleInsurance] = useState([]);
  const [isFocus, setIsFocus] = useState([]);
  // const [transmissionItem, setTransmissionItem] = useState([
  //   {label: 'Manual', value: true},
  //   {label: 'Automatic', value: false},
  // ]);

  const [fuelTypeItem, setFuelTypeItem] = useState([
    {label: 'Petrol', value: 'Petrol'},
    {label: 'Diesel', value: 'Diesel'},
    {label: 'Gas', value: 'Gas'},
  ]);

  const [isFuelType, setIsFuelType] = useState(false);
  const [fuelTypeValue, setFuelTypeValue] = useState(null);

  const [yearItem, setYearItem] = useState([]);

  const [isYear, setIsYear] = useState(false);
  const [yearValue, setYearValue] = useState(null);
  const placesRef = useRef();

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
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      return true;
    }
  };

  

  useEffect(() => {
    var minOffset = 0,
      maxOffset = 60; // Change to whatever you want
    var thisYear = new Date().getFullYear();
    var years = [];
    for (var i = minOffset; i <= maxOffset; i++) {
      var year = thisYear - i;
      years.push({value: year.toString(), label: year.toString()});
    }
    setYearItem(years);
  }, []);

  useEffect(() => {
    requestExternalWritePermission();
  }, []);

  useEffect(() => {
    getVehicleCategies(onSuccess, onFailure);
    return(() => {
      setInputs({
        vehicleCategory: '',
        vehicleType: '',
        fuelType: '',
        images: [],
        yearItems: '',
        brand: '',
        model: '',
        registrationNumber: '',
        noOfSeats: '',
        noOfDoors: '',
        noOfAirbags: '',
        description: '',
        selfDriveDailyCharges: '',
      });
      setPickupLocation({
        latitude: 24.860966,
        longitude: 66.990501,
      });
      setIsAircondition('');
      setVehicleInsurance([]);
      setVehiclePapers([]);
      setIsAutomatic('');
    })
  }, []);

  const onSuccess = data => {
    setItems(data.Payload);
  };
  const onFailure = () => {
    console.log('OnFailure');
  };

  const clearImages = () => {
    setImages([]);
  };
  const checkImages = () => {
    console.log('IMAGES ->> ', images);
  };

  const onHandleSubmit = () => {
    var userData; 
      if (typeof userId == 'string') {
        userData = JSON.parse(userId);
      } else {
        userData = userId;
      }
    let Payload = {
      ...inputs,
      userId:userData._id,
      pickupLocation:[pickupLocation.latitude,pickupLocation.longitude],
      isAircondition:isAircondition,
      vehicleInsurance:vehicleInsurance,
      vehiclePapers:vehiclePapers,
      isAircondition:isAircondition,
      isAutomatic:isAutomatic
    };
    console.log("SUBMIT DATA ->>",Payload)
    setSpinner(true);
    setIsEnable(true);
    addVehicle(Payload,onVehicleSuccess,onVehicleFailure)
  };

  const onVehicleSuccess = (data) => {
    setIsEnable(false);
    setSpinner(false);
    navigation.navigate('OwnerVehicleNavigator', { screen: 'OwnerVehicle' });
  }
  const onVehicleFailure = () => {
    console.log("RESPONSE ->> ");
    setSpinner(false);
    setIsEnable(false);
  }

  const openImageLibrary = () => {
    ImagePicker.openPicker({
      multiple: true,
      compressImageQuality: 0.5,
      maxFiles: `10`,
      mediaType: 'photo',
      showsSelectedCount: true,
    }).then(async imgs => {
      const result = [];
      if (imgs.length <= 10) {
        let id = 0;
        for await (const image of imgs) {
          id = id + 1;
          const img = await ImagePicker.openCropper({
            mediaType: 'photo',
            path: image.path,

            cropping: true,
          });
          let imageData = {
            id: id,
            image: img.path,
            mime:img.mime
          };
          result.push(imageData);
        }
      } else {
        // setImages([...images]);
        ToastAndroid.show('Maximum of 10 images allowed', ToastAndroid.SHORT);
      }
      handleOnChange(result, 'images');
      handleError(null, 'images');
      setImages(result);
      return result;
    });
  };
  const uploadVehiclePapers = () => {
    ImagePicker.openPicker({
      multiple: true,
      compressImageQuality: 0.5,
      maxFiles: `2`,
      mediaType: 'photo',
      showsSelectedCount: true,
    }).then(async imgs => {
      const result = [];
      if (imgs.length <= 2) {
        let id = 0;
        for await (const image of imgs) {
          id = id + 1;
          const img = await ImagePicker.openCropper({
            mediaType: 'photo',
            path: image.path,

            cropping: true,
          });
          let imageData = {
            id: id,
            image: img.path,
            mime:img.mime
          };
          result.push(imageData);
        }
      } else {
        // setImages([...images]);
        ToastAndroid.show('Maximum of 4 images allowed', ToastAndroid.SHORT);
      }
      // handleOnChange(result, 'images');
      handleError(null, 'images');
      setVehiclePapers(result);
      return result;
    });
  };
  const uploadVehicleInsurance = () => {
    ImagePicker.openPicker({
      multiple: true,
      compressImageQuality: 0.5,
      maxFiles: `2`,
      mediaType: 'photo',
      showsSelectedCount: true,
    }).then(async imgs => {
      const result = [];
      if (imgs.length <= 2) {
        let id = 0;
        for await (const image of imgs) {
          id = id + 1;
          const img = await ImagePicker.openCropper({
            mediaType: 'photo',
            path: image.path,

            cropping: true,
          });
          let imageData = {
            id: id,
            image: img.path,
            mime:img.mime
          };
          result.push(imageData);
        }
      } else {
        // setImages([...images]);
        ToastAndroid.show('Maximum of 2 images allowed', ToastAndroid.SHORT);
      }
      setVehicleInsurance(result);
      return result;
    });
  };

  const deleteImageById = id => {
    console.log("ID ->> ",id);
    const filteredData = inputs.images.filter(item => item.id !== id);
    console.log("Filtered ->> ",filteredData)
    handleOnChange(filteredData, 'images');
    // this.setState({ data: filteredData });
  };
  const deleteVehiclePaper = id => {
    const filteredData = vehiclePapers.filter(item => item.id !== id);
    setVehiclePapers(filteredData);
    // this.setState({ data: filteredData });
  };
  const deleteVehicleInsurance = id => {
    const filteredData = vehicleInsurance.filter(item => item.id !== id);
    setVehicleInsurance(filteredData);
    // this.setState({ data: filteredData });
  };

  const ProgressStepStyles = {
    activeStepIconBorderColor: Colors.lightPurple,
    labelColor: Colors.lightPurple,
    activeLabelColor: Colors.lightPurple,
    borderWidth: 4,
    marginBottom: 15,
    topOffset: 2,
    activeStepNumColor: Colors.lightPurple,
    completedStepIconColor: Colors.lightPurple,
    completedProgressBarColor: Colors.lightPurple,
    completedCheckColor: 'white',
  };
  const buttonTextStyle = {
    color: Colors.lightPurple,
    fontWeight: 'bold',
    fontSize: 22,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // padding:10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.header_background,
    // position: 'absolute',
    elevation: 5,
    // bottom: 70,
  };
  const SubmitTextStyle = {
    color: Colors.lightPurple,
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // position: 'absolute',
    // bottom: 70,
    elevation: 3,
    // right: 1,
  };

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  const ScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    nestedScrollEnabled: true,
    contentContainerStyle: {
      flex: 1,
      // backgroundColor:'black'
      // justifyContent: 'center',
      // alignItems:'center',
    },
  };

  const onPrevious = () => {
    setFormikErrors(false);
  };

  const onSubmit = () => {
    console.log('SUBMIT');
  };

  const onNextStep = async () => {
    let valid = await validate();
    if (valid) {
      setFormikErrors(false);
    } else {
      setFormikErrors(true);
    }
  };

  // const onChange = e => {
  //   setFieldValue('vehicle', e.value);
  //   setIsFocus(false);
  // };

  const handleOnChange = (value, input) => {
    
    if(input == "vehicleCategory"){
      console.log("vehicleCategory ->> ",value._id)
      console.log("vehicleCategory ->> ",value.vehicleType)
      console.log("input ->> ",input)
      setInputs(prevState => ({...prevState, [input]: value._id}));
      setInputs(prevState => ({...prevState, "vehicleType": value.vehicleType}));
    }
    else{
    setInputs(prevState => ({...prevState, [input]: value}));
    setImages(value);
    }
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const validate = () => {
    let validCount = 0;
    Keyboard.dismiss();
    if (!inputs.vehicleCategory) {
      handleError('Car Type is Required', 'vehicleCategory');
      setIsValid(false);
      validCount++;
    }

    if (!inputs.yearItems) {
      handleError('Year is Required', 'yearItems');
      setIsValid(false);
      validCount++;
    }

    if (!inputs.brand) {
      handleError('Please input brand', 'brand');
      setIsValid(false);
      validCount++;
    }

    if (!inputs.model) {
      handleError('Model is Required', 'model');
      setIsValid(false);
      validCount++;
    }
    if (!inputs.registrationNumber) {
      handleError('Registration Number is Required', 'registrationNumber');
      setIsValid(false);
      validCount++;
    }
    if (!inputs.noOfSeats) {
      handleError('No of Seats is Required', 'noOfSeats');
      setIsValid(false);
      validCount++;
    }
    if (!inputs.noOfDoors) {
      handleError('No of Doors is Required', 'noOfDoors');
      setIsValid(false);
      validCount++;
    }
    if (!inputs.noOfAirbags) {
      handleError('No of Airbags is Required', 'noOfAirbags');
      setIsValid(false);
      validCount++;
    }
    if (!inputs.description) {
      handleError('Description is Required', 'description');
      setIsValid(false);
      validCount++;
    }

    if (!inputs.selfDriveDailyCharges) {
      handleError('Rent Charges is Required', 'selfDriveDailyCharges');
      setIsValid(false);
      validCount++;
    }

    if (inputs.images.length < 1) {
      handleError('Please upload images', 'images');
      setIsValid(false);
      validCount++;
    }

    if (validCount > 0) {
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.lightPurple}
        barStyle="light-content"
      />
      <ScrollView nestedScrollEnabled={true}>
        <ProgressSteps {...ProgressStepStyles}>
          <ProgressStep
            label="Vehicle Details"
            scrollViewProps={ScrollViewProps}
            nextBtnText="next"
            // nextBtnDisabled={isEnable}
            onNext={onNextStep}
            nextBtnTextStyle={buttonTextStyle}
            errors={formikErrors}>
            <View
              style={{
                marginBottom: 15,
                paddingHorizontal: wp('4%'),
              }}>
              <View style={{marginBottom: 10}}>
                <View>
                  <Text
                    style={{
                      marginVertical: hp('1%'),
                      fontSize: 16,
                      color: '#05375a',
                      // color:Colors.grey,
                    }}>
                    Car Type
                  </Text>
                </View>

                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: Colors.darkgrey},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={items}
                  value={inputs.vehicleCategory}
                  // ref={vehicleCategory}
                  // searchs
                  maxHeight={300}
                  labelField="vehicleType"
                  valueField="_id"
                  placeholder={'Select item'}
                  // searchPlaceholder="Search..."
                  // value={values['vehicleCategory']}
                  // onFocus={() => setIsFocus(true)}
                  // onBlur={handleBlur('vehicle')}
                  // onChange={item => setFieldValue('vehicleCategory', item._id)}
                  onFocus={() => {
                    handleError(null, 'vehicleCategory');
                  }}
                  onChange={item => handleOnChange(item, 'vehicleCategory')}
                  // onChange={onChange}
                />

                {errors.vehicleCategory && (
                  <Text
                    style={{
                      color: '#FF5A5F',
                      fontSize: 12,
                      paddingVertical: hp('1%'),
                      marginHorizontal: wp('3%'),
                    }}>
                    {errors.vehicleCategory}
                  </Text>
                )}
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <Text>Photo Upload</Text>
                  <Text>{`Photos · ${inputs.images.length} / 10 - You can add up to 10 photos.`}</Text>
                </View>

                {inputs.images.length > 0 ? (
                  <FlatList
                    horizontal={true}
                    data={inputs.images}
                    // style={{ position: 'absolute', bottom: 80 }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                    }}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                      <View style={{position: 'relative', marginVertical: 10}}>
                        <TouchableOpacity activeOpacity={0.9}>
                          <Image
                            style={{
                              width: 200,
                              height: 200,
                              marginRight: 10,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              borderRadius: 16,
                              borderWidth: 4,
                              // borderColor:
                              //   index === indexSelected ? Colors.lightPurple : 'white',
                              borderColor: Colors.lightPurple,
                            }}
                            source={{uri: item.image}}
                            resizeMode="contain"
                          />

                          <TouchableOpacity
                            style={{position: 'absolute', right: 15, top: 5}}
                            onPress={() => deleteImageById(item.id)}>
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
                  />
                ) : (
                  // images.map(image => (
                  //   <View key={image.path}>
                  //     <Image
                  //       style={{
                  //         width: 80,
                  //         height: 80,
                  //       }}
                  //       source={{uri: image.path}}
                  //     />
                  //   </View>
                  // ))
                  <View style={{alignItems: 'center', marginVertical: 10}}>
                    <TouchableOpacity
                      onPress={openImageLibrary}
                      style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        height: 200,
                        width: '90%',
                        borderColor: Colors.backgroundMedium,
                      }}>
                      {/* <View >  */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <CustomIcons
                          type="material"
                          name="add-a-photo"
                          size={50}
                          color={Colors.lightPurple}
                        />
                        <Text>Add Photos</Text>
                      </View>
                      {/* </View> */}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {errors.images && (
                <Text
                  style={{
                    color: '#FF5A5F',
                    fontSize: 12,
                    paddingVertical: hp('1%'),
                    marginHorizontal: wp('3%'),
                  }}>
                  {errors.images}
                </Text>
              )}
              <View style={{marginBottom: 2}}>
                <View>
                  <Text
                    style={{
                      marginVertical: hp('1%'),
                      fontSize: 16,
                      color: '#05375a',
                      // color:Colors.grey,
                    }}>
                    Year
                  </Text>
                </View>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: Colors.darkgrey},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={yearItem}
                  value={inputs.yearItems}
                  // ref={year}
                  // searchs
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select Year'}
                  searchPlaceholder="Search..."
                  // value={values['yearItem']}
                  // onFocus={() => setIsFocus(true)}
                  // onBlur={handleBlur('vehicle')}
                  // onChange={item => setFieldValue('yearItem', item.value)}
                  onFocus={() => {
                    handleError(null, 'yearItems');
                  }}
                  onChange={item => handleOnChange(item.value, 'yearItems')}
                  // onChange={onChange}
                />
                {errors.yearItems && (
                  <Text
                    style={{
                      color: '#FF5A5F',
                      fontSize: 12,
                      paddingVertical: hp('1%'),
                      marginHorizontal: wp('3%'),
                    }}>
                    {errors.yearItems}
                  </Text>
                )}
              </View>
              <View>
                <CustomInput
                  placeholder="Enter your brand"
                  onFocus={() => {
                    handleError(null, 'brand');
                  }}
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  label="Brand"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  // onSubmitEditing={() => {
                  //   password.current.focus();
                  // }}
                  name="brand"
                  value={inputs.brand}
                  // onBlur={handleBlur}
                  error={errors.brand}
                  // touched={touched.brand}
                  onChangeText={text => handleOnChange(text, 'brand')}
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Enter your Model"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  label="Model"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onFocus={() => {
                    handleError(null, 'model');
                  }}
                  value={inputs.model}
                  // ref={model}
                  // onBlur={handleBlur('model')}
                  error={errors.model}
                  // touched={touched.model}
                  onChangeText={text => handleOnChange(text, 'model')}
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Enter Registration Number"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  label="Registration Number"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onFocus={() => {
                    handleError(null, 'registrationNumber');
                  }}
                  value={inputs.registrationNumber}
                  // ref={registrationNumber}
                  // onBlur={handleBlur('registrationNumber')}
                  error={errors.registrationNumber}
                  // touched={touched.registrationNumber}
                  onChangeText={text =>
                    handleOnChange(text, 'registrationNumber')
                  }
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Enter Number Of Seats"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  keyboardType="numeric"
                  label="Number Of Seats"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onFocus={() => {
                    handleError(null, 'noOfSeats');
                  }}
                  value={inputs.noOfSeats}
                  // ref={noOfSeats}
                  // onBlur={handleBlur('noOfSeats')}
                  error={errors.noOfSeats}
                  // touched={touched.noOfSeats}
                  onChangeText={text => handleOnChange(text, 'noOfSeats')}
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Enter Number Of Doors"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  keyboardType="numeric"
                  label="Number Of Doors"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onFocus={() => {
                    handleError(null, 'noOfDoors');
                  }}
                  value={inputs.noOfDoors}
                  // ref={noOfDoors}
                  // onBlur={handleBlur('noOfDoors')}
                  error={errors.noOfDoors}
                  // touched={touched.noOfDoors}
                  onChangeText={text => handleOnChange(text, 'noOfDoors')}
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Enter Number Of Air Bags"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  keyboardType="numeric"
                  label="Number Of Airbags"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onFocus={() => {
                    handleError(null, 'noOfAirbags');
                  }}
                  value={inputs.noOfAirbags}
                  // ref={noOfAirbags}
                  // onBlur={handleBlur('noOfAirbags')}
                  error={errors.noOfAirbags}
                  // touched={touched.noOfAirbags}
                  onChangeText={text => handleOnChange(text, 'noOfAirbags')}
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Vehicle Description"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  label="Vehicle Description"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  // ref={description}
                  editable={true}
                  value={inputs.description}
                  multiline={true}
                  numberOfLines={4}
                  maxLength={200}
                  onFocus={() => {
                    handleError(null, 'description');
                  }}
                  // onBlur={handleBlur('description')}
                  error={errors.description}
                  // touched={touched.description}
                  onChangeText={text => handleOnChange(text, 'description')}
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Fuel Type"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  label="Fuel Type"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  // ref={description}
                  value={inputs.fuelType}
                  editable={true}
                  maxLength={200}
                  onFocus={() => {
                    handleError(null, 'fuelType');
                  }}
                  // onBlur={handleBlur('description')}
                  error={errors.fuelType}
                  // touched={touched.description}
                  onChangeText={text => handleOnChange(text, 'fuelType')}
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Rent Price (Per Day)"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  keyboardType="numeric"
                  label="Rent Price"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  value={inputs.selfDriveDailyCharges}
                  // ref={selfDriveDailyCharges}
                  // onBlur={handleBlur('selfDriveDailyCharges')}
                  onFocus={() => {
                    handleError(null, 'selfDriveDailyCharges');
                  }}
                  error={errors.selfDriveDailyCharges}
                  // touched={touched.selfDriveDailyCharges}
                  onChangeText={text =>
                    handleOnChange(text, 'selfDriveDailyCharges')
                  }
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                />
              </View>

              {/* <View style={{alignItems: 'center'}}>
                  <CustomSwitch
                    selectionMode={1}
                    option1="Hello"
                    option="Hello2"
                    onSelectSwitch={e => console.log('SWITVH', e)}
                  /> */}
              {/* </View> */}
            </View>
          </ProgressStep>

          <ProgressStep
            scrollViewProps={ScrollViewProps}
            nextBtnTextStyle={SubmitTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            nextBtnDisabled={isEnable}
            nextBtnText=">"
            previousBtnText="<"
            onPrevious={onPrevious}
            finishBtnText="Confirm "
            onSubmit={onHandleSubmit}
            label="Vehicle Papers and more..">
            <View
              style={{
                marginBottom: 15,
                paddingHorizontal: wp('4%'),
              }}>
              {/* <View style={{marginBottom: 2}}>
                <View>
                  <Text
                    style={{
                      marginVertical: hp('1%'),
                      fontSize: 16,
                      color: '#05375a',
                      // color:Colors.grey,
                    }}>
                    PickUp Location
                  </Text>
                </View>
                <GooglePlacesAutocomplete
                  ref={placesRef}
                  placeholder="Enter Location"
                  fetchDetails={true}
                  onFail={error => console.log(error)}
                  onNotFound={() => console.log('no results')}
                  textInputProps={{
                    onChangeText: text => {
                      console.log('TEXT ->> ', text);
                    },
                    onFocus: () => setIsPlaces(true),
                    onBlur: () => console.log('Not Focus'),
                  }}
                  onPress={(data, details = null) => {
                    setIsPlaces(false);
                    console.log('DETAILS ->> ', details.geometry.location);
                    console.log('data ->> ', data);
                    let payload = {
                      ownerId: _id,
                      pickupLoc: [67.0699, 24.8604],
                    };
                    console.log('PAYLOAD ->> ', payload);
                    // let pickupLocation = [67.0699,24.8604]
                    // setVehicleLoading(true)
                    // getNearByLocation(payload, onSuccess, onFailure);
                    // setRegion({
                    // 	latitude: details.geometry.location.lat,
                    // 	longitude: details.geometry.location.lng,
                    // 	latitudeDelta: 0.0922,
                    // 	longitudeDelta: 0.0421
                    // })
                  }}
                  query={{
                    key: GoogleApikey,
                    language: 'en',
                    components: 'country:PK',
                    types: 'establishment',
                    // location: `${region.latitude}, ${region.longitude}`
                  }}
                  styles={{
                    // container: {
                    //   width: wp('80%'),
                    //   // backgroundColor: '#FAFAFA',
                    // },
                    listView: {
                      backgroundColor: '#FAFAFA',
                    },
                    textInput: {
                      height: 38,
                      color: Colors.lightPurple,
                      fontSize: 16,
                      borderRadius: 15,
                    },
                    predefinedPlacesDescription: {
                      color: 'red',
                    },
                  }}
                  listEmptyComponent={() => (
                    <View style={{flex: 1, margin: 10}}>
                      <Text style={{color: Colors.lightPurple, fontSize: 15}}>
                        No results were found
                      </Text>
                    </View>fY
                  )}
                />
                {errors.yearItem && (
                  <Text
                    style={{
                      color: '#FF5A5F',
                      fontSize: 12,
                      paddingBottom: hp('1%'),
                      marginHorizontal: wp('3%'),
                    }}>
                    {errors.yearItem}
                  </Text>
                )}
              </View> */}
              <View>
                {/* <CustomInput
                  placeholder="Pick Up Location"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  // keyboardType="numeric"
                  editable={false}
                  label="Pick Up Location"
                  onFocus={() => {
                    console.log("sasasasasasasasaasasassa");
                  }}
                  // error={errors.selfDriveDailyCharges}
                  // touched={touched.selfDriveDailyCharges}
                  // onChangeText={text =>
                  //   handleOnChange(text, 'selfDriveDailyCharges')
                  // }
                  keyboardAppearance="dark"
                  // returnKeyType='next'
                  // returnKeyLabel='next'
                /> */}
              </View>

              <View>
                <View>
                  <Text
                    style={{
                      marginVertical: hp('1%'),
                      fontSize: 16,
                      color: '#05375a',
                      // color:Colors.grey,
                    }}>
                    Upload Vehicle Papers
                  </Text>
                  <Text>{`Photos · ${vehiclePapers.length} / 2 - You can add up to 20 photos.`}</Text>
                </View>

                {vehiclePapers.length > 0 ? (
                  <FlatList
                    horizontal={true}
                    data={vehiclePapers}
                    // style={{ position: 'absolute', bottom: 80 }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                    }}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                      <View style={{position: 'relative', marginVertical: 10}}>
                        <TouchableOpacity activeOpacity={0.9}>
                          <Image
                            style={{
                              width: 200,
                              height: 200,
                              marginRight: 10,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              borderRadius: 16,
                              borderWidth: 4,
                              // borderColor:
                              //   index === indexSelected ? Colors.lightPurple : 'white',
                              borderColor: Colors.lightPurple,
                            }}
                            source={{uri: item.image}}
                            resizeMode="contain"
                          />

                          <TouchableOpacity
                            style={{position: 'absolute', right: 15, top: 5}}
                            onPress={() => deleteVehiclePaper(item.id)}>
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
                  />
                ) : (
                  // images.map(image => (
                  //   <View key={image.path}>
                  //     <Image
                  //       style={{
                  //         width: 80,
                  //         height: 80,
                  //       }}
                  //       source={{uri: image.path}}
                  //     />
                  //   </View>
                  // ))
                  <View style={{alignItems: 'flex-start', marginVertical: 10}}>
                    <TouchableOpacity
                      onPress={uploadVehiclePapers}
                      style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        height: 60,
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
                          type="material"
                          name="add-a-photo"
                          size={30}
                          color={Colors.lightPurple}
                        />
                        <Text>Add Photos</Text>
                        {/* </View> */}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      marginVertical: hp('1%'),
                      fontSize: 16,
                      color: '#05375a',
                      // color:Colors.grey,
                    }}>
                    Upload Vehicle Insurance
                  </Text>
                  <Text>{`Photos · ${vehicleInsurance.length} / 2 - You can add up to 20 photos.`}</Text>
                </View>

                {vehicleInsurance.length > 0 ? (
                  <FlatList
                    horizontal={true}
                    data={vehicleInsurance}
                    // style={{ position: 'absolute', bottom: 80 }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                    }}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                      // console.log("ITem ->> ",item)
                      // console.log("index ->> ",index)
                      <View style={{position: 'relative', marginVertical: 10}}>
                        <TouchableOpacity activeOpacity={0.9}>
                          <Image
                            style={{
                              width: 200,
                              height: 200,
                              marginRight: 10,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              borderRadius: 16,
                              borderWidth: 4,
                              // borderColor:
                              //   index === indexSelected ? Colors.lightPurple : 'white',
                              borderColor: Colors.lightPurple,
                            }}
                            source={{uri: item.image}}
                            resizeMode="contain"
                          />

                          <TouchableOpacity
                            style={{position: 'absolute', right: 15, top: 5}}
                            onPress={() => deleteVehicleInsurance(item.id)}>
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
                  />
                ) : (
                  <View style={{alignItems: 'flex-start', marginVertical: 10}}>
                    <TouchableOpacity
                      onPress={uploadVehicleInsurance}
                      style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        height: 60,
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
                          type="material"
                          name="add-a-photo"
                          size={30}
                          color={Colors.lightPurple}
                        />
                        <Text>Add Photos</Text>
                        {/* </View> */}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View>
                {!pickupFlag ? (
                  <View>
                    <View>
                      <Text
                        style={{
                          marginVertical: hp('1%'),
                          fontSize: 16,
                          color: '#05375a',
                          // color:Colors.grey,
                        }}>
                        Pick Up Location
                      </Text>
                    </View>

                    <View style={styles.inputContainer}>
                      <TouchableOpacity
                        onPress={() => setShowFilterModal(true)}>
                        <Text style={{fontSize: 16, color: '#05375a'}}>
                          Click here to Select the Location!
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                  <CustomInput
                    placeholder="PickUp Location"
                    // iconName="account-key-outline"
                    // type="materialCommunity"
                    value={pickupText}
                    keyboardType="numeric"
                    label="PickUp Location"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    editable={false}
                    multiline={true}
                    numberOfLines={4}
                    // ref={selfDriveDailyCharges}
                    // onBlur={handleBlur('selfDriveDailyCharges')}
                    onFocus={() => {
                      setShowFilterModal(true)
                    }}
                    keyboardAppearance="dark"
                  />
                  <View>
                    <TouchableOpacity onPress={() => setShowFilterModal(true)}>

                      <Text style={{textAlign:'right',fontWeight:'bold'}}>Change PickUp Location</Text>
                    </TouchableOpacity>
                  </View>
                  </View>
                  
                )}
              </View>

              <View>
                <View>
                  <Text
                    style={{
                      marginVertical: hp('1%'),
                      fontSize: 16,
                      color: '#05375a',
                      // color:Colors.grey,
                    }}>
                    Characteristics:
                  </Text>
                </View>
                <View>
                  <View>
                    <View style={styles.checkboxContainer}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox
                          disabled={false}
                          value={isAutomatic}
                          onValueChange={newValue =>{
                            console.log(newValue)
                            setIsAutomatic(newValue)
                          } }
                        />
                        <Text>Automatic</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox
                          disabled={false}
                          value={isAircondition}
                          onValueChange={newValue =>{
                            console.log(newValue)
                            setIsAircondition(newValue)
                          } }
                        />
                        <Text>Air condition</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* <View style={{alignItems: 'center'}}>
                <CustomSwitch
                  selectionMode={1}
                  option1="Hello"
                  option="Hello2"
                  onSelectSwitch={e => console.log('SWITVH', e)}
                />
              </View> */}
            </View>
          </ProgressStep>
        </ProgressSteps>
      </ScrollView>

      <ModalPoup
        visible={showfilterModal}
        onClose={() => setShowFilterModal(false)}>
        <View>
          <View>
            <Text
              style={{
                marginBottom: hp('1%'),
                fontSize: 16,
                color: '#05375a',
                // color:Colors.grey,
              }}>
              Pick Up Location :
            </Text>
          </View>
          <View
            style={{
              zIndex: 1,
              top: 20,
              left: 0,
              position: 'absolute',
              padding: 18,
              // justifyContent:'space-evenly',
              // marginRight: 0,
              flexDirection: 'row',
            }}>
            <GooglePlacesAutocomplete
              ref={placesRef}
              placeholder="Enter Location"
              fetchDetails={true}
              onFail={error => console.log(error)}
              onNotFound={() => console.log('no results')}
              textInputProps={{
                leftIcon: {type: 'font-awesome', name: 'chevron-left'},
                onChangeText: text => {
                  // setPickupText(text)
                  console.log("Text ",text);
                },
                onFocus: () => setIsPlaces(true),
                onBlur: () => console.log('Not Focus'),
              }}
              onPress={(data, details = null) => {
                setIsPlaces(false);
                let coordinate = details.geometry.location;
                console.log('DETAILS ->> ', details.geometry.location);
                console.log('data ->> ', data);
                setPickupText(data.description)
                // console.log('PAYLOAD ->> ', payload);
                setPickupLocation({
                  latitude: coordinate.lat,
                  longitude: coordinate.lng,
                });
                setPickupFlag(true);
              }}
              query={{
                key: GoogleApikey,
                language: 'en',
                components: 'country:PK',
                types: 'establishment',
                // location: `${region.latitude}, ${region.longitude}`
              }}
              styles={{
                // container: {
                //   width: wp('80%'),
                //   // backgroundColor: '#FAFAFA',
                // },
                listView: {
                  backgroundColor: '#FAFAFA',
                },
                textInput: {
                  height: 38,
                  color: Colors.lightPurple,
                  fontSize: 16,
                  borderRadius: 15,
                  // borderWidth: 2,
                },
                predefinedPlacesDescription: {
                  color: 'red',
                },
              }}
              listEmptyComponent={() => (
                <View style={{flex: 1, margin: 10}}>
                  <Text style={{color: Colors.lightPurple, fontSize: 15}}>
                    No results were found
                  </Text>
                </View>
              )}
            />

            <View style={{position: 'absolute', right: 25, top: 25}}>
              <TouchableOpacity
                onPress={() => placesRef.current?.setAddressText('')}>
                <CustomIcons
                  type="entypo"
                  name="circle-with-cross"
                  size={25}
                  color={Colors.lightPurple}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <MapView
              ref={mapRef}
              customMapStyle={mapStyle}
              provider={PROVIDER_GOOGLE}
              // loadingEnabled={vehicles?.length > 0 ? false : true}
              // showsUserLocation={true}
              showsMyLocationButton={true}
              loadingIndicatorColor={Colors.lightPurple}
              style={{
                width: Dimensions.get('window').width - 50,
                height: Dimensions.get('window').height - 300,
                // : Dimensions.get('window').height,
              }}
              region={{
                latitude: pickupLocation.latitude,
                longitude: pickupLocation.longitude,
                latitudeDelta: 0.0012,
                longitudeDelta: 0.0012,
              }}
              // onReady={result => {
              //   console.log(`Distance: ${result.distance} km`);
              //   console.log(`Duration: ${result.duration} min.`);

              //   MapView.fitToCoordinates(result.coordinates, {
              //     edgePadding: {
              //       right: width / 20,
              //       bottom: height / 20,
              //       left: width / 20,
              //       top: height / 20,
              //     },
              //   });
              // }}
              mapType="standard">
              {/* {vehicles?.length > 0 ? (
          vehicles.map((marker, index) => {
            return (
              <CustomMarker
                key={marker._id}
                id={marker._id}
                selectedMarker={selectedMarker}
                latitude={marker.pickupLocation.coordinates[1]}
                longitude={marker.pickupLocation.coordinates[0]}></CustomMarker>
            );
          })
        ):null} */}
              <Marker
                coordinate={{
                  latitude: pickupLocation.latitude,
                  longitude: pickupLocation.longitude,
                  latitudeDelta: 0.0012,
                  longitudeDelta: 0.0012,
                }}></Marker>
            </MapView>
          </View>
        </View>
      </ModalPoup>

      <Spinner
          visible={spinner}
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,

    // backgroundColor: '#05375a',
    // backgroundColor: '#3E3D40',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  inputContainer: {
    height: 60,
    // padding:2,
    // backgroundColor: Colors.White,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    // shadowColor: Colors.Black,
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 0,
    //   width: 0,
    // },
    // elevation: ,
    borderWidth: 1,
    borderColor: Colors.darkgrey,
    // alignItems:'center'
  },
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dropdown: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.darkgrey,
    // borderRadius: 8,
    paddingHorizontal: 15,
    borderRadius: 18,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default RegisteredVehicles;
