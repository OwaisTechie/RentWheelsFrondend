import React, { useRef } from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors, CustomIcons} from '../../Theme';
import { mapStyle } from '../../Theme/mapStyle';
const VehicleMap = ({navigation, route}) => {
  var LocationMarker = route.params?.LocationMarker;
  let mapRef = useRef();
  //extra code removed for brevity.
  console.log('route ->> ', route.params?.LocationMarker);
  //create a Hook to store our region data.
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const initialRegion = {
    latitude: LocationMarker[1],
    longitude: LocationMarker[0],
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 1,
          top: 33,
          left: 0,
          position: 'absolute',
          padding: 10,
        }}>
        <View style={styles.CustomNavIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomIcons
              type="ionicon"
              name="arrow-back"
              size={22}
              color={Colors.Black}
            />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <ImageBackground
              source={Images.user11}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity> */}
      </View>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
        ref={mapRef}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude:LocationMarker[1],
          longitude: LocationMarker[0],
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
        onMapReady={() => {
            mapRef.current.animateToRegion(
              {
                latitude: LocationMarker[1],
                longitude: LocationMarker[0],
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              },
              2000,
            );
          }}
        >
        
        <Marker coordinate={initialRegion} />
        {/*marker to a nearby location */}
        <Marker
          coordinate={{
            latitude: LocationMarker[1],
            longitude: LocationMarker[0],
          }}
          
        />
      </MapView>
    </View>
  );
};

//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  CustomNavIcon: {
    height: 36,
    width: 36,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VehicleMap;
