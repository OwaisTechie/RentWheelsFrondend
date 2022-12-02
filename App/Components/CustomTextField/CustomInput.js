import React, {useState, forwardRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
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
      description,
      autoCorrect = false,
      touched,
      onPress,
      editable,
      multiline = false,
      maxLength,
      numberOfLines,
      onFocus = () => {},
      ...props
    },
    ref,
  ) => {

    
    const masked = '+1 ([000]) [000]-[0000]';
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    const validationColor = !touched
      ? '#05375a'
      : error
      ? '#FF5A5F'
      : '#223e4b';

    return (
      <View style={{marginBottom: 10}}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.inputContainer,{height:multiline ? 120 : 60,alignItems: multiline ? 'flex-start' : 'center'}]}>
            <CustomIcons
              name={iconName}
              type={type}
              style={{fontSize: 22, color: validationColor, marginRight: 10}}
            />
            {/* {description ? } */}
            <TextInput
              secureTextEntry={hidePassword}
              autoCorrect={autoCorrect}
              ref={ref}
              editable={editable}
              maxLength={maxLength}
              multiline={multiline}
              numberOfLines={numberOfLines}
              value={value}
              onFocus={onFocus()}
              keyboardType={props.keyboardType}
              onChangeText={onChangeText}
              render={(props) => <TextInputMask {...props} mask={masked} />}
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
              style={{color: Colors.Black,width:wp('65%')}}
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
    // height: 60,
    // padding:2,
    backgroundColor: Colors.White,
    borderRadius: 18,
    flexDirection: 'row',
    // justifyContent:'flex',
    width:'100%',
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
