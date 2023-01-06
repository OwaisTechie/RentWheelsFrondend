import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Platform,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {mapStyle} from '../../Theme/mapStyle';
import {CustomMarker} from './CustomMarker';
import {useMap} from './useMap/useMap';

// import { useNavigation } from '@react-navigation/native';
import {CustomIcons, Colors, Images} from '../../Theme';

import {MARKERS_DATA} from '../../Components/MapChildComponent/mapData';
import {TopBar} from './TopBar/TopBar';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getAllVehicle} from '../../Redux/auth/Reducer/vehicleReducer';
import {getNearByLocation, getVehicle} from './BottomSheet/apiCalls/apiCalls';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BottomSheetSkelton from './BottomSheet/BottomSheetSkelton';
import {ListItem} from './BottomSheet/ListItem';
import BottomSheets, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import FilterList from './BottomSheet/FilterList';
import FilterModal from './FilterModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-number-input';
import { setUserAddress, setUserLatLong } from '../../Redux/auth/Reducer/AddressReducer';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GoogleApikey = 'AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g';
const MapScreen = props => {
  const {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handelResetInitialPosition,
  } = useMap(props);
  const {LocationMarker} = props;

  const [vehicles, setVehicles] = useState([]);


  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ['50%', '65%', '65%'], []);

  const userLatLong = useSelector(state => state?.address?.userLatLong);
  const userAddress = useSelector(state => state?.address?.userAddress);
  const userId = useSelector(state => state?.auth.users.user);

  const [isplaces, setIsPlaces] = useState(false);
  const [showfilterModal, setShowFilterModal] = useState(false);

  const [vehicleLoading, setVehicleLoading] = useState(true);
  const placesRef = useRef();


  // useFocusEffect(
  //   useCallback(() => {
  //     if (vehicles?.length < 1 && LocationMarker.latitude != 0 && LocationMarker.longitude != 0 && userId ) {
  //       console.log("userLatLong ->> ",LocationMarker)
  //       console.log("userId ->> ",userId)
  //         let payload= {
  //           ownerId:userId._id,
  //           pickupLoc : [LocationMarker.longitude,LocationMarker.latitude],
  //         }
  //         console.log("PAYLOAD ->> ",payload)
  //         // let pickupLocation = [67.0699,24.8604]
  //         setVehicleLoading(true);
  //         getNearByLocation(payload, onSuccess, onFailure);
  //     }


  //   }, [LocationMarker,userId])
  // );

  useEffect(() => {
    // navigation.addListener('focus', () => {
      if (vehicles?.length < 1 && LocationMarker.latitude != 0 && LocationMarker.longitude != 0 && userId ) {
        console.log("userId" ,userId)
          let payload= {
            ownerId:userId._id,
            pickupLoc : [LocationMarker.longitude,LocationMarker.latitude],
          }
          setVehicleLoading(true);
          getNearByLocation(payload, onSuccess, onFailure);
      }
    // });
    
    
  }, [LocationMarker,userId]);

  const onSuccess = data => {
    console.log("DATA ->> ",data);
    setVehicleLoading(false);
    setVehicles(data.data);
  };

  const onFilterSuccess = payload => {
    setVehicleLoading(false);
    setVehicles(payload.data);
    // dispatch(setNearByVehicle(data.vehicles));
    // setLoading(false);
  };

  const onFailure = () => {
    setVehicleLoading(false);
  };

  const fall = new Animated.Value(1);

  // function propsAreEqual(prevprops, nextProps) {
  //   return JSON.stringify(prevprops) === JSON.stringify(nextProps);
  // }

  // callbacks
  const handleRefresh = () => {
    console.log("USER ->> ",userId)
    let payload= {
      ownerId:userId._id,
      pickupLoc : [LocationMarker.longitude,LocationMarker.latitude],
    }
    console.log("PAYLOAD ->> ",payload)
    // let location = [LocationMarker.latitude, LocationMarker.longitude];
    // let pickupLocation = [24.954179757526536, 67.14250599750613];
    setVehicles([]);
    setVehicleLoading(true);
    getNearByLocation(payload, onSuccess, onFailure);
  };

  const applyFilter = filterData => {
    
    setVehicleLoading(true);
    setShowFilterModal(false);
    setVehicles([]);
    const payload = {
      ...filterData,
      pickupLocation: userLatLong,
    };
    console.log("PAYLOAD ->> ",payload);
    getVehicle(payload, onFilterSuccess, onFailure);
    // setShowFilterModal(!showfilterModal)
    // setCount(current => current + num);
  };

  const changeFilter = () => {
    setShowFilterModal(!showfilterModal);

    // const payload = {
    //   startPrice: 20,
    //   endPrice: 70,
    // };

    // getVehicle(payload, onSuccessVehicle, onFailure);
  };

  const onSuccessVehicle = data => {
    
    console.log('onSuccessVehicle ->> ', data);
  };

  // const keyExtractor = useCallback((item)=>{item => item.id},[])
  const filterChange = useCallback(item => {
    console.log('item?.vehicleType ->> ', item);
    setSelectedId(item.id);
    setFilters({
      ...filters,
      vehicleType: item?.vehicleType,
    });
  }, []);
  return (
    <View style={styles.container}>
      {/* <TopBar onPressElement={handelResetInitialPosition} /> */}

      <View
        style={{
          zIndex: 1,
          top: 20,
          left: 0,
          position: 'absolute',
          padding: 10,
          // justifyContent:'space-evenly',
          marginRight: 20,
          flexDirection: 'row',
        }}>
        <View style={styles.CustomNavIcon}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <CustomIcons
              type="evil"
              name="navicon"
              size={38}
              color={Colors.lightPurple}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', width: wp('80%')}}>
          <GooglePlacesAutocomplete
            ref={placesRef}
            placeholder="Enter Location"
            fetchDetails={true}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            textInputProps={{
              leftIcon: { type: 'font-awesome', name: 'chevron-left' },
              onChangeText: text => {
                console.log('TEXT ->> ', text);
              },
              onFocus: () => setIsPlaces(true),
              isFocused:(e) => console.log("SSS",e),
              onBlur: () => console.log('Not Focus'),
            }}
            onPress={(data, details = null) => {
              setIsPlaces(false);
              console.log('DETAILS ->> ', details.geometry.location);
              console.log('data ->> ', data.description);
              setAddress(data.description)
              let payload= {
                ownerId:userId._id,
                pickupLoc : [details.geometry.location.lng,details.geometry.lat],
              }
              console.log("PAYLOAD ->> ",payload)
              // let pickupLocation = [67.0699,24.8604]
              setVehicleLoading(true)
              getNearByLocation(payload, onSuccess, onFailure);
              // setRegion({
              // 	latitude: details.geometry.location.lat,
              // 	longitude: details.geometry.location.lng,
              // 	latitudeDelta: 0.0922,
              // 	longitudeDelta: 0.0421
              // })
            }}
            query={{
              key: GoogleApikey,
              language: 'en',
              components: 'country:PK',
              types: 'establishment',
              // location: `${region.latitude}, ${region.longitude}`
            }}
            styles={{
              // container: {
              //   width: wp('80%'),
              //   // backgroundColor: '#FAFAFA',
              // },
              listView: {
                backgroundColor: '#FAFAFA',
              },
              textInput: {
                height: 38,
                color: Colors.lightPurple,
                fontSize: 16,
                borderRadius: 15,
              },
              predefinedPlacesDescription: {
                color: 'red',
              },
            }}
            listEmptyComponent={() => (
              <View style={{flex: 1, margin: 10}}>
                <Text style={{color: Colors.lightPurple, fontSize: 15}}>
                  No results were found
                </Text>
              </View>
            )}
          />

          <View style={{position: 'absolute', right: 10, top: 5}}>
            <TouchableOpacity onPress={() => placesRef.current?.setAddressText('')}>

            <CustomIcons
              type="entypo"
              name="circle-with-cross"
              size={25}
              color={Colors.lightPurple}
            />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <MapView
        ref={mapRef}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={vehicles?.length > 0 ? false : true}
        // showsUserLocation={true}
        showsMyLocationButton={true}

        loadingIndicatorColor={Colors.lightPurple}
        style={{
          width: Dimensions.get('window').width,
          height: vehicleLoading
            ? Dimensions.get('window').height - 300
            : Dimensions.get('window').height,
        }}
        region={{
          latitude: LocationMarker?.latitude,
          longitude: LocationMarker?.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        // onReady={result => {
        //   console.log(`Distance: ${result.distance} km`);
        //   console.log(`Duration: ${result.duration} min.`);

        //   MapView.fitToCoordinates(result.coordinates, {
        //     edgePadding: {
        //       right: width / 20,
        //       bottom: height / 20,
        //       left: width / 20,
        //       top: height / 20,
        //     },
        //   });
        // }}
        mapType="standard">
        {vehicles?.length > 0 ? (
          vehicles.map((marker, index) => {
            return (
              <CustomMarker
                key={marker._id}
                id={marker._id}
                selectedMarker={selectedMarker}
                latitude={marker.pickupLocation.coordinates[0]}
                longitude={marker.pickupLocation.coordinates[1]}></CustomMarker>
            );
          })
        ):null}
        <Marker
            coordinate={{
              latitude: LocationMarker?.latitude,
              longitude: LocationMarker?.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}></Marker>
      </MapView>

      <BottomSheets
        // ref={sheetRef}

        index={1}
        snapPoints={snapPoints}
        // onChange={handleSheetChange}
      >
        {/* {vehicleLoading ? ( */}
          <View>
            <View style={styles.NearByText}>
              <Text
                style={{
                  color: Colors.lightPurple,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Vehicles Near By
              </Text>
            </View>
            <View style={styles.headerList}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.headerNearText}>
                {userAddress}
              </Text>
            </View>
            <View
              style={{
                // justifyContent: 'flex-end',
                // flexDirection: 'row',
                alignItems: 'flex-end',
                marginHorizontal: 10,
              }}>
              {/* {data.length > 0 ? ( */}
              {/* <TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => navigation.navigate('AllVehicle')}> */}
              <TouchableOpacity onPress={changeFilter}>
                {/* <TouchableOpacity onPress={() => navigation.getParent('RightDrawer').openDrawer()}> */}
                {/* <Text style={styles.headerListText}>List All</Text> */}
                <CustomIcons
                  type="ionicon"
                  name="options-sharp"
                  size={28}
                  color={Colors.lightPurple}
                />
              </TouchableOpacity>
            </View>
          </View>
        {/* ) : null} */}
        {vehicleLoading ? (
          <BottomSheetSkelton />
        ) : vehicles?.length < 1 ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'black'}}>Sorry there are no Resuls</Text></View>  : 
          <BottomSheetFlatList
            contentContainerStyle={styles.contentContainer}
            data={vehicles}
            refreshing={false}
            onRefresh={handleRefresh}
            style={{height: '95%'}}
            keyExtractor={key => {
              return key._id;
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ListItem item={item} onPressElement={handleNavigateToPoint} />
            )}></BottomSheetFlatList>
        }
      </BottomSheets>

      {showfilterModal ? (
        <FilterModal
          isVisible={showfilterModal}
          onClose={() => setShowFilterModal(false)}
          applyFilter={applyFilter}
        />
      ) : null}

      {/* {showfilterModal ? ( 
         <BottomSheets
        //   // ref={sheetRef}
        //   initialSnapIndex={0}
        //   snapPoints={['100%']}
        //   // onChange={handleSheetChange}
        // >
        //   <BottomSheetScrollView>
        //     {/* <TouchableOpacity onPress={() => setShowFilterModal(!showfilterModal)}>
        //         <Text>Remove</Text>
        //       </TouchableOpacity> 
        //     <View style={{padding: 25}}>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           justifyContent: 'space-between',
        //         }}>
        //         <Text
        //           style={{
        //             color: Colors.lightPurple,
        //             fontWeight: 'bold',
        //             fontSize: 15,
        //           }}>
        //           Filters
        //         </Text>
        //         <TouchableOpacity onPress={() => setShowFilterModal(!showfilterModal)}>
        //           <Text
        //             style={{
        //               color: Colors.paleorange,
        //               fontWeight: 'bold',
        //               fontSize: 15,
        //             }}>
        //             Clear All
        //           </Text>
        //         </TouchableOpacity>
        //       </View>
        //       <View style={{marginTop: 5}}>
        //         <Text
        //           style={{
        //             color: Colors.lightPurple,
        //             fontWeight: 'bold',
        //             fontSize: 15,
        //           }}>
        //           Body Type
        //         </Text>
        //       </View>

        //       <BottomSheetScrollView
        //         horizontal
        //         // contentContainerStyle={{backgroundColor:}}
        //         showsHorizontalScrollIndicator={false}>
        //         {BodyType.map(item => {
        //           const backgroundColor =
        //             item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        //           const color =
        //             item.id === selectedId ? Colors.paleorange : 'white';
        //           return (
        //             <FilterList
        //               key={item.id}
        //               item={item}
        //               onPress={() => filterChange(item)}
        //               backgroundColor={{backgroundColor}}
        //               borderColor={{color}}
        //             />
        //           );
        //         })}
        //       </BottomSheetScrollView>
        //       {/* <BottomSheetFlatList
        //         data={BodyType}
        //         keyExtractor={key => {
        //           return key.id;
        //         }}
        //         extraData={selectedId}
        //         horizontal
        //         renderItem={({item}) => {
        //           const backgroundColor =
        //             item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        //           const color =
        //             item.id === selectedId ? Colors.paleorange : 'white';
        //           return (
        //             <FilterList
        //               item={item}
        //               onPress={() => filterChange(item)}
        //               backgroundColor={{backgroundColor}}
        //               borderColor={{color}}
        //             />
        //           );
        //         }}
        //         showsHorizontalScrollIndicator={false}
        //       /> 
        //      <View style={{marginTop: 5}}>
        //         <Text
        //           style={{
        //             color: Colors.lightPurple,
        //             fontWeight: 'bold',
        //             fontSize: 15,
        //           }}>
        //           Fuel Type
        //         </Text>
        //       </View>
        //       <View style={{flexDirection: 'row'}}>
        //         <View>
        //           <Pressable
        //             style={({pressed}) => [
        //               {
        //                 backgroundColor: pressed ? '#FAFAFA' : 'white',
        //                 borderColor: pressed ? Colors.paleorange : 'white',
        //                 borderWidth: 2,
        //               },
        //               styles.renderProduct,
        //             ]}
        //             // onPress={}
        //           >
        //             {/* <TouchableOpacity onPress={onPress}> 
        //              <View style={[styles.renderProduct, {borderColor: borderColor.color}]}> 
        //              <View style={[styles.renderProduct]}> 
        //             <View style={{alignItems:'center'}}>
        //               <CustomIcons
        //                 color={Colors.lightPurple}
        //                 type="fa5"
        //                 name="gas-pump"
        //                 size={25}
        //               />
        //               <Text
        //                 style={{
        //                   color: Colors.darkgrey,
        //                   fontWeight: 'bold',
        //                   fontSize: 15,
        //                 }}>
        //                 Petrol
        //               </Text>
        //             </View>
        //             {/* </TouchableOpacity> 
        //           </Pressable>
        //         </View>
        //         <View>
        //           <Pressable
        //             style={({pressed}) => [
        //               {
        //                 backgroundColor: pressed ? '#FAFAFA' : 'white',
        //               },
        //             ]}
        //             onPress={() => console.log('PRESS')}>
        //             {/* <TouchableOpacity onPress={onPress}> 
 <View style={[styles.renderProduct, {borderColor: borderColor.color}]}> 
        //             <View style={styles.renderProduct}>
        //               <CustomIcons
        //                 color={Colors.lightPurple}
        //                 type="fa5"
        //                 name="gas-pump"
        //                 size={25}
        //               />
        //               <Text
        //                 style={{
        //                   color: Colors.darkgrey,
        //                   fontWeight: 'bold',
        //                   fontSize: 15,
        //                 }}>
        //                 Diesel
        //               </Text>
        //             </View>
        //             {/* </TouchableOpacity> 
        //           </Pressable>
        //         </View>
        //       </View>
        //     </View>
        //   </BottomSheetScrollView>
        // </BottomSheets>
      // ) : null}

       {/* ) : null}  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  NearByText: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  contentContainer: {
    paddingBottom: hp('3%'),
    // height:hp('100%'),
    backgroundColor: Colors.White,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },

  contentContainerStyle: {
    padding: 16,
    overflow: 'visible',
    // height:'100%',
    // flex:2,
    backgroundColor: Colors.White,
  },
  item: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 10,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.White,
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerNearText: {
    color: Colors.paleorange,
    fontWeight: '500',
    fontSize: 10,
  },
  renderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  renderProduct: {
    flexDirection: 'column',
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    // marginHorizontal: 6,
    // marginVertical: 6,
    margin: 10,
    width: 150,
    height: 100,
    elevation: 5,
  },
  CustomNavIcon: {
    height: hp('5%'),
    width: wp('10%'),
    marginRight: 5,
    backgroundColor: '#FAFAFA',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // headerListText: {
  //   color: Colors.lightPurple,
  //   fontWeight: 'bold',
  //   fontSize: 15,
  // },
  headerList: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
    paddingHorizontal: wp('5%'),
  },
  panelHandle: {
    width: 41,
    height: 4,
    backgroundColor: '#E1E1E1',
    borderRadius: 17,
  },
});
export default memo(MapScreen);
