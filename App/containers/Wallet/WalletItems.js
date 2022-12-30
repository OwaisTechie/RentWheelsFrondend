import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const WalletItems = props => {
  console.log('PROPS ->> ', props);
  const {item} = props;
  return (
    <View style={styles.item}>
      <View style={styles.itemsText}>
        <Text>{item.name}</Text>
        <Text>PKR {item.balance}</Text>
      </View>
      <View
        style={{
            flexDirection: 'row',
          backgroundColor: 'black',
          marginTop: hp('3%'),
          padding: 10,
        //   alignItems: 'flex-start',
        //   justifyContent: 'flex-start',
        }}>
        <Text>{item.bookingId}</Text>
        <Text>{item.bookingId}</Text>
      </View>
      {/* <Text>WalletItems</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 5,
    paddingBottom: 5,
    // height: hp('50%'),
    //   width:wp('100%'),
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 8,
    padding: 10,
    //   backgroundColor:'black',
    elevation: 5,
  },
  itemsText: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor:'black',
    justifyContent: 'space-between',
    // padding:hp('2%')
  },
  // logo: {
  //   height: 100,
  //   width: 100,
  //   // backgroundColor:'black',
  //   borderRadius: 20,
  //   borderWidth: 2,
  //   borderColor: Colors.lightgrey,
  //   marginRight: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // logoImage: {
  //   // backgroundColor:'grey',
  //   borderRadius: 10,
  //   height: '80%',
  //   width: '80%',
  // },
  // title: {
  //   fontSize: 10,
  //   textAlign: 'center',
  //   fontWeight: '600',
  //   marginRight: 6,
  //   color: Colors.lightPurple,
  // },
  // direction: {
  //   fontSize: 14,
  //   fontWeight: '400',
  //   color: '#989CA5',
  // },
  // userDetail: {
  //   fontSize: 11,
  //   textAlign: 'center',
  //   fontWeight: '600',
  //   color: Colors.paleorange,
  // },
  // BookingInfo: {
  //   flexDirection: 'row',
  //   marginTop: hp('1%'),
  //   alignItems: 'center',
  // },
});

export default WalletItems;
