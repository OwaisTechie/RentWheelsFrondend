// import React, { useState } from 'react';
// import {Text, View, ScrollView, FlatList, Image, StyleSheet} from 'react-native';
// import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import Images from '../../Theme/Images';
// const FilterDrawerContent = () => {
//   console.log("Images.SEDAN ->> ",Images.SEDAN)
//   const [loading, setLoading] = useState(false);
//   const BodyType = [
//     {
//       id: 1,
//       bodyType: 'SEDAN',
//       url:Images.SEDAN
//     },
//     {
//       id: 2,
//       bodyType: 'COUPE',
//       url:Images.COUPE
//     },
//     {
//       id: 3,
//       bodyType: 'SPORTS CAR',
//       url:Images.SportsCar
//     },
//     {
//       id: 4,
//       bodyType: 'STATION WAGON',
//       url:Images.STATIONWAGON
//     },
//     {
//       id: 5,
//       bodyType: 'HATCHBACK',
//       url:Images.HATCHBACK
//     },
//     {
//       id: 6,
//       bodyType: 'CONVERTIBLE',
//       url:Images.CONVERTIBLE
//     },
//     {
//       id: 7,
//       bodyType: 'SUV',
//       url:Images.SUV
//     },
//     {
//       id: 8,
//       bodyType: 'MINIVAN',
//       url:Images.MINIVAN
//     },
//     {
//       id: 9,
//       bodyType: 'PICKUP TRUCK',
//       url:Images.PICKUP_TRUCK
//     },
//   ];
//   const [vehicleType, setVehicleType] = useState('');


//   const renderProduct = ({item, index}) => {
//     console.log('item =>> ', item);
//     console.log('index =>> ', index);
//     return (
//       <View style={styles.renderProduct}>
//         <Image
//           onLoadEnd={() => setLoading(false)}
//           source={item.url}
//           style={styles.renderImage}
//           onLoadStart={() => setLoading(true)}
//         />
//         {/* <ActivityIndicator
//           style={styles.activityIndicator}
//           animating={loading}
//           size="large"
//         /> */}
//         <Text>Hello</Text>
//       </View>
//     );
//   };

//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       style={{flex: 1, padding: 25}}>
//       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//         <Text>Filters</Text>
//         <Text>Clear All</Text>
//       </View>
//       <View style={{marginVertical: 10}}>
//         <Text>Body Type</Text>
//       </View>
//       <View style={{marginVertical: 10}}>
//       <FlatList
//             data={BodyType}
//             keyExtractor={key => {
//               return key.id;
//             }}
//             horizontal
//             renderItem={renderProduct}
//             showsHorizontalScrollIndicator={false}
//             bounces={false}
//           />
//       </View>
//     </ScrollView>
//   );
// };

// const styles= StyleSheet.create({
//   renderImage: {
//     width: '100%',
//     height: '90%',
//     resizeMode: 'contain',
//   },
//   renderProduct: {
//     width: wp('80%'),
//     height: hp('25%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })

// export default FilterDrawerContent;
