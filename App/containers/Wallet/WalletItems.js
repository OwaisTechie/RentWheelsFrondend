import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../../Theme';
import moment from 'moment';

const WalletItems = props => {
  const {item} = props;
  console.log('PROPS ->> ', props.item);
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#FAFAFA' : 'white',
        },
        styles.item,
      ]}>
      <View style={{width: '100%'}}>
        <View style={styles.Section}>
          <Text style={styles.title}>From :</Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              // textAlign:'center',
              color: Colors.paleorange,
            }}>
            {item?.fromUser?.username}
          </Text>
        </View>
        <View>
          <View style={styles.Section}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                textAlign: 'center',
                color: Colors.lightPurple,
              }}>
              Paid Amount :
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                // textAlign:'center',
                color: Colors.paleorange,
              }}>
              Rs. {item.amount}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.Section}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                textAlign: 'center',
                color: Colors.lightPurple,
              }}>
              Service Charges :
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                // textAlign:'center',
                color: Colors.paleorange,
              }}>
              Rs. {item.serviceCharges}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.Section}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                textAlign: 'center',
                color: Colors.lightPurple,
              }}>
              Date :
            </Text>

            <Text
             style={{
              fontSize: 14,
              fontWeight: '600',
              // textAlign:'center',
              color: Colors.paleorange,
            }}>
              {moment(item.transactionDate).format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.Section}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                textAlign: 'center',
                color: Colors.lightPurple,
              }}>
              Booking ID :
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                // textAlign:'center',
                color: Colors.paleorange,
              }}>
              {item.bookingId}
            </Text>
          </View>
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
  Section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
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

export default WalletItems;
