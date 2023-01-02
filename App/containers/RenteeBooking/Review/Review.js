import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, General_Styles, Images} from '../../../Theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {Rating} from 'react-native-ratings';
import CustomInput from '../../../Components/CustomTextField/CustomInput';
import CustomButton from '../../../Components/Custom_btn/CustomButton';
import { addReview } from '../apiCalls/apiCall';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const Review = props => {
  const {navigation, route} = props;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loader, setLoader] = useState(false);
  const vehicleId = route.params.vehicleId;
  // const []
  const info = {
    name: 'Owais',
    phone: '+923472913440',
    email: 'raffaykahn65@gmail.com',
    address: 'R-20 Bagh-e-Malir',
    gender: 'male',
  };
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRating(rating);
  };
  const onSkip = () => {
    navigation.navigate('HomeNavigator');
  };

  const handleSubmit = () => {
    const Payload = {
      text: review,
      rating: rating,
    };
    console.log('PAYLOAD ->> ', Payload);
    addReview(Payload,vehicleId,onSuccess, onFailure)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rating and reviews</Text>
      </View>

      <View>
        <View
          style={{
            height: General_Styles.generalHeight / 5,
            width: General_Styles.generalWidth,
            marginVertical:hp('2%'),
            // marginBottom:General_Styles.generalWidth-,
            // backgroundColor: Colors,
            justifyContent: 'center',
          }}>
          <ImageBackground
            source={Images.profileGif}
            style={{
              height: General_Styles.generalHeight / 6,
              width: General_Styles.generalHeight / 6,
              resizeMode: 'contain',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                info.gender != 'men' ? Images.menProfile : Images.womenProfile
              }
              style={{
                height: General_Styles.generalHeight / 10,
                width: General_Styles.generalHeight / 10,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </ImageBackground>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              marginTop: 10,
              color:Colors.lightPurple,
              fontSize: General_Styles.generalWidth / 15,
            }}>
            {info.name}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.item}>
          <View>
            <Text style={styles.ratingText}>How was the Journey?</Text>
          </View>
          <View>
            <Rating
              type="custom"
              ratingColor={Colors.paleorange}
              startingValue={rating}
              fractions
              ratingCount={5}
              imageSize={30}
              onSwipeRating={ratingCompleted}
              style={{paddingVertical: 10}}
            />
          </View>
          <View>
            <Text style={{textAlign: 'center', fontSize: wp('4%')}}>
              Please Share Your Opinion
            </Text>
            <Text style={{textAlign: 'center', fontSize: wp('4%')}}>
              about the Vehicle
            </Text>
          </View>
          
        </View>
        <View style={styles.Description}>
            <CustomInput
              placeholder="Leave a Comment"
              // iconName="account-key-outline"
              // type="materialCommunity"
              label="Leave a Comment"
              returnKeyType="next"
              returnKeyLabel="next"
              // ref={description}
              editable={true}
              multiline={true}
              numberOfLines={4}
              maxLength={200}
              value={review}
              // onFocus={() => {
              //   handleError(null, 'description');
              // }}
              // onBlur={handleBlur('description')}
              // error={errors.description}
              // touched={touched.description}
              onChangeText={text => setReview(text)}
              keyboardAppearance="dark"
              // returnKeyType='next'
              // returnKeyLabel='next'
            />
          </View>
        <View style={styles.Skip}>
          <TouchableOpacity onPress={onSkip}>

          
          <View style={styles.SkipMiddle}> 

          <Text style={styles.SkipText}>Skip</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <CustomButton
            loader={loader}
            onPress={handleSubmit}
            title="Leave a review"
          />
        </View>
      </ScrollView>
    </View>
  );
};
const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = Colors.lightPurple;

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const iconScanColor = Colors.lightPurple;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // height: '100%',
    backgroundColor: Colors.backgroundLight,
    position: 'relative',
  },
  Skip:{
    alignItems:'flex-end',
    
    // borderRadius:
    paddingHorizontal:wp('10%'),
    paddingVertical:wp('2%')
  },
  SkipMiddle:{
    backgroundColor:Colors.White,
    padding:5,
    paddingHorizontal:8,
    borderRadius:8,
  },
  SkipText:{
    color:Colors.paleorange,
    fontSize:hp('2%')

  },
  button: {width: wp('100%'),
  justifyContent:'center', 
  alignItems:'center',
  paddingHorizontal:wp('10%'),
  // marginVertical: hp('25%'),
},
  item: {
    // flexDirection: 'row',
    // margin: 5,
    // marginBottom:20,
    // paddingBottom: 5,
    height: hp('20%'),
    // width:wp('10%'),
    // marginVertical: hp('2%'),
    alignItems: 'center',
    // justifyContent: 'flex-start',
    borderRadius: 7,
    padding: 10,
    backgroundColor: Colors.White,
    elevation: 8,
  },
  ratingText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.lightPurple,
    fontSize: hp('3%'),
  },
  Description: {
    marginTop: hp('2%'),
    padding: 10,
  },
  header: {
    width: '100%',
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightPurple,
    justifyContent: 'center',
    // paddingTop: 16,
  },
  headerText: {
    color: Colors.White,
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
});

export default Review;
