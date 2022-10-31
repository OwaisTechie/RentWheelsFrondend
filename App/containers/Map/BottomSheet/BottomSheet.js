// import React, {
//   useEffect,
//   useState,
//   useMemo,
//   useRef,
//   useCallback,
//   forwardRef,
// } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Button,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// // import ScrollBottomSheet from 'reanimated-bottom-sheet';
// import BottomSheets, {
//   BottomSheetScrollView,
//   BottomSheetFlatList,
// } from '@gorhom/bottom-sheet';
// import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
// import {MARKERS_DATA} from '../../../Components/MapChildComponent/mapData';
// import {ListItem} from './ListItem';
// // import BottomSheetSkelton from './BottomSheetSkelton';
// import Animated from 'react-native-reanimated';
// import {Colors, CustomIcons, Images} from '../../../Theme';
// import {useNavigation} from '@react-navigation/native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import BottomSheetSkelton from './BottomSheetSkelton';
// import {useDispatch, useSelector} from 'react-redux';
// import getNearByLocation from '../../Home/apiCalls/apiCalls';
// import {setNearByVehicle} from '../../../Redux/auth/Reducer/vehicleReducer';
// const windowHeight = Dimensions.get('window').height;

// export const BottomSheet = (props) => {
//   const dispatch = useDispatch();
//   const [address, setAddress] = useState('');
//   const navigation = useNavigation();
//   const {onPressElement, vehicles} = props;
//   const snapPoints = useMemo(() => ['50%', '65%', '65%'], []);
//   // const snapFilterPoints = useMemo(() => ['90%'], []);
//   const [selectedId, setSelectedId] = useState(null);
//   // const vehicles = useSelector(state => state?.vehicles?.nearByVehicles);
//   // const [vehicles, setVehicles] = useState([]);
//   const userLatLong = useSelector(state => state?.address?.userLatLong);
//   const userAddress = useSelector(state => state?.address?.userAddress);
//   console.log('userLatLong ->> ', userLatLong);
//   console.log('vehicles ->> ',vehicles.length);
//   const [isfilter, setFilter] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [BodyType, setBodyType] = useState([
//     {
//       id: 1,
//       bodyType: 'SEDAN',
//       url: Images.SEDAN,
//     },
//     {
//       id: 2,
//       bodyType: 'COUPE',
//       url: Images.COUPE,
//     },
//     {
//       id: 3,
//       bodyType: 'SPORTSCAR',
//       url: Images.SportsCar,
//     },
//     {
//       id: 4,
//       bodyType: 'WAGON',
//       url: Images.STATIONWAGON,
//     },
//     {
//       id: 5,
//       bodyType: 'HATCHBACK',
//       url: Images.HATCHBACK,
//     },
//     {
//       id: 6,
//       bodyType: 'CONVERTIBLE',
//       url: Images.CONVERTIBLE,
//     },
//     {
//       id: 7,
//       bodyType: 'SUV',
//       url: Images.SUV,
//     },
//     {
//       id: 8,
//       bodyType: 'MINIVAN',
//       url: Images.MINIVAN,
//     },
//     {
//       id: 9,
//       bodyType: 'PICKUPTRUCK',
//       url: Images.PICKUP_TRUCK,
//     },
//   ]);
//   const [vehicleType, setVehicleType] = useState('');

//   const renderProduct = useCallback(({item, index}) => {
//     const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
//     const color = item.id === selectedId ? 'white' : 'black';
    
//     return (
//       <TouchableOpacity>
//         <View style={styles.renderProduct}>
//           <Image
//             onLoadEnd={() => setLoading(false)}
//             source={item.url}
//             style={styles.renderImage}
//             onLoadStart={() => setLoading(true)}
//           />
//           <Text
//             style={{
//               color: Colors.darkgrey,
//               fontWeight: 'bold',
//               fontSize: 15,
//             }}>
//             {item.bodyType}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   },[]);



//   const fall = new Animated.Value(1);

//   // callbacks
//   const handleRefresh = useCallback(() => {
//     console.log('handleRefresh');

//     let location = [userLatLong.latitude, userLatLong.longitude];
//     console.log('LATLONG ->> ', location);
//     let pickupLocation = [24.954179757526536, 67.14250599750613];
//     getNearByLocation(pickupLocation, onSuccess, onFailure);
//   }, []);

//   const onSuccess = data => {
//     setVehicles(data.vehicles);
//     // dispatch(setNearByVehicle(data.vehicles));
//     setLoading(false);
//   };

//   const onFailure = err => {
//     console.log('onFailure =>> ', err);
//     setLoading(false);
//     // setIsLoading(false);
//   };

//   return (
//     <>
//       <BottomSheets
//         // ref={sheetRef}

//         index={1}
//         snapPoints={snapPoints}
//         // onChange={handleSheetChange}
//       >
//         <View>
//           <View style={styles.NearByText}>
//             <Text
//               style={{
//                 color: Colors.lightPurple,
//                 fontWeight: 'bold',
//                 fontSize: 15,
//               }}>
//               Vehicles Near By
//             </Text>
//           </View>
//           <View style={styles.headerList}>
//             <Text
//               numberOfLines={1}
//               ellipsizeMode="tail"
//               style={styles.headerNearText}>
//               {userAddress}
//             </Text>
//           </View>
//           <View
//             style={{
//               // justifyContent: 'flex-end',
//               // flexDirection: 'row',
//               alignItems: 'flex-end',
//               marginHorizontal: 10,
//             }}>
//             {/* {data.length > 0 ? ( */}
//             {/* <TouchableOpacity> */}
//             {/* <TouchableOpacity onPress={() => navigation.navigate('AllVehicle')}> */}
//             <TouchableOpacity onPress={() => setFilter(!isfilter)}>
//               {/* <TouchableOpacity onPress={() => navigation.getParent('RightDrawer').openDrawer()}> */}
//               {/* <Text style={styles.headerListText}>List All</Text> */}
//               <CustomIcons
//                 type="ionicon"
//                 name="options-sharp"
//                 size={28}
//                 color={Colors.lightPurple}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         {vehicles?.length > 0 ? (
//           <BottomSheetFlatList
//             contentContainerStyle={styles.contentContainer}
//             data={vehicles}
//             refreshing={false}
//             onRefresh={handleRefresh}
//             style={{height: '95%'}}
            
//             keyExtractor={key => {
//               return key._id;
//             }}
//             showsVerticalScrollIndicator={false}
//             renderItem={({item}) => (
//               <ListItem item={item} onPressElement={onPressElement} />
//             )}></BottomSheetFlatList>
//         ) : (
//           <BottomSheetSkelton />
//         )}
//       </BottomSheets>

//       {isfilter ? (
//         <BottomSheets
//           // ref={sheetRef}

//           initialSnapIndex={0}
//           snapPoints={['90%']}
//           // onChange={handleSheetChange}
//         >
//           {/* <BottomSheetScrollView> */}
//             {/* <TouchableOpacity onPress={() => setFilter(!isfilter)}>
//               <Text>Remove</Text>
//             </TouchableOpacity> */}
//             {/* <View style={{padding: 25, backgroundColor: Colors.White}}>
//               <View
//                 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//                 <Text
//                   style={{
//                     color: Colors.lightPurple,
//                     fontWeight: 'bold',
//                     fontSize: 15,
//                   }}>
//                   Filters
//                 </Text>
//                 <TouchableOpacity onPress={() => setFilter(!isfilter)}>

//                 <Text
//                   style={{
//                     color: Colors.paleorange,
//                     fontWeight: 'bold',
//                     fontSize: 15,
//                   }}>
//                   Clear All
//                 </Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{marginVertical: 10}}>
//                 <Text
//                   style={{
//                     color: Colors.lightPurple,
//                     fontWeight: 'bold',
//                     fontSize: 15,
//                   }}>
//                   Body Type
//                 </Text>
//               </View>
//               <View> */}
//                 <BottomSheetFlatList
//                   data={BodyType}
//                   keyExtractor={(key) => key.id}
//                   // contentContainerStyle={{
//                   //   flexGrow: 1,
//                   // }}y
//                   // extraData={selectedId}
//                   initialNumToRender={2}
//                   // maxToRenderPerBatch={2}
//                   windowSize={7}
//                   horizontal
//                   renderItem={renderProduct}
//                   showsHorizontalScrollIndicator={false}
//                   bounces={false}
//                 />
//                {/* </View> 
//             </View>  */}
//           {/* </BottomSheetScrollView> */}
//         </BottomSheets>
//       ) : null}
//     </>

//     // <ScrollBottomSheet
//     // componentType="FlatList"
//     //   snapPoints={[450, 300, 100]}
//     //   // borderRadius={10}
//     //   initialSnapIndex={1}
//     //   // callbackNode={fall}
//     //   // enabledGestureInteraction={true}
//     //   renderHeader={() => (
//     //     <View>
//     //       <View style={styles.header}>
//     //         <View style={styles.panelHandle} />
//     //       </View>
//     //       <View style={styles.headerList}>
//     //         <Text style={styles.headerNearText}>Vehicles Near By</Text>
//     //         <TouchableOpacity>
//     //           <Text style={styles.headerListText}>List All</Text>
//     //         </TouchableOpacity>
//     //       </View>
//     //     </View>
//     //   )}
//     //   data={data}
//     //   keyExtractor={i => i._id}
//     //   renderContent={(item) => {
//     //     console.log("IIT",item)
//     //     return (
//     //        <ListItem  item={item} onPressElement={onPressElement} />
//     //     )
//     //   }}
//     //   contentContainerStyle={styles.contentContainerStyle}
//     // />
//   );
// }


// const styles = StyleSheet.create({
//   NearByText: {
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//   },
//   contentContainer: {
//     paddingBottom: hp('3%'),
//     backgroundColor: Colors.White,
//   },
//   itemContainer: {
//     padding: 6,
//     margin: 6,
//     backgroundColor: '#eee',
//   },

//   contentContainerStyle: {
//     padding: 16,
//     overflow: 'visible',
//     // height:'100%',
//     // flex:2,
//     backgroundColor: Colors.White,
//   },
//   item: {
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   header: {
//     alignItems: 'center',
//     backgroundColor: Colors.White,
//     paddingVertical: 20,
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//   },
//   headerNearText: {
//     color: Colors.paleorange,
//     fontWeight: '500',
//     fontSize: 10,
//   },
//   renderImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   renderProduct: {
//     flexDirection: 'column',
//     backgroundColor: Colors.White,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     borderRadius: 10,
//     // marginHorizontal: 6,
//     // marginVertical: 6,
//     margin: 10,
//     width: 150,
//     height: 100,
//     elevation: 5,
//   },
//   // headerListText: {
//   //   color: Colors.lightPurple,
//   //   fontWeight: 'bold',
//   //   fontSize: 15,
//   // },
//   headerList: {
//     flexDirection: 'row',
//     backgroundColor: Colors.White,
//     // justifyContent: 'space-between',
//     // alignItems: 'flex-end',
//     paddingHorizontal: wp('5%'),
//   },
//   panelHandle: {
//     width: 41,
//     height: 4,
//     backgroundColor: '#E1E1E1',
//     borderRadius: 17,
//   },
// });
