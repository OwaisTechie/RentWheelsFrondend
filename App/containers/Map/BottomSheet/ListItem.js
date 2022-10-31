import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import BottomSheetSkelton from './BottomSheetSkelton';
import CardView from 'react-native-cardview';
import {Colors, Images} from '../../../Theme';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CustomButton from '../../../Components/Custom_btn/CustomButton';
import {getLocalHost} from '../../../Constant/ConvertLocalHost';
import { useSelector } from 'react-redux';
export function ListItem(props) {
  const {item, onPressElement, address} = props;
  const navigation = useNavigation();
  const vehicleCategory = item?.vehicleCategory;
  const pickupLocation = item?.pickupLocation?.coordinates;
  const Charges = item?.withDriverCharges?.withDriverDailyCharges;
  // const userAddress = useSelector(state => state.address.userAddress);
  // console.log("userAddress ->> ",userAddress)
  let image = item?.images[0];
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
      onPress={() => {onPressElement ? onPressElement(item._id, pickupLocation[1], pickupLocation[0]): null}
        
      }
      >
      <View style={styles.logo}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/5d/4d/b6/5d4db6e517a689e87c4266f61d77f803.png',
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text style={styles.title}>{vehicleCategory?.brand}</Text>
          <Text style={styles.direction}>{vehicleCategory?.model}</Text>
          <Rating
            type="custom"
            ratingColor={Colors.paleorange}
            // ratingBackgroundColor="#c8c7c8"
            readonly
            ratingCount={5}
            imageSize={15}
            // onFinishRating={this.ratingCompleted}
            style={{paddingVertical: 10}}
          />
        </View>
        <View style={{width: wp('33%'), alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: Colors.paleorange,
              }}>
              Rs. {Charges}
            </Text>
            <Text style={styles.title}> /day</Text>
          </View>
          <Text style={styles.title}>{item?.noOfSeats} Seater</Text>
          <View>
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
          </View>
        </View>
      </View>
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
    margin: 10,
    paddingBottom: 5,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,

    elevation: 8,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 19,
    alignItems: 'center',
    justifyContent: 'center',
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
