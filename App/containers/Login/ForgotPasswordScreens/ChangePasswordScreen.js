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

const ChangePasswordScreen = props => {
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be 6 or more characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .min(6, 'Password must be 6 or more characters long')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {password: '', confirmPassword: ''},
      onSubmit: payload => {
        props.changePasswordHandler(payload);
      },
    });
  return (
    <View>
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
                  Reset Password
                </Text>
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={{color: Colors.backgroundMedium}}>
                  Set the new password for your account so you can login and
                  access all the featurs
                </Text>
              </View>

              <View style={{marginVertical: 10}}>
                <CustomInput
                  placeholder="Enter your Password"
                  password
                  // autoCompleteType="Email"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  ref={password}
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onSubmitEditing={() => {
                    handleSubmit();
                  }}
                  iconName="lock-outline"
                  type="material"
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                />
                <CustomInput
                  placeholder="Enter your Confirm Password"
                  password
                  // autoCompleteType="Email"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  ref={confirmPassword}
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onSubmitEditing={handleSubmit}
                  iconName="lock-outline"
                  type="material"
                  label="Confirm Password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
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
                  title="Reset Password"
                />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
