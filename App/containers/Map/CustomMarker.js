//Custom Marker
import React from 'react';
import {Marker} from 'react-native-maps';
import Animated from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';
import {useMarkerAnimation} from './UseMarkerAnimation';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors,Images} from '../../Theme';
import {Image} from 'react-native';
export function CustomMarker({id, selectedMarker, latitude, longitude}) {
  const scale = useMarkerAnimation({id, selectedMarker});
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}>
      <View style={styles.markerWrapper}>
        <Animated.View
          style={[
            styles.marker,
            {
              // backgroundColor: color,
              transform: [{scale: scale}],
            },
          ]}>
          <Ionicons name="car-connected" size={30} color={Colors.lightPurple} />
        </Animated.View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  markerWrapper: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    // height: 50,
    // width: 50,
    // borderRadius: 20,
    // borderColor: 'white',
    // borderWidth: 2,
  },
});
