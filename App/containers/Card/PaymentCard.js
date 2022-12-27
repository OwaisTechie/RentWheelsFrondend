import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Button,
  StatusBar,
} from 'react-native';
import * as Yup from 'yup';
// import CreditCard from 'react-native-credit-card-form-ui';
import CreditCardDisplay from 'react-native-credit-card-display';
import CustomInput from '../../Components/CustomTextField/CustomInput';
import {useFormik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputMask from 'react-native-text-input-mask';
import CustomButton from '../../Components/Custom_btn/CustomButton';
import {Colors, CustomIcons} from '../../Theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { addBookings } from './apiCalls/apiCalls';
const PaymentCard = props => {
  const {navigation, route} = props;
  const {booking} = props.route.params;
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('CARD HOLDER NAME');
  const [cvv, setCvv] = useState(123);
  const [expiry, setExpiry] = useState('12/12');
  const [cardNo, setCardNo] = useState('0000 000 00000 0000');
  const [loader, setLoader] = useState(false);

  const HolderName = useRef();
  const Cvv = useRef();
  const expire = useRef();
  const cardNumber = useRef();

  // const Booking = route?.params.booking;
  // console.log('Booking ->> ', Booking);

  const LoginSchema = Yup.object().shape({
    HolderName: Yup.string().required('Card Holder Name is Required'),
    Cvv: Yup.string()
      .min(3, 'InValid Cvv!')
      .max(3, 'InValid Cvv!')
      .required('Cvv is Required'),
    expire: Yup.string()
      .min(5, 'Invalid Expiry!')
      .max(5, 'Invalid Expiry!')
      .required('Expiry is Required'),
    cardNumber: Yup.string()
      .min(16, 'Invalid cardNo!')
      .max(16, 'Invalid cardNo!')
      .required('Card Number is Required'),
  });

  const onhandleChange = (name, value, extracted) => {
    console.log('extracted ->> ', extracted);
    console.log('name,value, ->> ', name, value);
    if (name == 'Cvv') {
      console.log('CSSS');
      setIsFlipped(true);
      setCvv(value);
      handleChange(name)(value);
    } else {
      setIsFlipped(false);
      setExpiry(value);
      handleChange(name)(value);
    }
  };

  const onChangeText = (name, value) => {
    console.log('AAAA ->> ', name, value);
    if (name == 'HolderName') {
      setIsFlipped(false);
      setCardHolderName(value);
      handleChange(name)(value);
    } else if (name == 'cardNumber') {
      setIsFlipped(false);
      setCardNo(value);
      handleChange(name)(value);
    }
  };

  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {HolderName: '', Cvv: '', expire: '', cardNumber: ''},
      onSubmit: payload => {
        console.log('PAYLOAD ->> ', payload);

        let Payload = {
          startTime:booking.startTime,
          endTime:booking.endTime,
          vehicle:booking.vehicle,
          cardNo:payload.cardNumber,
          cvv:payload.Cvv,
          cardHolderName:payload.HolderName,
          expiry:payload.expire
        }
        setLoader(true);
        addBookings(Payload,onSuccess,onFailure);
        // setLoader(!loader);
        // var Payload = {
        //   ...payload,
        //   firebaseToken: fcmToken,
        // };
        // console.log("navigation.navigate --> ",navigation.navigate)
        // navigation.navigate('HomeNavigator');
        // loginRequest(Payload, onSuccess, onFailure);
      },
    });

  // const handleSubmit = useCallback(() => {
  //   if (creditCardRef.current) {
  //     const {error, data} = creditCardRef.current.submit();
  //     console.log('ERROR: ', error);
  //     console.log('CARD DATA: ', data);
  //   }
  // }, []);
  
    const onSuccess = (data) => {
      setLoader(false);
      console.log("data ->> ",data);
    }
    const onFailure = () => {
      setLoader(false);
      console.log("Failure")
    }

  const onPressLearnMore = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.lightPurple}
        barStyle="light-content"
      />
      <View style={styles.container} />

        <ScrollView style={{width: '90%'}} showsVerticalScrollIndicator={false}>
      <View style={{alignSelf:'center', marginBottom:5}} >
        <CreditCardDisplay
          number={cardNo}
          cvc={cvv}
          expiration={expiry}
          name={cardHolderName}
          flipped={isFlipped}
          // since="2004"
        />
      </View>

        <View>
          <View style={{justifyContent: 'space-around'}}>
            <CustomInput
              placeholder="Enter your Card Holder Name"
              iconName="account-key-outline"
              type="materialCommunity"
              label="Card Holder Name"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => {
                HolderName.current.focus();
              }}
              ref={HolderName}
              onBlur={handleBlur('HolderName')}
              error={errors.HolderName}
              touched={touched.HolderName}
              onChangeText={values => onChangeText('HolderName', values)}
              keyboardAppearance="dark"
              // returnKeyType='next'
              // returnKeyLabel='next'
            />
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <CustomInput
              placeholder="Enter your Card Number"
              iconName="account-key-outline"
              maxLength={16}
              keyboardType="numeric"
              type="materialCommunity"
              label="Card Number"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => {
                cardNumber.current.focus();
              }}
              ref={cardNumber}
              onBlur={handleBlur('cardNumber')}
              error={errors.cardNumber}
              touched={touched.cardNumber}
              onChangeText={values => onChangeText('cardNumber', values)}
              keyboardAppearance="dark"
              // returnKeyType='next'
              // returnKeyLabel='next'
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <View style={{width: '45%'}}>
              <Text style={styles.label}>{'Cvv'}</Text>
              <View
                style={[
                  styles.inputContainer,
                  {height: 60, alignItems: 'center'},
                ]}>
                {/* <CustomIcons
              name={iconName}
              type={type}
              style={{fontSize: 22, color: validationColor, marginRight: 10}}
            /> */}
                <TextInputMask
                  placeholder="123"
                  iconName="account-key-outline"
                  type="materialCommunity"
                  label="Cvv"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => {
                    Cvv.current.focus();
                  }}
                  ref={Cvv}
                  maxLength={3}
                  keyboardType="numeric"
                  onBlur={handleBlur('Cvv')}
                  masked={'[000]'}
                  error={errors.Cvv}
                  touched={touched.Cvv}
                  onChangeText={(value, extracted) => {
                    onhandleChange('Cvv', value, extracted);
                  }}
                  // render={(props) => <TextInputMask {...props} mask={masked} />}
                  // onFocus={() => {
                  //   onFocus();
                  //   setIsFocused(true);
                  // }}
                  // onBlur={() => {
                  //   setIsFocused(true);
                  // }}
                  // render={props => (
                  //   <MaskInput
                  //     value={props}
                  //     onChangeText={(masked, unmasked) => {
                  //       // setPhone(masked); // you can use the unmasked value as well

                  //       // assuming you typed "9" all the way:
                  //       console.log(masked); // (99) 99999-999
                  //     }}
                  //     mask={masked}
                  //   />
                  // )}
                  style={{
                    color: Colors.Black,
                    width: widthPercentageToDP('80%'),
                  }}
                  // style={styles.maskedInput}
                  mask={'[000]'}
                  {...props}
                />
                
              </View>
              {errors.Cvv && (
                  <Text
                    style={{
                      color: '#FF5A5F',
                      fontSize: 12,
                      paddingTop: heightPercentageToDP('1%'),
                      marginHorizontal: widthPercentageToDP('3%'),
                    }}>
                    {errors.Cvv}
                  </Text>
                )}
            </View>
            <View style={{width: '45%'}}>
              <Text style={styles.label}>{'Expiry'}</Text>
              <View
                style={[
                  styles.inputContainer,
                  {height: 60, alignItems: 'center'},
                ]}>
                {/* <CustomIcons
              name={iconName}
              type={type}
              style={{fontSize: 22, color: validationColor, marginRight: 10}}
            /> */}
                <TextInputMask
                  placeholder="12/12"
                  iconName="account-key-outline"
                  type="materialCommunity"
                  label="Expiry"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  // onSubmitEditing={() => {
                  //   expire.current.focus();
                  // }}
                  ref={expire}
                  maxLength={5}
                  keyboardType="numeric"
                  // onBlur={handleBlur('cardHolderName')}
                  masked={'[00]/[00]'}
                  error={errors.expire}
                  touched={touched.expire}
                  onChangeText={(value, extracted) => {
                    onhandleChange('expire', value, extracted);
                  }}
                  style={{
                    color: Colors.Black,
                    width: widthPercentageToDP('80%'),
                  }}
                  // style={styles.maskedInput}
                  mask={'[00]/[00]'}
                  {...props}
                />
                
              </View>
              {errors.expire && (
                  <Text
                    style={{
                      color: '#FF5A5F',
                      fontSize: 12,
                      paddingTop: heightPercentageToDP('1%'),
                      marginHorizontal: widthPercentageToDP('3%'),
                    }}>
                    {errors.expire}
                  </Text>
                )}
            </View>
          </View>
        </View>
        <View style={{width: '100%'}}>
          <CustomButton
            loader={loader}
            onPress={() => handleSubmit()}
            title="Submit"
          />
        </View>
      </ScrollView>
      {/* <View>
        <Button onPress={onPressLearnMore} title="Learn More" color="#841584" />
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    marginVertical: 3,
    fontSize: 16,
    color: '#05375a',
    // color:Colors.grey,
  },
  inputContainer: {
    // height: 60,
    // padding:2,
    backgroundColor: Colors.White,
    borderRadius: 18,
    flexDirection: 'row',
    // justifyContent:'flex',
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
});

export default PaymentCard;
