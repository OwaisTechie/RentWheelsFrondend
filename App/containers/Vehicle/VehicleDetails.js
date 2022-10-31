import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
// import {COLOURS, Items} from '../database/Database';
import {Colors, CustomIcons} from '../../Theme';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocalHost} from '../../Constant/ConvertLocalHost';
import {Rating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import CustomButton from '../../Components/Custom_btn/CustomButton';
import {getVehicleById} from '../../Redux/auth/Reducer/vehicleReducer';
import { setCarAddress, setCarLatLong } from '../../Redux/auth/Reducer/AddressReducer';

const VehicleDetails = props => {
  const {navigation, route} = props;
  const [Destination, setDestination] = useState('');
  const Vehicle = route?.params.vehicle;
  const dispatch = useDispatch();
  // const getVehicle = useSelector(getVehicleById(VehicleId));
  var location = Vehicle?.pickupLocation?.coordinates;
  const markerAddress = useSelector(state => state.address.userAddress);

  const [Specification, setSpecification] = useState({
    isAutomatic: Vehicle?.isAutomatic,
    isAircondition: Vehicle?.isAircondition,
    noOfDoors: Vehicle?.noOfDoors,
    noOfSeats: Vehicle?.noOfSeats,
    fuelType: Vehicle?.fuelType,
  });

  useLayoutEffect(() => {
    dispatch(
      setCarLatLong({
        latitude: location[1],
        longitude: location[0],
      }),
    );
    // Geocoder.init('AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g'); // use a valid API key
    Geocoder.from(location[1], location[0])
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('ADDRESS ->> ', addressComponent);
        dispatch(setCarAddress(addressComponent));
        setDestination(addressComponent);
      })
      .catch(error => console.warn(error));
  }, []);

  const [vehiclesCategory, setVehiclesCategory] = useState(
    Vehicle?.vehicleCategory,
  );

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const handleSubmit = () => {
    console.log('RENT WHEELS');
  };

  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       getDataFromDB();
  //     });

  //     return unsubscribe;
  //   }, [navigation]);

  //get product data by productID

  //   const getDataFromDB = async () => {
  //     for (let index = 0; index < Items.length; index++) {
  //       if (Items[index].id == productID) {
  //         await setProduct(Items[index]);
  //         return;
  //       }
  //     }
  //   };

  //add to cart

  //   const addToCart = async id => {
  //     let itemArray = await AsyncStorage.getItem('cartItems');
  //     itemArray = JSON.parse(itemArray);
  //     if (itemArray) {
  //       let array = itemArray;
  //       array.push(id);

  //       try {
  //         await AsyncStorage.setItem('cartItems', JSON.stringify(array));
  //         ToastAndroid.show(
  //           'Item Added Successfully to cart',
  //           ToastAndroid.SHORT,
  //         );
  //         navigation.navigate('Home');
  //       } catch (error) {
  //         return error;
  //       }
  //     } else {
  //       let array = [];
  //       array.push(id);
  //       try {
  //         await AsyncStorage.setItem('cartItems', JSON.stringify(array));
  //         ToastAndroid.show(
  //           'Item Added Successfully to cart',
  //           ToastAndroid.SHORT,
  //         );
  //         navigation.navigate('Home');
  //       } catch (error) {
  //         return error;
  //       }
  //     }
  //   };

  const onMapView = () => {
    navigation.navigate({
      name: 'VehicleMap',
      params: {LocationMarker: location},
    });
  };

  //product horizontal scroll product card
  const renderProduct = ({item, index}) => {
    item = getLocalHost(item);
    console.log('IMAGE =>> ', item);
    return (
      <View style={styles.renderProduct}>
        <Image
          onLoadEnd={() => setLoading(false)}
          source={{
            uri: 'https://freepngimg.com/thumb/car/7-2-car-free-png-image.png',
          }}
          style={styles.renderImage}
          onLoadStart={() => setLoading(true)}
        />
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={loading}
          size="large"
        />
      </View>
    );
  };

  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            flex: 1,
            backgroundColor: Colors.backgroundLight,
          }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 30,
                  color: Colors.lightPurple,
                  padding: 12,
                  // backgroundColor: Colors.Black,
                  // borderRadius: 10,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                color: Colors.lightPurple,
              }}>
              Car Details
            </Text>
          </View>
          <FlatList
            data={Vehicle?.images}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View style={styles.dot}>
            {Vehicle?.images.map((data, index) => {
              let opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.2, 1, 0.2],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={index}
                  style={{
                    width: '16%',
                    height: 2.4,
                    backgroundColor: Colors.paleorange,
                    opacity,
                    marginHorizontal: 4,
                    borderRadius: 100,
                  }}></Animated.View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            // paddingHorizontal: 16,
            padding: wp('5%'),
            // marginTop: 6,
            height: hp('60%'),
            // flex:2,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: Colors.White,
          }}>
          <View
            style={{
              flexDirection: 'row',
              // width:wp('100%'),
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <View>
              <Text style={styles.title}>{vehiclesCategory?.brand}</Text>
              <Text style={styles.direction}>
                {vehiclesCategory?.model} {vehiclesCategory?.year}
              </Text>
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: Colors.paleorange,
                  }}>
                  Rs. {Vehicle?.withDriverCharges?.withDriverDailyCharges}
                </Text>
                <Text style={styles.title}> /day</Text>
              </View>
              <View>
                <Rating
                  type="custom"
                  ratingColor={Colors.paleorange}
                  // ratingBackgroundColor="#c8c7c8"
                  startingValue={3.5}
                  readonly
                  ratingCount={5}
                  imageSize={15}
                  // onFinishRating={this.ratingCompleted}
                  style={{paddingVertical: 3}}
                />
              </View>
            </View>
          </View>
          <View style={{margin: 10}}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  marginVertical: widthPercentageToDP('2%'),
                  fontWeight: 'bold',
                  color: Colors.lightPurple,
                }}>
                Car Specifications
              </Text>
            </View>
            <View>
              {/* Specification */}
              <ScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}>
                <View style={styles.Specification}>
                  <CustomIcons
                    type="materialCommunity"
                    name="seat-passenger"
                    size={22}
                    color={Colors.paleorange}
                  />
                  <Text style={styles.SpecificationText}>
                    {`${Specification.noOfSeats} Seater`}
                  </Text>
                </View>
                <View style={styles.Specification}>
                  <CustomIcons
                    type="materialCommunity"
                    name="air-conditioner"
                    size={22}
                    color={Colors.paleorange}
                  />
                  <Text style={styles.SpecificationText}>
                    {Specification.isAircondition
                      ? 'Air Condition'
                      : 'Not air Condition'}
                  </Text>
                </View>
                <View style={styles.Specification}>
                  <CustomIcons
                    type="materialCommunity"
                    name="fuel"
                    size={22}
                    color={Colors.paleorange}
                  />

                  <Text style={styles.SpecificationText}>
                    {Specification.fuelType}
                  </Text>
                </View>
                <View style={styles.Specification}>
                  <CustomIcons
                    type="materialCommunity"
                    name="refresh-auto"
                    size={22}
                    color={Colors.paleorange}
                  />
                  <Text style={styles.SpecificationText}>
                    {Specification.isAutomatic ? 'Automatic' : 'Manual'}
                  </Text>
                </View>
                <View style={styles.Specification}>
                  <CustomIcons
                    type="materialCommunity"
                    name="car-door-lock"
                    size={22}
                    color={Colors.paleorange}
                  />
                  <Text style={styles.SpecificationText}>
                    {`${Specification.noOfDoors} Doors`}
                  </Text>
                </View>
              </ScrollView>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  marginVertical: widthPercentageToDP('2%'),
                  fontWeight: 'bold',
                  color: Colors.lightPurple,
                }}>
                Car Location
              </Text>
            </View>
            <View style={styles.addressContainer}>
              <TouchableOpacity onPress={onMapView}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: 14,
                    // fontWeight: 'bold',
                    // margin:5,
                    color: Colors.paleorange,
                  }}>
                  {Destination}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: wp('5%')}}>
              <CustomButton onPress={handleSubmit} title="Rent Now" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            {product.isAvailable ? 'Add to cart' : 'Not Avialable'}
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '100%',
    backgroundColor: Colors.backgroundLight,
    position: 'relative',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightPurple,
  },
  direction: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#989CA5',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
  },
  dot: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 32,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  renderImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  renderProduct: {
    width: wp('100%'),
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleBrandText: {
    margin: 6,
  },
  Specification: {
    flexDirection: 'column',
    backgroundColor: Colors.White,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 6,
    marginVertical: 6,
    width: 110,
    height: 90,
    elevation: 3,
  },
  SpecificationText: {color: Colors.lightPurple, fontSize: 15},
  addressContainer: {
    borderRadius: 20,
    borderColor: Colors.backgroundMedium,
    borderWidth: 2,
    width: '100%',
    height: '10%',
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
});

export default VehicleDetails;
