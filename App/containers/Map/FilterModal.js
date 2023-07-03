import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CustomButton from '../../Components/Custom_btn/CustomButton';
import TextIconButton from '../../Components/Custom_IconText/TextIconButton';
import TextButton from '../../Components/CutomFilterButton/TextButton';
import TwoPointSlider from '../../Components/Two_Points_Slider/TwoPointSlider';
// import Animated from 'react-native-reanimated';
import {Colors, CustomIcons, Fonts, Images} from '../../Theme';
import FilterList from './BottomSheet/FilterList';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Section = ({containerStyle, title, children}) => {
  return (
    <View
      style={{
        marginTop: Fonts.SIZES.padding,

        ...containerStyle,
      }}>
      <Text style={{...Fonts.FONTS.h3, color: Colors.lightPurple}}>
        {title}
      </Text>

      {children}
    </View>
  );
};

const screenHeight = Dimensions.get('screen').height;
const FilterModal = ({isVisible, onClose, applyFilter}) => {
  const BodyType = [
    {
      id: 1,
      vehicleType: 'SEDAN',
      url: Images.SEDAN,
    },
    {
      id: 2,
      vehicleType: 'SUV',
      url: Images.SUV,
    },

    {
      id: 3,
      vehicleType: 'SPORTSCAR',
      url: Images.SportsCar,
    },
    {
      id: 4,
      vehicleType: 'WAGON',
      url: Images.STATIONWAGON,
    },
    {
      id: 5,
      vehicleType: 'HATCHBACK',
      url: Images.HATCHBACK,
    },
    {
      id: 6,
      vehicleType: 'CONVERTIBLE',
      url: Images.CONVERTIBLE,
    },
    {
      id: 7,
      vehicleType: 'COUPE',
      url: Images.COUPE,
    },
    {
      id: 8,
      vehicleType: 'MINIVAN',
      url: Images.MINIVAN,
    },
    {
      id: 9,
      vehicleType: 'PICKUPTRUCK',
      url: Images.PICKUP_TRUCK,
    },
  ];
  const Ratings = [
    {
      id: 1,
      label: '1',
    },
    {
      id: 2,
      label: '2',
    },
    {
      id: 3,
      label: '3',
    },
    {
      id: 4,
      label: '4',
    },
    {
      id: 5,
      label: '5',
    },
  ];
  const fuelType = [
    {
      id: 1,
      label: 'Petrol',
    },
    {
      id: 2,
      label: 'Diesel',
    },
  ];
  const transmissionType = [
    {
      id: 1,
      label: 'Manual',
      isAutomatic: false,
    },
    {
      id: 2,
      label: 'Automatic',
      isAutomatic: true,
    },
  ];

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [filterView, setFilterView] = useState({
    selectedId: null,
    ratings: null,
    fuels: null,
    transmission: null,
  });

  const [filters, setFilters] = useState({
    vehicleType: '',
    ratings: '',
    fuelType: '',
    isAutomatic: false,
    // isAudio: false,
    noOfAirbags: '',
    isAircondition: true,
    priceRange: ['', ''],
  });

  const bodyTypeChange = item => {
    setFilterView({...filterView, selectedId: item.id});
    setFilters({
      ...filters,
      vehicleType: item?.vehicleType,
    });
  };
  const fuelTypeChange = item => {
    setFilterView({...filterView, fuels: item.id});
    setFilters({
      ...filters,
      fuelType: item?.label,
    });
  };
  const transmissionTypeChange = item => {
    setFilterView({...filterView, transmission: item.id});
    setFilters({
      ...filters,
      isAutomatic: item?.isAutomatic,
    });
  };
  const ratingChange = item => {
    setFilterView({...filterView, ratings: item.id});
    setFilters({
      ...filters,
      ratings: item?.label,
    });
  };

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Fonts.SIZES.height, Fonts.SIZES.height - 680],
  });

  const clearAll = () => {
    setFilterView({
      selectedId: null,
      ratings: null,
      fuels: null,
      transmission: null,
    });
    // setShowFilterModal(!showFilterModal);
  };
  const FilterSubmit = () => {
    applyFilter(filters);
    setShowFilterModal(!showFilterModal);
  };

  // function renderBodyType() {
  //   return (

  //   );
  // }
  // function renderFuelType() {
  //   return (

  //   );
  // }
  // function renderTransmissionType() {
  //   return (

  //   );
  // }
  // function renderPricingRange() {
  //   return (

  //   );
  // }
  // function renderRatings() {
  //   return (

  //   );
  // }

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: Colors.transparent}}>
        {/* Transparent backgroundColor */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />

          {/* </View> */}
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: Fonts.SIZES.padding - 10,
            borderTopRightRadius: Fonts.SIZES.padding,
            borderTopLeftRadius: Fonts.SIZES.padding,
            backgroundColor: Colors.White,
          }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.lightPurple,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Filters
            </Text>
            <TouchableOpacity onPress={clearAll}>
              <Text
                style={{
                  color: Colors.paleorange,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp('20%')}}>
            {/* BodyType */}

            <Section title="Body Type">
              <FlatList
                data={BodyType}
                keyExtractor={key => {
                  return key.id;
                }}
                extraData={filterView.selectedId}
                horizontal
                renderItem={({item}) => {
                  const backgroundColor = Colors.White;
                  const color =
                    item.id === filterView.selectedId
                      ? Colors.lightPurple
                      : 'white';
                  return (
                    <FilterList
                      item={item}
                      onPress={() => bodyTypeChange(item)}
                      // backgroundColor={{backgroundColor}}
                      borderColor={{color}}
                    />
                  );
                }}
                showsHorizontalScrollIndicator={false}
              />
            </Section>

            {/* Fuel Type */}

            <Section title="Fuel Type">
              <View style={{flexDirection: 'row'}}>
                {fuelType.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={`FuelType-${index}`}
                      style={[
                        {
                          backgroundColor: 'white',
                          borderColor:
                            item.id == filterView.fuels
                              ? Colors.lightPurple
                              : 'white',
                          borderWidth: 3,
                        },
                        styles.renderProduct,
                      ]}
                      onPress={() => fuelTypeChange(item)}>
                      <View style={{alignItems: 'center'}}>
                        <CustomIcons
                          color={Colors.paleorange}
                          type="fa5"
                          name="gas-pump"
                          size={25}
                        />
                        <Text
                          style={{
                            color: Colors.darkgrey,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Section>

            {/* Price Range */}

            <Section title="Price Range">
              <View style={{alignItems: 'center'}}>
                <TwoPointSlider
                  values={[800,4000]}
                  min={1}
                  max={10000}
                  prefix="Rs."
                  postfix=""
                  onValueChange={values =>
                    setFilters({...filters, priceRange: values})
                  }
                />
              </View>
            </Section>

            {/* Transmission Type */}

            <Section title="Transmission Type">
              <View style={{flexDirection: 'row'}}>
                {transmissionType.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={`TransmissionType-${index}`}
                      style={[
                        {
                          backgroundColor: 'white',
                          borderColor:
                            item.id == filterView.transmission
                              ? Colors.lightPurple
                              : 'white',
                          borderWidth: 3,
                        },
                        styles.containerTransmissionType,
                      ]}
                      onPress={() => transmissionTypeChange(item)}>
                      <View style={styles.transmissionType}>
                        {item.id == filterView.transmission ? (
                          <CustomIcons
                            color={Colors.paleorange}
                            type="ionicon"
                            name="ios-checkmark-done-circle-sharp"
                            size={25}
                          />
                        ) : (
                          <CustomIcons
                            color={Colors.paleorange}
                            type="materialCommunity"
                            name="refresh-auto"
                            size={25}
                          />
                        )}

                        <Text
                          style={{
                            color: Colors.darkgrey,
                            fontWeight: 'bold',
                            fontSize: 15,
                            margin: 5,
                          }}>
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Section>

            {/* Ratings */}

            <Section title="Ratings" containerStyle={{marginTop: 40}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {Ratings.map((item, index) => {
                  return (
                    <TextIconButton
                      key={`Ratings-${index}`}
                      containerStyle={{
                        flex: 1,
                        height: 50,
                        margin: 10,
                        alignItems: 'center',
                        borderRadius: Fonts.SIZES.base,
                        borderWidth: 3,
                        borderColor:
                          item.id == filterView.ratings
                            ? Colors.lightPurple
                            : Colors.White,
                        backgroundColor: Colors.White,
                        elevation: 5,
                      }}
                      label={item.label}
                      labelStyle={{
                        color:
                          item.id == filterView.ratings
                            ? Colors.paleorange
                            : Colors.paleorange,
                      }}
                      icon={'ios-star-sharp'}
                      iconStyle={{
                        color:
                          item.id == filterView.ratings
                            ? Colors.paleorange
                            : Colors.paleorange,
                      }}
                      type={'ionicon'}
                      onPress={() => ratingChange(item)}
                    />
                  );
                })}
              </View>
            </Section>
            
          </ScrollView>

          {/* applyFilterButton */}

          <View
            style={{
              position: 'absolute',
              // bottom: heightPercentageToDP('10%'),
              bottom: screenHeight / 10,
              left: 0,
              right: 0,
              paddingHorizontal: Fonts.SIZES.padding,
              // paddingVertical: Fonts.SIZES.radius,
              // backgroundColor: Colors.White,
            }}>
            <TextButton
              label="Apply Filters"
              buttonContainerStyle={{
                height: heightPercentageToDP('7%'),
                borderRadius: Fonts.SIZES.base,
                backgroundColor: Colors.lightPurple,
              }}
              onPress={FilterSubmit}
            />
          </View>

          {/* Features Tag */}

          {/* <View style={{marginTop: 5}}>
              <Text
                style={{
                  color: Colors.lightPurple,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Transmission Type
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#FAFAFA' : 'white',
                      borderColor: pressed ? Colors.paleorange : 'white',
                      borderWidth: 2,
                    },
                    styles.containerTransmissionType,
                  ]}
                  // onPress={}
                >
                  {/* <TouchableOpacity onPress={onPress}> 
                     <View style={[styles.renderProduct, {borderColor: borderColor.color}]}> 
                     <View style={[styles.renderProduct]}>  */}
          {/* <View style={styles.transmissionType}>
                    <CustomIcons
                      color={Colors.lightPurple}
                      type="fa5"
                      name="gas-pump"
                      size={25}
                    />
                    <Text
                      style={{
                        color: Colors.darkgrey,
                        fontWeight: 'bold',
                        fontSize: 15,
                        margin: 5,
                      }}>
                      Audio
                    </Text>
                  </View> */}
          {/* </TouchableOpacity>  */}
          {/* </Pressable>
              </View>
              <View>
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#FAFAFA' : 'white',
                      borderColor: pressed ? Colors.paleorange : 'white',
                      borderWidth: 2,
                    },
                    styles.containerTransmissionType,
                  ]}
                  // onPress={}
                >
                  {/* {/* <TouchableOpacity onPress={onPress}>  */}
          {/* <View style={[styles.renderProduct, {borderColor: borderColor.color}]}>   */}
          {/* <View style={styles.transmissionType}>
                    <CustomIcons
                      color={Colors.lightPurple}
                      type="fa5"
                      name="gas-pump"
                      size={25}
                    />
                    <Text
                      style={{
                        color: Colors.darkgrey,
                        fontWeight: 'bold',
                        fontSize: 15,
                        margin: 5,
                      }}>
                      Automatic
                    </Text>
                  </View> */}
          {/* </TouchableOpacity>  */}
          {/* </Pressable> */}
          {/* </View> */}
          {/* </View>
            </View> */}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  renderProduct: {
    flexDirection: 'column',
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    // marginHorizontal: 6,
    // marginVertical: 6,
    margin: 10,
    width: 150,
    height: 100,
    elevation: 5,
  },
  transmissionType: {alignItems: 'center', flexDirection: 'row'},
  containerTransmissionType: {
    flexDirection: 'column',
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    borderRadius: 10,
    // marginHorizontal: 6,
    // marginVertical: 6,
    margin: 10,
    width: 130,
    height: 50,
    elevation: 5,
  },
});
