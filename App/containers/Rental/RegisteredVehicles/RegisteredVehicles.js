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
} from 'react-native';
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
import {getVehicleCategies} from './apiCalls/apiCalls';
import CustomSwitch from '../../../Components/Custom_Switch/CustomSwitch';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomInput from '../../../Components/CustomTextField/CustomInput';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const GoogleApikey = 'AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g';
const RegisteredVehicles = () => {
  const [inputs, setInputs] = useState({
    vehicleCategory: '',
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

  const [isValid, setIsValid] = useState(true);
  const [SchemaSteps, setSchemaSteps] = useState(0);
  const [formikErrors, setFormikErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAvailableForSelfDrive, setIsAvailableForSelfDrive] = useState(false);
  const [isAircondition, setIsAircondition] = useState(false);
  const [isAutomatic, setIsisAutomatic] = useState(false);

  const [value, setValue] = useState(null);
  const [active, setActive] = useState(false);
  const userId = useSelector(state => state?.auth?.users?.user?._id);
  const auth = useSelector(state => state?.auth);
  console.log('userId ->> ', userId);
  console.log('auth ->> ', auth);
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
    console.log('YEAR ->> ', years);
    setYearItem(years);
  }, []);

  useEffect(() => {
    requestExternalWritePermission();
  }, []);

  useEffect(() => {
    getVehicleCategies(onSuccess, onFailure);
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

  const openImageLibrary = () => {
    ImagePicker.openPicker({
      multiple: true,
      compressImageQuality: 0.5,
      maxFiles: `4`,
      mediaType: 'photo',
      showsSelectedCount: true,
    }).then(async imgs => {
      const result = [];
      if (imgs.length <= 4) {
        let id = 0;
        for await (const image of imgs) {
          id = id + 1;
          console.log('IMAGE ->> ', image);
          const img = await ImagePicker.openCropper({
            mediaType: 'photo',
            path: image.path,

            cropping: true,
          });
          let imageData = {
            id: id,
            image: img.path,
          };
          result.push(imageData);
        }
      } else {
        // setImages([...images]);
        ToastAndroid.show('Maximum of 4 images allowed', ToastAndroid.SHORT);
      }
      handleOnChange(result, 'images');
      handleError(null,'images');
      // setImages(result);
      return result;
    });
  };

  const deleteImageById = id => {
    console.log('INDEX -> ', id);
    console.log(inputs.images)
    const filteredData =  inputs.images.filter(item => item.id !== id);
    console.log('FILTER', filteredData);
    handleOnChange(filteredData, 'images');
    // this.setState({ data: filteredData });
  };

  const ProgressStepStyles = {
    activeStepIconBorderColor: Colors.lightPurple,
    labelColor: Colors.lightPurple,
    activeLabelColor: Colors.lightPurple,
    borderWidth: 2,
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
    contentContainerStyle: {
      flex: 1,
      // backgroundColor:'black'
      // justifyContent: 'center',
      // alignItems:'center',
    },
  };

  const onPrevious = () => {
    console.log('PRe');
    setFormikErrors(true);
  };

  const onSubmit = () => {
    console.log('SUBMIT');
  };

  // const LoginSchema = Yup.object().shape({
  //   // vehicleCategory: Yup.string().required('fuelType is Required'),
  //   // yearItem: Yup.string().required('Year is Required'),
  //   // vehicle: Yup.string().required('vehicleType is Required'),
  //   brand: Yup.string().required('brand is Required'),
  // });

  // const LoginSchema1 = Yup.object().shape({
  //   vehiclePapers: Yup.string().required('fuelType is Required'),
  // });

  // const LoginSchemaSteps = [LoginSchema, LoginSchema1];

  // const {
  //   handleChange,
  //   handleSubmit,
  //   handleBlur,
  //   values,
  //   setFieldValue,
  //   errors,
  //   touched,
  // } = useFormik({
  //   validationSchema: LoginSchemaSteps[SchemaSteps],
  //   // validationSchema: LoginSchema,
  //   initialValues: {
  //     // fuelTypeItem: '',
  //     // isAvailableForSelfDrive: false,
  //     // isAircondition: false,
  //     // isAutomatic: false,
  //     // model: '',
  //     // yearItem: '',
  //     // vehicleCategory: '',
  //     brand: '',
  //     // images: [],
  //     vehiclePapers: '',
  //     // vehicleInsurance: [],
  //     // noOfDoors: '',
  //     // noOfAirbags: '',
  //     // noOfSeats: '',
  //     // description: '',
  //     // registrationNumber: '',
  //     // selfDriveDailyCharges: '',
  //   },
  //   onSubmit: payload => {
  //     console.log('PAY ->> ', payload);
  //     // setLoader(!loader);
  //     // loginRequest(payload, onSuccess, onFailure);
  //     // signIn()
  //   },
  // });

  const onNextStep = async () => {
    // setSchemaSteps(step);
    // console.log(errors, 'gg');
    valid =await validate();
    console.log("ERRORS ->> ",isValid)
    if (isValid) {
      console.log( 'gg');
      setFormikErrors(true);
    } else {
      setFormikErrors(false);
    }
  };

  // const onChange = e => {
  //   setFieldValue('vehicle', e.value);
  //   setIsFocus(false);
  // };

  const handleOnChange = (value, input) => {
    setInputs(prevState => ({...prevState, [input]: value}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const validate = () => {
    Keyboard.dismiss();
    console.log("!inputs.vehicleCategory ->> ",!inputs.vehicleCategory)
    console.log("!inputs.yearItems->> ",!inputs.yearItems)
    console.log("inputs.images.length",inputs.images.length)
    console.log("!inputs.brand",!inputs.brand)
    if (!inputs.vehicleCategory) {
      handleError('Car Type is Required', 'vehicleCategory');
      setIsValid(false);
    }

    if (!inputs.yearItems) {
      handleError('Year is Required', 'yearItems');
      setIsValid(false);
    }

    if (!inputs.brand) {
      handleError('Please input brand', 'brand');
      setIsValid(false);
    }

    if (!inputs.model) {
      handleError('Model is Required', 'model');
      setIsValid(false);
    }
    if (!inputs.registrationNumber) {
      handleError('Registration Number is Required', 'registrationNumber');
      setIsValid(false);
    }
    if (!inputs.noOfSeats) {
      handleError('No of Seats is Required', 'noOfSeats');
      setIsValid(false);
    }
    if (!inputs.noOfDoors) {
      handleError('No of Doors is Required', 'noOfDoors');
      setIsValid(false);
    }
    if (!inputs.noOfAirbags) {
      handleError('No of Airbags is Required', 'noOfAirbags');
      setIsValid(false);
    }
    if (!inputs.description) {
      handleError('Description is Required', 'description');
      setIsValid(false);
    }

    if (!inputs.selfDriveDailyCharges) {
      handleError(
        'Rent Charges is Required',
        'selfDriveDailyCharges',
      );
      setIsValid(false);
    }

    if (inputs.images.length < 1) {
      handleError('Please upload images', 'images');
      setIsValid(false);
    }
    console.log("VALIDATION ->> ",isValid)
  };

  console.log("INPUTS ->> ",inputs);
  console.log("isValid ->> ",isValid);
  console.log("errors.vehicleCategory ->> ",errors);

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
                    handleError(null,'vehicleCategory')
                  }}
                  onChange={item => handleOnChange(item._id, 'vehicleCategory')}
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
                  <Text>{`Photos · ${inputs.images.length} / 10 - You can add up to 20 photos.`}</Text>
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
                    handleError(null,'yearItems')
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
                    handleError(null,'brand')
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
                    handleError(null,'model')
                  }}
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
                    handleError(null,'registrationNumber')
                  }}
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
                  label="Number Of Seats"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onFocus={() => {
                    handleError(null,'noOfSeats')
                  }}
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
                  label="Number Of Doors"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onFocus={() => {
                    handleError(null,'noOfDoors')
                  }}
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
                  label="Number Of Airbags"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onFocus={() => {
                    handleError(null,'noOfAirbags')
                  }}
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
                  multiline={true}
                  numberOfLines={4}
                  maxLength={200}
                  onFocus={() => {
                    handleError(null,'description')
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
                  placeholder="Rent Price"
                  // iconName="account-key-outline"
                  // type="materialCommunity"
                  label="Rent Price"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  // ref={selfDriveDailyCharges}
                  // onBlur={handleBlur('selfDriveDailyCharges')}
                  onFocus={() => {
                    handleError(null,'selfDriveDailyCharges')
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
            nextBtnText=">"
            previousBtnText="<"
            onPrevious={onPrevious}
            finishBtnText="Confirm "
            onSubmit={() => onNextStep(1)}
            label="Vehicle Papers and more..">
            <View
              style={{
                marginBottom: 15,
                paddingHorizontal: wp('4%'),
              }}>
              <View style={{marginBottom: 2}}>
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
                      // console.log('TEXT ->> ', text);
                    },
                    onFocus: () => setIsPlaces(true),
                    onBlur: () => console.log('Not Focus'),
                  }}
                  onPress={(data, details = null) => {
                    setIsPlaces(false);

                    // 'details' is provided when fetchDetails = true
                    console.log('DETAILS ->> ', details.geometry.location);
                    let pickupLocation = [
                      24.954179757526536, 67.14250599750613,
                    ];
                    getNearByLocation(pickupLocation, onSuccess, onFailure);
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
                      height: 60,
                      color: Colors.Black,
                      borderColor: Colors.darkgrey,
                      fontSize: 16,
                      paddingHorizontal: 15,
                      // padding:10,
                      borderWidth: 1,
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
                    </View>
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
                  {/* <Text>{`Photos · ${images.length} / 10 - You can add up to 20 photos.`}</Text> */}
                </View>

                {images.length > 0 ? (
                  <FlatList
                    horizontal={true}
                    data={images}
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
                  <View style={{alignItems: 'flex-start', marginVertical: 10}}>
                    <TouchableOpacity
                      onPress={openImageLibrary}
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
                  <Text>{`Photos · ${images.length} / 10 - You can add up to 20 photos.`}</Text>
               </View>

               {images.length > 0 ? (
                  <FlatList
                    horizontal={true}
                    data={images}
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
                  <View style={{alignItems: 'flex-start', marginVertical: 10}}>
                    <TouchableOpacity
                      onPress={openImageLibrary}
                      style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        height: 60,
                        width: '100%',
                        borderColor: Colors.backgroundMedium,
                      }}>
                      <View >
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
                         </View> 
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
                    Characteristics:
                  </Text>
                   <Text>{`Photos · ${images.length} / 10 - You can add up to 20 photos.`}</Text> 
                </View>
                <View>
                  <View>
                    <View style={styles.checkboxContainer}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox
                          disabled={false}
                          value={isAutomatic}
                          onValueChange={newValue =>
                            setIsisAutomaticA(newValue)
                          }
                        />
                        <Text>Automatice</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox
                          disabled={false}
                          value={isAircondition}
                          onValueChange={newValue =>
                            setIsAircondition(newValue)
                          }
                        />
                        <Text>Air condition</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View> 

               <View style={{alignItems: 'center'}}>
                <CustomSwitch 
                selectionMode={1}
                option1='Hello'
                option='Hello2'
                onSelectSwitch={(e) => console.log("SWITVH",e)}
                />
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </ScrollView>
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
