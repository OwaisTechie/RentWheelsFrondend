import React from 'react';
import {View, FlatList, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Overlay} from 'react-native-elements';
const width = Dimensions.get('screen').width;
import {Colors} from '../../Theme';
import styles from './CustomModalStyle';

//visible
//headtext
//data
//onPress_item(item)

const CustomModal = props => {
  console.log('MODAL PROPS ', props);
  return (
    <Overlay
      visible={props.visible}
      overlayStyle={{width: width / 1.05, borderRadius: 15}}>
      <View style={{padding: 10}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            color: Colors.lightPurple,
          }}>
          {props.headtext}
        </Text>
        {/* <View style={{height:1,width:width/1.16,backgroundColor:Colors.primary_green}}></View> */}
        {props?.data ? (
          <FlatList
            data={props?.data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  props?.onPress_item(item.text);
                }}>
                <Text style={{margin: 3, fontSize: 15}}>{item.text}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View>
            <View>
              {props?.modalText ? (
                <Text style={{marginTop: 2, fontSize: 16, color: 'black'}}>
                  {props?.modalText}
                </Text>
              ) : (
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 16,
                    color: 'black',
                  }}>{`For the best RentWheel Experience.Please enable Permission -> Location in the application settings.>`}</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props?.onPressModal();
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: Colors.lightPurple,
                  }}>
                  {props.modalButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Overlay>
  );
};

export default CustomModal;
