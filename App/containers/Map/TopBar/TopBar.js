//TopBar.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from './Avatar';
import { RefreshButton } from './RefreshButton';

export function TopBar({ onPressElement }) {
  return (
    <View style={styles.container}>
      {/* <Avatar /> */}
      <RefreshButton onPressElement={onPressElement} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 30,
    // width: '100%',
    zIndex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});