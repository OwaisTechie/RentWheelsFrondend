import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import CardView from 'react-native-cardview';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useSelector} from 'react-redux';
import moment from 'moment';
import { getLocalHost } from '../../../Constant/ConvertLocalHost';
import { CustomIcons,Colors } from '../../../Theme';

export function ListOfVehiclesItems(props) {
  const {item} = props;
  const navigation = useNavigation();
  const vehicleCategory = item?.vehicleCategory;
  const pickupLocation = item?.pickupLocation?.coordinates;
  const vehicle = item?.vehicle;
  const rentee = item?.rentee;
  let image =
    'http://localhost:8000/public/images/vehicle-papers/Aventador-1670076605975-548847761.jpeg';
  // let image = 'https://www.pngall.com/wp-content/uploads/2016/07/Car-Download-PNG.png';
  // const [skeletonLoader, setskeletonLoader] = useState(true);
  image = getLocalHost(image);

  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#FAFAFA' : 'white',
        },
        styles.item,
      ]}
      onPress={() =>
        navigation.navigate('CompletedBookingDetails', {
          BookingInfo: item,
        })
      }
    >
      <View style={styles.logo}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      {/* <View style={{flexDirection: 'row'}}> */}
      <View style={{width: wp('55%')}}>
        <View style={styles.BookingInfo}>
          <Text style={styles.title}>Username:</Text>
          <Text style={[styles.userDetail, {fontSize: 12}]}>
            {rentee.username}
          </Text>
        </View>
        <View style={styles.BookingInfo}>
          <Text style={styles.title}>Number:</Text>
          <Text style={[styles.userDetail, {fontSize: 12}]}>
            {rentee.phone}
          </Text>
        </View>
        <View style={styles.BookingInfo}>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.userDetail}>{rentee.email}</Text>
        </View>
        <View style={styles.BookingInfo}>
          <Text style={styles.title}>Booking Start Time:</Text>
          <Text style={styles.userDetail}>
            {`${moment(new Date(item.startTime))
              .format('YYYY-MM-DD')
              .toString()}`}
          </Text>
        </View>
        <View style={styles.BookingInfo}>
          <Text style={styles.title}>Booking End Time:</Text>
          <Text style={styles.userDetail}>
            {`${moment(new Date(item.endTime))
              .format('YYYY-MM-DD')
              .toString()}`}
          </Text>
        </View>
        <View style={styles.BookingInfo}>
          <Text style={styles.title}>Booking Status :</Text>
          <Text style={styles.userDetail}>
           {item.rentalStatus == "4" ? "Active Bookings " : item.rentalStatus == "5" ? "Completed Bookings" : null}
          </Text>
        </View>
        <View
            style={{
              marginTop:5,
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
          <Text style={styles.title}>Total Amount:</Text>
          <Text style={styles.userDetail}>{item.totalAmount}</Text>
          
          <View style={{marginLeft: 'auto', padding: 2}}>
            <CustomIcons
              color={Colors.lightPurple}
              type="ionicon"
              name="arrow-forward-circle"
              size={40}
            />
          </View>
        </View>
        {/* <View>
            <TouchableOpacity
            onPress={() =>
              navigation.navigate('VehicleInfo', {
                vehicle: item,
              })
            }
            >
              <Text style={{marginVertical: 7, color: Colors.paleorange}}>
                View Details
              </Text>
            </TouchableOpacity>
          </View> */}
      </View>
      {/* </View> */}
    </Pressable>
  );
}

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
    margin: 5,
    paddingBottom: 5,
    // height:hp('50%'),
    // width:wp('6%'),
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 8,
    padding: 10,
    // backgroundColor:'black',
    elevation: 5,
  },
  logo: {
    height: 100,
    width: 100,
    // backgroundColor:'black',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.lightgrey,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    // backgroundColor:'grey',
    borderRadius: 10,
    height: '80%',
    width: '80%',
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
    marginRight: 6,
    color: Colors.lightPurple,
  },
  direction: {
    fontSize: 14,
    fontWeight: '400',
    color: '#989CA5',
  },
  userDetail: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.paleorange,
  },
  BookingInfo: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    alignItems: 'center',
  },
});
