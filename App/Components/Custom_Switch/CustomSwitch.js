import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Colors } from '../../Theme';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  option3,
  onSelectSwitch,
  Thirdbtn
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: '100%',
        backgroundColor: Colors.darkgrey,
        borderRadius: 10,
        borderColor: '#AD40AF',
        flexDirection: 'row',
        justifyContent: 'center',
        
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 1 ? Colors.lightPurple : Colors.darkgrey,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : Colors.lightPurple,
            fontSize: 16,
            fontFamily: 'Roboto-Medium',
          }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 2 ? Colors.lightPurple  : Colors.darkgrey,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : Colors.lightPurple,
            fontSize: 14,
            fontFamily: 'Roboto-Medium',
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
      {
        Thirdbtn && (<TouchableOpacity
          activeOpacity={1}
          onPress={() => updateSwitchData(3)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 3 ? '#AD40AF' : '#e4e4e4',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 3 ? 'white' : '#AD40AF',
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
            }}>
            {option3}
          </Text>
        </TouchableOpacity>)
      }
      
    </View>
  );
}