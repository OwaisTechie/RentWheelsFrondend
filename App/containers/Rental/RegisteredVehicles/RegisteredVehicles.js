import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import CustomButton from '../../../Components/Custom_btn/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {Colors, CustomIcons} from '../../../Theme';
import {ScrollView} from 'react-native-gesture-handler';
import CustomDropdown from '../../../Components/CustomDropdown/CustomDropdown';
import DropDownPicker from 'react-native-dropdown-picker';
const RegisteredVehicles = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [uri, setUri] = React.useState(
    'https://reactnative.dev/img/tiny_logo.png',
  );
  const [images, setImages] = useState([]);

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
    requestExternalWritePermission();
  }, []);

  const clearImages = () => {
    setImages([]);
  };
  const checkImages = () => {
    console.log('IMAGES ->> ', images);
  };

  const openImageLibrary = () => {
    console.log('first');
    // ImagePicker({
    //   multiple: true,
    //   mediaType: 'photo',
    //   maxFiles: `4`,
    //   showsSelectedCount: true,
    // }).then(imgs => {
    //   if (imgs.length <= 4) {
    //     setImages([...images, ...imgs]);
    //   } else {
    //     setImages([...images]);
    //     ToastAndroid.show('Maximum of 4 images allowed', ToastAndroid.SHORT);
    //   }
    // });
    ImagePicker.openPicker({
      multiple: true,
      compressImageQuality: 0.5,
      maxFiles: `4`,
      mediaType: 'photo',
      showsSelectedCount: true,
    }).then(async imgs => {
      const result = [];
      if (imgs.length <= 4) {
        for await (const image of imgs) {
          console.log('IMAGE ->> ', image);
          const img = await ImagePicker.openCropper({
            mediaType: 'photo',
            path: image.path,

            cropping: true,
          });

          setImages([...images, img]);
          result.push(img.path);
        }
      } else {
        setImages([...images]);
        ToastAndroid.show('Maximum of 4 images allowed', ToastAndroid.SHORT);
      }

      console.log('Result ->> ', result);
      return result;
    });

    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    //   // multiple: true,
    //   maxFiles: `4`,
    //   showsSelectedCount: true,
    // }).then(imgs => {
    //   console.log("first",imgs.path)
    //   // if (imgs.length <= 4) {
    //   //   setImages([...images, ...imgs]);
    //   // } else {
    //   //   setImages([...images]);
    //   //   ToastAndroid.show('Maximum of 4 images allowed', ToastAndroid.SHORT);
    //   // }
    // });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.lightPurple}
        barStyle="light-content"
      />
      <ScrollView nestedScrollEnabled={true}>
        <View style={{flex: 1, alignItems: 'center', margin: 10}}>
          <View>
            <Text>Vehicle Registration</Text>
          </View>
          <DropDownPicker
            placeholder="Vehicle Type"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="SCROLLVIEW"
          />
        </View>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text>Photo Upload</Text>
            <Text>Photos  · 0 / 10 - You can add up to 20 photos.</Text>
          </View>
          
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={openImageLibrary} style={{borderRadius:20,borderWidth:1,height:200,width:'90%',borderColor:Colors.backgroundMedium}}>

            {/* <View > */}
            <View style={{flex:1,alignItems: 'center',justifyContent:'center'}}>
            <CustomIcons
                    type="material"
                    name="add-a-photo"
                    size={50}
                    color={Colors.lightPurple}
                  />
            <Text>Add Photos</Text>
            {/* </View> */}
            </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <TouchableOpacity onPress={pickPicture}>
          <Image
            style={styles.avatar}
            source={uri ? {uri} : 'https://reactnative.dev/img/tiny_logo.png'}
          />
        </TouchableOpacity> */}
        {images.length > 0 &&
          images.map(image => (
            <View key={image.path}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                }}
                source={{uri: image.path}}
              />
            </View>
          ))}
        <CustomButton title={'Select'} onPress={openImageLibrary} />
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
});
export default RegisteredVehicles;
