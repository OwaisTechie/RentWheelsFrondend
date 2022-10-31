import React, {useState, forwardRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Images, CustomIcons} from '../../Theme';
// import MaskInput from 'react-native-mask-input';
// import TextInputMask from 'react-native-text-input-mask';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CustomInput = forwardRef(
  (
    {
      label,
      iconName,
      type,
      error,
      password,
      value,
      onChangeText,
      Styles,
      autoCorrect = false,
      touched,
      onPress,
      onFocus = () => {},
      ...props
    },
    ref,
  ) => {
    // let masked = props.masked;
    // console.log("MASKED ",masked)
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    // console.log("TOUCH ==>",touched)
    const validationColor = !touched
      ? '#05375a'
      : error
      ? '#FF5A5F'
      : '#223e4b';

    return (
      <View style={{marginBottom: 10}}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <TouchableOpacity onPress={onPress}>
          <View style={styles.inputContainer}>
            <CustomIcons
              name={iconName}
              type={type}
              style={{fontSize: 22, color: validationColor, marginRight: 10}}
            />
            <TextInput
              secureTextEntry={hidePassword}
              autoCorrect={autoCorrect}
              ref={ref}
              value={value}
              onFocus={onFocus()}
              onChangeText={onChangeText}
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
              style={{flex: 1, color: Colors.Black}}
              {...props}
            />
            {password && (
              <Icon
                onPress={() => setHidePassword(!hidePassword)}
                name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                style={{fontSize: 22, color: validationColor}}
              />
            )}
          </View>
        </TouchableOpacity>
        {error && (
          <Text
            style={{
              color: '#FF5A5F',
              fontSize: 12,
              paddingTop: hp('1%'),
              marginHorizontal: wp('3%'),
            }}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  label: {
    marginVertical: 3,
    fontSize: 16,
    color: '#05375a',
    // color:Colors.grey,
  },
  inputContainer: {
    height: 60,
    backgroundColor: Colors.White,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
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

export default CustomInput;
