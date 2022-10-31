import React from 'react';
import {View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const RentalVehicle = () => {
  return (
    <View style={{paddingTop: 20, flex: 1}}>
      <GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log("GEOMETRY ->> ",details.geometry.location)
					// setRegion({
					// 	latitude: details.geometry.location.lat,
					// 	longitude: details.geometry.location.lng,
					// 	latitudeDelta: 0.0922,
					// 	longitudeDelta: 0.0421
					// })
				}}
				query={{
					key: "AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g",
					language: "en",
					components: "country:PK",
					types: "establishment",
					// location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
    </View>
  );
};

export default RentalVehicle;
