import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { Images } from '../../../Theme';

export function RefreshButton({ onPressElement }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#FAFAFA' : 'white',
        },
        styles.container,
      ]}
      onPress={onPressElement}
    >
      <Image source={Images.refresh} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: 36,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '70%',
    width: '70%',
  },
});