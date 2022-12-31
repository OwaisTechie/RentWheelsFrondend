import { View, Text, StyleSheet,StatusBar, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors, General_Styles, Images } from '../../Theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BottomSheetSkelton from '../Map/BottomSheet/BottomSheetSkelton';
import { BookingItems } from '../Rental/Bookings/BookingItems';
import WalletItems from './WalletItems';
import moment from 'moment';

const Wallet = () => {

    const [balance,setBalance] = useState('10,000.00');
    const [isLoading,setLoading] = useState(false);
    const [transactionDetail,setTransactionDetail] = useState([
        {
            bookingId:'1',
            name:'Owais',
            balance:'123412323',
            date:moment(new Date())
            .format('YYYY-MM-DD')
        },
        {
            bookingId:'2',
            name:'Nabeegh',
            balance:'12',
            date:moment(new Date())
            .format('YYYY-MM-DD')
        },
        {
            bookingId:'3',
            name:'Muzammil',
            balance:'12345555',
            date:moment(new Date())
            .format('YYYY-MM-DD')
        },
        {
            bookingId:'3',
            name:'Muzammil',
            balance:'12345555',
            date:moment(new Date())
            .format('YYYY-MM-DD')
        },
        {
            bookingId:'3',
            name:'Muzammil',
            balance:'12345555',
            date:moment(new Date())
            .format('YYYY-MM-DD')
        },
        {
            bookingId:'3',
            name:'Muzammil',
            balance:'12345555',
            date:moment(new Date())
            .format('YYYY-MM-DD')
        },
        {
            bookingId:'3',
            name:'Muzammil',
            balance:'12345555',
            date:moment(new Date())
            .format('YYYY-MM-DD')
        },
        {
            bookingId:'3',
            name:'Muzammil',
            balance:'12345555',
            date:moment(new Date())
            .format('YYYY-MM-DD')
        },
]);
    
  return (
    <View style={styles.container}>
        <StatusBar
        backgroundColor={Colors.lightPurple}
        barStyle="light-content"
      />
      <View style={styles.backgroundImage}>
      <ImageBackground
                  source={Images.gradientBackgound}
                  imageStyle={{ borderRadius: 6}}
                  style={{
                    height: General_Styles.generalHeight / 8,
                    width: General_Styles.generalHeight / 2 - 50,
                    borderRadius:20,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    padding:8
                    // justifyContent: 'center',
                  }}>

                  <View>
                    <Text style={{fontSize:20,alignSelf:'center',color:Colors.White,marginVertical:hp('1%')}}>Available Balance</Text>
                  </View>
                  <View >
                    <Text style={{fontSize:20,alignSelf:'center',color:Colors.White}}>PKR {balance}</Text>
                  </View>
                  </ImageBackground>

      </View>
      <View style={styles.history}>
        <Text style={styles.historyText}>Payment History</Text>
      </View>
      <View style={{height: '100%'}}>
            {isLoading ? (
              <BottomSheetSkelton />
            ) : (
              <View>
                <FlatList
                  data={transactionDetail}
                  contentContainerStyle={styles.contentContainer}
                //   refreshing={true}
                  style={{height: '95%'}}
                  keyExtractor={key => {
                    return key._id;
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <WalletItems
                      item={item}
                      onPressElement={() => console.log('first')}
                    />
                  )}
                />
              </View>
            )}
          </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.backgroundLight,
      position: 'relative',
    },
    backgroundImage: {
        marginVertical:hp('2%'),
    },
    history: {
        alignItems:'center',
    },
    historyText: {
        fontSize:20,
        fontWeight:'bold',
        color:Colors.lightPurple
    },
    contentContainer: {
        paddingBottom: hp('20%'),
        // height:hp('100%'),
        // backgroundColor: Colors.White,
      },
  });

export default Wallet