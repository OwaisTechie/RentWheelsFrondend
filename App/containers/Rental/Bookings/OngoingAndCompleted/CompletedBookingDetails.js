import React, {useState, useLayoutEffect, useRef} from 'react';
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
  Button,
  Alert,
} from 'react-native';
// import {COLOURS, Items} from '../database/Database';
import {Colors, CustomIcons} from '../../../Theme';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocalHost} from '../../../Constant/ConvertLocalHost';
import {Rating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import CustomButton from '../../../Components/Custom_btn/CustomButton';
import {getVehicleById} from '../../Redux/auth/Reducer/vehicleReducer';
import {
  setCarAddress,
  setCarLatLong,
} from '../../../Redux/auth/Reducer/AddressReducer';
import moment from 'moment';
import {approveRejectBooking, startRental} from './apiCalls/apiCall';
import ModalPoup from '../../../Components/CustomModal/ModalPopup';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from 'react-native-animatable';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const CompletedBookingDetails = props => {
  const {navigation, route} = props;

  const camera = useRef(null);
  const [Isactive, setIsActive] = useState(false);

  const [loader, setLoader] = useState(false);
  const [isQrScanner, setQrScanner] = useState(false);
  const [isQrLoader, setQrLoader] = useState(false);
  const [Destination, setDestination] = useState('');
  const Bookings = route?.params;
  const Vehicle = Bookings.BookingInfo.vehicle;
  const rentee = Bookings.BookingInfo.rentee;
  const dispatch = useDispatch();
  // const getVehicle = useSelector(getVehicleById(VehicleId));
  var location = Vehicle?.pickupLocation?.coordinates;
  console.log('LOCATION ->> ', location);
  const markerAddress = useSelector(state => state.address.userAddress);

  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  const startScan = () => {
    console.log('first');
    setIsActive(!Isactive);
  };

  const [Specification, setSpecification] = useState({
    isAutomatic: Vehicle?.isAutomatic,
    isAircondition: Vehicle?.isAircondition,
    noOfDoors: Vehicle?.noOfDoors,
    noOfSeats: Vehicle?.noOfSeats,
    fuelType: Vehicle?.fuelType,
  });

  useLayoutEffect(() => {
    // dispatch(
    //   setCarLatLong({
    //     latitude: location[1],
    //     longitude: location[0],
    //   }),
    // );
    Geocoder.init('AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g'); // use a valid API key
    Geocoder.from(location[0], location[1])
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('ADDRESS ->> ', addressComponent);
        // dispatch(setCarAddress(addressComponent));
        setDestination(addressComponent);
      })
      .catch(error => console.log('ERR ->>', error));
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

  // const handleSubmit = () => {
  //   // navigation.navigate('DateAndLocation', {
  //   //   vehicleId: Vehicle._id,
  //   // });
  // };

  const approveBooking = () => {
    var Payload = {
      bookingID: Bookings.BookingInfo._id,
      approve: 'true',
    };
    setLoader(!loader);
    approveRejectBooking(Payload, onApproveSuccess, onApproveFailure);
  };

  const onApproveSuccess = data => {
    const {Payload} = data;
    console.log('Approve PAyload ->> ', Payload);
    setLoader(!loader);
    navigation.goBack();
  };

  const onApproveFailure = () => {
    console.log('onFailure');
    setLoader(!loader);
  };

  const rejectBooking = () => {
    var Payload = {
      bookingID: Bookings.BookingInfo._id,
      approve: 'false',
    };
    setLoader(!loader);
    approveRejectBooking(Payload, onRejectSucces, onRejectFailure);
  };

  const onRejectSucces = data => {
    const {Payload} = data;
    console.log('Approve PAyload ->> ', Payload);
    setLoader(!loader);
    navigation.goBack();
  };

  const onRejectFailure = () => {
    console.log('onFailure');
    setLoader(!loader);
  };

  const startBooking = () => {
    console.log('startBooking');
    setQrScanner(true);
  };

  const onQrScan = e => {
    console.log('SCAN CODE ->> ', e.data);
    // let Payload = {
    //   bookingID: Bookings.BookingInfo._id,
    //   startCode: e.data,
    // };
    let Payload = {
      bookingID: "638f4df043b053cdd8969921",
      startCode: "18688",
    };
    setQrLoader(true);
    startRental(Payload, onRentalSuccess, onRentalFailure);
  };

  const onRentalSuccess = data => {
    const {Payload} = data;
    console.log('Approve PAyload ->> ', Payload);
    setQrLoader(false);
    setQrScanner(false);
    navigation.goBack();
  };

  const onRentalFailure = () => {
    console.log('onFailure');
    setQrLoader(false);
    setQrScanner(false);
  };

  const onMapView = () => {
    navigation.navigate({
      name: 'BookingDetailseMap',
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
      {isQrScanner ? (
        <QRCodeScanner
          showMarker
          reactivateTimeout={4}
          onRead={onQrScan}
          reactivate={Isactive}
          // bottomContent={()}
          cameraStyle={{height: SCREEN_HEIGHT}}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    padding: 20,
                    width: wp('100%'),
                  }}>
                  <TouchableOpacity onPress={() => setQrScanner(false)}>
                    <CustomIcons
                      type="ionicon"
                      name="close-circle-sharp"
                      size={50}
                      color={Colors.White}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={{fontSize: 30, color: 'white'}}>
                  Scan Booking Start Code
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                  <CustomIcons
                    type="ionicon"
                    name="ios-scan-sharp"
                    size={SCREEN_WIDTH * 0.6}
                    color={iconScanColor}
                  />
                  {isQrLoader ? (
                    <ActivityIndicator
                      style={styles.activityIndicator}
                      animating={loading}
                      size="large"
                    />
                  ) : (
                    <Animatable.View
                      style={styles.scanBar}
                      direction="alternate-reverse"
                      iterationCount="infinite"
                      duration={1700}
                      easing="linear"
                      animation={makeSlideOutTranslation(
                        'translateY',
                        SCREEN_WIDTH * -0.5,
                      )}
                    />
                  )}
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>
              <View style={styles.bottomOverlay} />
              <View style={{position: 'absolute', bottom: 12}}>
                <Button title="Reactivate" onPress={startScan} />
              </View>
            </View>
          }
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              flex: 1,
              backgroundColor: Colors.backgroundLight,
            }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
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
                Booking Details
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
                margin: 2,
              }}>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', marginVertical: 3}}>
                  <Text style={styles.title}>Start Time : </Text>
                  <Text style={styles.titleInfo}>
                    {' '}
                    {`${moment(new Date(Bookings.BookingInfo.startTime))
                      .format('YYYY-MM-DD')
                      .toString()}`}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 3}}>
                  <Text style={styles.title}>End Time : </Text>
                  <Text style={styles.titleInfo}>{`${moment(
                    new Date(Bookings.BookingInfo.endTime),
                  )
                    .format('YYYY-MM-DD')
                    .toString()}`}</Text>
                </View>
              </View>

              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', marginVertical: 3}}>
                  <Text style={styles.title}>Total Amount:</Text>
                  <Text style={styles.titleInfo}>
                    {' '}
                    {Bookings.BookingInfo.totalAmount}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 3}}>
                  <Text style={styles.title}>Booking Status :</Text>
                  <Text style={styles.titleInfo}>
                    {' '}
                    {Bookings.BookingInfo.rentalStatus == '0'
                      ? 'Pending'
                      : Bookings.BookingInfo.rentalStatus == '1'
                      ? 'Approve'
                      : Bookings.BookingInfo.rentalStatus == '2'
                      ? 'Rejected'
                      : null}
                  </Text>
                </View>
                {/* <View>
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
              </View> */}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // width:wp('100%'),
                justifyContent: 'space-between',
                margin: 2,
              }}>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', marginVertical: 3}}>
                  <Text style={styles.title}>Cnic: </Text>
                  <Text style={styles.titleInfo}>12345-6789101-2</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 3}}>
                  <Text style={styles.title}>Registration No.: </Text>
                  <Text style={styles.titleInfo}>
                    {Vehicle.registrationNumber}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', marginVertical: 3}}>
                  <Text style={styles.title}>User Name : </Text>
                  <Text style={styles.titleInfo}>{rentee.username}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 3}}>
                  <Text style={styles.title}>Phone No. : </Text>
                  <Text style={styles.titleInfo}>{rentee.phone}</Text>
                </View>
                {/* <View>
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
              </View> */}
              </View>
            </View>

            <View style={{marginVertical: 5}}>
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
              <View
                style={{
                  marginVertical: wp('5%'),
                }}>
                {Bookings.BookingInfo.rentalStatus == '0' ? (
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={{width: wp('42%')}}>
                      <CustomButton
                        onPress={approveBooking}
                        loader={loader}
                        title={'Approve Booking'}
                      />
                    </View>
                    <View style={{width: wp('42%')}}>
                      <CustomButton
                        onPress={rejectBooking}
                        loader={loader}
                        title={'Reject Booking'}
                      />
                    </View>
                  </View>
                ) : Bookings.BookingInfo.rentalStatus == '1' ? (
                  <CustomButton
                    onPress={startBooking}
                    loader={loader}
                    title={'Start Booking'}
                  />
                ) : null}
                {/* {Bookings.BookingInfo.rentalStatus == '0'
                    ? <CustomButton onPress={handleSubmit} title={'Accept Booking'} /> : Bookings.BookingInfo.rentalStatus == '1' ? <CustomButton onPress={handleSubmit} title={'Start Booking'} /> :null} */}

                {/* // ? 'Accept Booking'
                    // : Bookings.BookingInfo.rentalStatus == '1'
                    // ? 'Approve'
                    // : Bookings.BookingInfo.rentalStatus == '2'
                    // ? 'Rejected' */}
                {/* // : null} />
                    // : Bookings.BookingInfo.rentalStatus == '1'
                    // ? 'Approve'
                    // : Bookings.BookingInfo.rentalStatus == '2'
                    // ? 'Rejected' */}
                {/* // : null} */}
                {/* <CustomButton onPress={handleSubmit} title={Bookings.BookingInfo.rentalStatus == '0'
                    ? 'Accept Booking'
                    : Bookings.BookingInfo.rentalStatus == '1'
                    ? 'Approve'
                    : Bookings.BookingInfo.rentalStatus == '2'
                    ? 'Rejected'
                    : null} /> */}
              </View>
            </View>
          </View>
        </ScrollView>
      )}

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

      {/* <ModalPoup visible={isQrScanner} onClose={onCloseModal}>
<QRCodeScanner
      showMarker
      reactivateTimeout={4}
      onRead={onSuccess}
      reactivate={Isactive}
      // bottomContent={()}
      cameraStyle={{height: SCREEN_HEIGHT}}
      customMarker={
        <View style={styles.rectangleContainer}>
          <View style={styles.topOverlay}>
            <Text style={{fontSize: 30, color: 'white'}}>QR CODE SCANNER</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.leftAndRightOverlay} />

            <View style={styles.rectangle}>
              <CustomIcons
                type="ionicon"
                name="ios-scan-sharp"
                size={SCREEN_WIDTH * 0.6}
                color={iconScanColor}
              />
              <Animatable.View
                style={styles.scanBar}
                direction="alternate-reverse"
                iterationCount="infinite"
                duration={1700}
                easing="linear"
                animation={makeSlideOutTranslation(
                  'translateY',
                  SCREEN_WIDTH * -0.5,
                )}
              />
            </View>

            <View style={styles.leftAndRightOverlay} />
          </View>
          <View style={styles.bottomOverlay} />
          <View style={{position:'absolute',bottom:12}}>
             <Button title="Reactivate" onPress={startScan} />
          </View>

        </View>
      }
    />
      </ModalPoup> */}
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
    // height: '100%',
    backgroundColor: Colors.backgroundLight,
    position: 'relative',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightPurple,
  },
  titleInfo: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'justify',
    color: Colors.paleorange,
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

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,

    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});

export default CompletedBookingDetails;
