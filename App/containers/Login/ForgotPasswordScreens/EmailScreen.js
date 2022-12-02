import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  PermissionsAndroid,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../../Components/CustomTextField/CustomInput';
import {Colors} from '../../../Theme';
import CustomButton from '../../../Components/Custom_btn/CustomButton';

const EmailScreen = props => {
  const email = useRef(null);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email')
      .required('Email is required!'),
  });

  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      // validationSchema: LoginSchema,
      initialValues: {email: ''},
      onSubmit: payload => {
        props.onEmailSubmit(payload);
      },
    });
  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'flex-start', marginBottom: 5}}>
              <Text
                style={{
                  color: Colors.Black,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Forgot Password
              </Text>
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={{color: Colors.backgroundMedium}}>
                Enter your Email for the verification process.
              </Text>
              <Text style={{color: Colors.backgroundMedium}}>
                we will send 4 digits code to your email.
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <CustomInput
                placeholder="Enter your Email"
                password
                autoCompleteType="Email"
                autoCapitalize="none"
                keyboardAppearance="dark"
                ref={email}
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={() => {
                  handleSubmit();
                }}
                iconName="email-check-outline"
                type="materialCommunity"
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: hp('2%'),
              }}></View>
            <View style={{width: '100%'}}>
              <CustomButton
                onPress={handleSubmit}
                loader={props.loader}
                title="Continue"
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EmailScreen;
