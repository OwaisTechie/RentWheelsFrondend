import {View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Colors } from '../../../Theme';

const ReviewList = props => {
  console.log('PROPS ->> ', props);
  const {item} = props;
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#FAFAFA' : 'white',
        },
        styles.item,
      ]}
      // onPress={() => {
      //   onPressElement
      //     ? onPressElement(item._id, pickupLocation[1], pickupLocation[0])
      //     : null;
      // }}
      >
      {/* <View style={styles.logo}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/5d/4d/b6/5d4db6e517a689e87c4266f61d77f803.png',
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View> */}
      <View style={{flexDirection: 'row',width:'100%',justifyContent:"space-between"}}>
        <View>
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.direction}>{item?.bookingId}</Text>
          
        </View>
        <View>
          <View style={{flexDirection: 'column',width:'100%'}}>
            
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                // textAlign:'center',
                color: Colors.paleorange,
              }}>
              Rs. {item.balance}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                textAlign:'center',
                color: Colors.lightPurple,
              }}>
              {item.date}
            </Text>
          </View>
          {/* <Text style={styles.title}>{"item?.noOfSeats"} Seater</Text>
          <View>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('VehicleInfo', {
              //     vehicle: item,
              //   })
              // }
              >
              <Text style={{marginVertical: 7, color: Colors.paleorange}}>
                View Details
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // height:'100%'
    // // padding: 20,
    // justifyContent: 'center',
    // backgroundColor: 'white',
    // alignItems: 'center',
    // marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    margin: 10,
    // paddingBottom: 5,
    // marginBottom: 0,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 20,
    padding: 15,

    elevation: 8,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 19,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logoImage: {
    height: '80%',
    width: '80%',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightPurple,
  },
  direction: {
    fontSize: 14,
    fontWeight: '400',
    color: '#989CA5',
  },
});

//   return (
//     <View style={styles.item}>
//       <View style={styles.itemsText}>
//         <Text>{item.name}</Text>
//         <Text>PKR {item.balance}</Text>
//       </View>
//       <View
//         style={{
//             flexDirection: 'row',
//           backgroundColor: 'black',
//           marginTop: hp('3%'),
//           padding: 10,
//         //   alignItems: 'flex-start',
//         //   justifyContent: 'flex-start',
//         }}>
//         <Text>{item.bookingId}</Text>
//         <Text>{item.bookingId}</Text>
//       </View>
//       {/* <Text>WalletItems</Text> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     flexDirection: 'row',
//     margin: 5,
//     paddingBottom: 5,
//     // height: hp('50%'),
//     //   width:wp('100%'),
//     marginVertical: 10,
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     borderRadius: 8,
//     padding: 10,
//     //   backgroundColor:'black',
//     elevation: 5,
//   },
//   itemsText: {
//     flexDirection: 'row',
//     width: '100%',
//     // backgroundColor:'black',
//     justifyContent: 'space-between',
//     // padding:hp('2%')
//   },
//   // logo: {
//   //   height: 100,
//   //   width: 100,
//   //   // backgroundColor:'black',
//   //   borderRadius: 20,
//   //   borderWidth: 2,
//   //   borderColor: Colors.lightgrey,
//   //   marginRight: 10,
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   // },
//   // logoImage: {
//   //   // backgroundColor:'grey',
//   //   borderRadius: 10,
//   //   height: '80%',
//   //   width: '80%',
//   // },
//   // title: {
//   //   fontSize: 10,
//   //   textAlign: 'center',
//   //   fontWeight: '600',
//   //   marginRight: 6,
//   //   color: Colors.lightPurple,
//   // },
//   // direction: {
//   //   fontSize: 14,
//   //   fontWeight: '400',
//   //   color: '#989CA5',
//   // },
//   // userDetail: {
//   //   fontSize: 11,
//   //   textAlign: 'center',
//   //   fontWeight: '600',
//   //   color: Colors.paleorange,
//   // },
//   // BookingInfo: {
//   //   flexDirection: 'row',
//   //   marginTop: hp('1%'),
//   //   alignItems: 'center',
//   // },
// });

export default ReviewList;
