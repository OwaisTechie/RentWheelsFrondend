import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Colors} from '../../Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import CustomButton from '../../Components/Custom_btn/CustomButton';
const PaymentSuccess = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LottieView
          style={{
            width: wp('25%'),
            height: hp('25%'),

            // marginLeft: - 5
          }}
          resizeMode="cover"
          source={require('../../Assets/animations/PaymentSuccess.json')}
          autoPlay
          loop
        />
        <View>
          <Text style={styles.congoText}>Booking Success!</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{padding: 8}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: Colors.Black}}>
            Order Details
          </Text>
        </View>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#FAFAFA' : 'white',
            },
            styles.bookingDetailsContainer,
          ]}>
          <View style={{width: '100%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>Booking Id : </Text>
              <Text style={styles.direction}>
                {'162e165869d8d61530a35d082'}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>Date :</Text>
              <Text style={styles.direction}>
                {moment(new Date()).format('yyyy-MM-DD')}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>Date :</Text>
              <Text style={styles.direction}>
                {moment(new Date()).format('yyyy-MM-DD')}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>Date :</Text>
              <Text style={styles.direction}>
                {moment(new Date()).format('yyyy-MM-DD')}
              </Text>
            </View>
          </View>
        </Pressable>
        <View style={{padding: 8}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: Colors.Black}}>
            Payment Summary
          </Text>
        </View>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#FAFAFA' : 'white',
            },
            styles.bookingDetailsContainer,
          ]}>
          <View style={{width: '100%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>Total Amount: </Text>
              <Text style={styles.direction}>Rs. 20302</Text>
            </View>
          </View>
        </Pressable>
        <View style={{width: '100%',flexDirection:'row',justifyContent:'center',marginVertical:hp('5%')}}>

        <View style={{width:'90%'}}>
          <CustomButton
            onPress={() => handleSubmit()}
            title="Back to the Home"
          />
        </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 3,
    // backgroundColor: Colors.lightPurple
  },
  congoText: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.lightPurple,
  },
  bookingDetailsContainer: {
    flexDirection: 'row',
    margin: 10,
    // paddingBottom: 5,
    // marginBottom: 10,
    alignItems: 'center',
    // justifyContent: 'space-between',
    borderRadius: 10,
    padding: 20,

    elevation: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightPurple,
  },
  direction: {
    fontSize: 14,
    fontWeight: '400',
    // color: '#989CA5',
    color: Colors.paleorange,
  },
});

export default PaymentSuccess;
