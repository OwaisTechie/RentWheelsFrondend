import React from 'react';
import {Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const VehicleRegistration = () => {

  const handleSubmit = () =>{
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      console.log(images);
    });
  }


  return (
    <View style={{flex:1}}>
      <View style={{width:'100%'}}>
                <CustomButton onPress={handleSubmit} title="Login" />
              </View>
    </View>
  );
};

export default VehicleRegistration;
