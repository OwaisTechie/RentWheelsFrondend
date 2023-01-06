import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, General_Styles, Images} from '../../../Theme';
import {Rating} from 'react-native-ratings';

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
      ]}>
      <View style={{width: '100%'}}>
        <View>
          {/* <View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <ImageBackground
                source={Images.profileGif}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.menProfile}
                  style={{
                    height: 50,
                    width: 60,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
              </ImageBackground>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  marginTop: 3,
                  fontSize: General_Styles.generalWidth / 15,
                }}>
                {item.user.username ? item.user.username : 'Owais'}
              </Text>
            </View>
          </View> */}
          <View style={styles.logo}>
            <ImageBackground
              source={Images.profileGif}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'contain',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Images.menProfile}
                style={{
                  height: 50,
                  width: 60,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </ImageBackground>
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  marginTop: 3,
                  color:Colors.lightPurple,
                  fontSize: General_Styles.generalWidth / 15,
                }}>
                {item?.user?.username ? item?.user?.username : 'Owais'}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.Section}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                // textAlign: 'center',
                color: Colors.lightPurple,
              }}>
              Rating :
            </Text>
            <View>
              <Rating
                type="custom"
                ratingColor={Colors.paleorange}
                // ratingBackgroundColor="#c8c7c8"]
                startingValue={item?.rating}
                readonly
                ratingCount={5}
                imageSize={15}
                // onFinishRating={this.ratingCompleted}
                style={{paddingVertical: 3}}
              />
            </View>
          </View>
        </View>
        <View style={{overflow:'scroll'}}>
          <View style={{paddingHorizontal:15,paddingBottom:5,flexDirection:'column'}}>
            <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                // overflow:'hidden',
                textAlign: 'center',
                color: Colors.Black,
              }}>
             Description 
            </Text>
            <Text
              style={{
                fontSize: 14,
                // fontWeight: '600',
                // overflow:'hidden',
                textAlign: 'justify',
                color: Colors.backgroundDark,
              }}>
              {item.text}
              
            </Text>
            </View>
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
  Section: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  item: {
    flexDirection: 'row',
    margin: 10,
    // paddingBottom: 5,
    // marginBottom: 0,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 20,
    padding: 5,

    elevation: 8,
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
  logo: {
    flexDirection: 'row',
    height: 100,
    // width: 100,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
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
