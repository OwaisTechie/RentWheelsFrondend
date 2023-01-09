import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StatusBar, StyleSheet, Button} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {Colors, CustomIcons} from '../../Theme';
import {addBooking, getBookings} from './apiCalls/apiCalls';
import {mapStyle} from '../../Theme/mapStyle';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {extendMoment} from 'moment-range';
import DatePicker from 'react-native-date-picker';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import CustomInput from '../../Components/CustomTextField/CustomInput';

import MapViewDirections from 'react-native-maps-directions';
const GoogleApikey = 'AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g';
const DateAndLocation = props => {
  const {navigation, route} = props;
  const vehicleId=route?.params.vehicleId
  const [vehicle, setVehicle] = useState({});
  const [startOpen, setStartOpen] = useState(false);
  const [selectedStartTime, setStartTime] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);
  const [selectedEndTime, setEndTime] = useState(new Date());
  var startCalenderDate = null;
  let mapRef = useRef();
  const carLatLong = useSelector(state => state?.address?.carLatLong);
  const userLatLong = useSelector(state => state?.address?.userLatLong);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectEndDate] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [error, setErrors] = useState(false);
  const [count, setCount] = useState(0);
  const [initialDisabledDates, setInitialDisabledDates] = useState([]);
  const [disableDates, setDisableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [total, setTotal] = useState('');
  const date = useRef();
  const timeRef = useRef();
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';
  const endDate = selectedEndDate
    ? selectedEndDate.format('YYYY-MM-DD').toString()
    : '';
  const startTime = selectedStartTime
    ? moment(selectedStartTime).format('HH:mm')
    : '';
  const endTime = selectedEndTime
    ? moment(selectedEndTime).format('HH:mm')
    : '';

  const onChangeText = () => {};

  useEffect(() => {
    const vehicleId=route?.params.vehicleId
    const payload = {
      vehicleId: vehicleId,
    };
    // const payload = {
    //   vehicleId: '634e74d0d5a0a75f21179e4c',
    // };
    getBookings(payload, onSuccess, onFailure);
  }, []);

  function removeTime(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const thousandSeparator = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const hasBlockedDatesInBetweenStartAndEnd = (blockedDays, start, end) => {
    start = removeTime(new Date(start));
    end = removeTime(new Date(end));
    return blockedDays?.some(day => {
      day = removeTime(new Date(day));
      var result = start < day && day < end;
      return result;
    });
  };

  // useEffect(() => {
  //   if (selectedEndDate != null) {
  //     const start = new Date(selectedStartDate),
  //       end = new Date(selectedEndDate);

  //     if (
  //       hasBlockedDatesInBetweenStartAndEnd(disableDates, start, end) == true
  //     ) {
  //       setSelectedStartDate(selectedEndDate);
  //       // setSelectEndDate(selectedEndDate);
  //     } else {
  //       let noOfDays = days(start, end) + 1;  
  //       let totalAmount = Number(vehicle.selfDriveDailyCharges) * noOfDays;
  //       setTotal(totalAmount);
  //     }
  //   }
  // }, [selectedEndDate]);

  //calculate days
  var days = (date_1, date_2) => {
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const onSuccess = data => {
    setDisableDates(data?.data.dates);
    setVehicle(data?.data.vehicle);
    setIsLoading(true);
  };

  const onFailure = err => {
    setIsLoading(true);
  };

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectEndDate(date);
      if(date != null) {
        const start = new Date(selectedStartDate),
          end = new Date(date);
        if (
          hasBlockedDatesInBetweenStartAndEnd(disableDates, start, end) == true
        ) {
          setSelectedStartDate(date);
          // setSelectEndDate(selectedEndDate);
        } else {
          let noOfDays = days(start, end) + 1;  
          let totalAmount = Number(vehicle.selfDriveDailyCharges) * noOfDays;
          setTotal(totalAmount);
        }
      }

    } else {
      setSelectedStartDate(date);
      
    }
  };
  const onPrevious = () => {
    setSelectedStartDate(null);
    setSelectEndDate(null);
    setStartTime(new Date());
    setEndTime(new Date());
  };

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  const ScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      // flex: 1,
      height:heightPercentageToDP('100%'),
      // backgroundColor:'black',
      // justifyContent: 'center',
      // alignItems:'center',
    },
  };

  const onSubmit = () => {
    var StartTime =
      selectedStartDate ? moment(selectedStartDate).format('yyyy-MM-DD') +
      ' ' +
      moment(selectedStartTime).format('HH:mm:ss') : moment(new Date()).format('yyyy-MM-DD') +
      ' ' +
      moment(selectedStartTime).format('HH:mm:ss')
    
      
    var endTime = selectedEndDate ?
      moment(selectedEndDate).format('yyyy-MM-DD') +
      ' ' +
      moment(selectedEndTime).format('HH:mm:ss') :  moment(new Date()).format('yyyy-MM-DD') +
      ' ' +
      moment(selectedEndTime).format('HH:mm:ss')


    const payload = {
      startTime: StartTime,
      endTime: endTime,
      vehicle: vehicleId,
      total:total,
    };

    navigation.navigate('PaymentScreen', {
      booking: payload,
    });
    // addBooking(payload, onBookingSuccess, onBookingFailure);
  };


  const ProgressStepStyles = {
    activeStepIconBorderColor: Colors.lightPurple,
    labelColor: Colors.lightPurple,
    activeLabelColor: Colors.lightPurple,
    borderWidth: 2,
    marginBottom: 15,
    topOffset: 2,
    activeStepNumColor: Colors.lightPurple,
    completedStepIconColor: Colors.lightPurple,
    completedProgressBarColor: Colors.lightPurple,
    completedCheckColor: 'white',
  };
  const buttonTextStyle = {
    color: Colors.lightPurple,
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: heightPercentageToDP('3%'),
    backgroundColor: Colors.header_background,
    // position: 'relative',
    // bottom: 70,
    elevation: 3,
  };
  const SubmitTextStyle = {
    color: Colors.lightPurple,
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: heightPercentageToDP('3%'),
    elevation: 3,

  };

  const onNextStep = () => {
    
    if (isValid) {
      setActive(true);
    } else {
      setActive(false);
    }
};

const onSelectedEndDate = (e) => {
  
}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* {isLoading ? ( */}
      <View style={{flex: 1}}>
        <ProgressSteps {...ProgressStepStyles}>
          <ProgressStep
            label="Pick Up"
            onNext={onNextStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnText=">"
            nextBtnTextStyle={buttonTextStyle}
            errors={active}>
            <View style={styles.Mapcontainer}>
              <MapView
                style={styles.map}
                ref={mapRef}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                region={{
                  latitude: userLatLong?.latitude,
                  longitude: userLatLong?.longitude,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                }}
                zoomEnabled
                mapType="standard">
                {/* <Marker coordinate={initialRegion} /> */}
                {/*marker to a nearby location */}
                <Marker
                  coordinate={{
                    latitude: userLatLong?.latitude,
                    longitude: userLatLong?.longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                  }}>
                  <View>

                  <CustomIcons
                      type="entypo"
                      name="user"
                      size={38}
                      color={Colors.paleorange}
                    />

                  </View>
                </Marker>
                <Marker
                  coordinate={{
                    latitude: carLatLong?.latitude,
                    longitude: carLatLong?.longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                  }}>
                  <View>
                    <CustomIcons
                      type="materialCommunity"
                      name="car-connected"
                      size={38}
                      color={Colors.lightPurple}
                    />
                  </View>
                  {/* <CustomIcons
                  name='car-connected'
                  type='ionicon'
                  // color={Colors.lightPurple}
                  style={{fontSize: 22, color: '#05375a'}}
                /> */}
                  {/* <Ionicons
                    name="car-connected"
                    size={30}
                    color={Colors.lightPurple}
                  /> */}
                </Marker>
                <MapViewDirections
                  origin={carLatLong}
                  destination={userLatLong}
                  apikey={GoogleApikey}
                  strokeWidth={5}
                  strokeColor={Colors.lightPurple}
                />
              </MapView>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Drop Off"
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText=">"
            previousBtnText="<"
            previousBtnTextStyle={buttonTextStyle}>
            <View style={styles.Mapcontainer}>
              <MapView
                style={styles.map}
                ref={mapRef}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                region={{
                  latitude: carLatLong?.latitude,
                  longitude: carLatLong?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                zoomEnabled
                mapType="standard"
              >
              <Marker
                  coordinate={{
                    latitude: carLatLong?.latitude,
                    longitude: carLatLong?.longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                  }}>
                  <View>

                  <CustomIcons
                       type="materialCommunity"
                       name="car-connected"
                       size={38}
                       color={Colors.lightPurple}
                    />

                  </View>
                </Marker>
              {/* <Marker coordinate={initialRegion} /> */}
              {/*marker to a nearby location */}
              {/* <Marker
                  coordinate={{
                    latitude: LocationMarker[1],
                    longitude: LocationMarker[0],
                  }}
                /> */}
              </MapView>
            </View>
          </ProgressStep>
          <ProgressStep
            scrollViewProps={ScrollViewProps}
            nextBtnTextStyle={SubmitTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            nextBtnText=">"
            previousBtnText="<"
            onPrevious={onPrevious}
            errors={error}
            finishBtnText="Confirm "
            onSubmit={onSubmit}
            label="Date & Time">
            <View style={styles.Calender}>
              <CalendarPicker
                onDateChange={onDateChange}
                weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                months={[
                  'January',
                  'Febraury',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ]}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                disabledDates={disableDates}
                allowRangeSelection={true}
                previousTitle="Previous"
                nextTitle="Next"
                minDate={new Date()}
                selectedRangeStartStyle={{
                  color: Colors.lightgrey,
                }}
                selectedRangeEndStyle={{
                  color: Colors.lightgrey,
                }}
                // todayBackgroundColor="#e6ffe6"
                selectedDayColor={Colors.paleorange}
                selectedDayTextColor="#FFFFFF"
                todayBackgroundColor={Colors.paleorange}
                disabledDatesTextStyle={{
                  textDecorationLine: 'line-through',
                  color: 'red',
                }}
                scaleFactor={375}
                textStyle={{
                  fontFamily: 'Cochin',
                  color: Colors.lightPurple,
                }}
              />

              {/* <Text
                style={
                  styles.dateText
                }>{`StartDate: ${startDate} EndDate: ${endDate}`}</Text> */}
            </View>
            <View style={{marginVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <View style={{width: '40%'}}>
                  <CustomInput
                    placeholder={`${moment(new Date())
                      .format('YYYY-MM-DD')
                      .toString()}`}
                    iconName="date-range"
                    type="material"
                    label="Pick-up Date"
                    ref={date}
                    value={startDate}
                    returnKeyType="next"
                    returnKeyLabel="next"
                    // style={{width:'30%'}}

                    // onSubmitEditing={() => {
                    //   username.current?.focus();
                    // }}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    keyboardAppearance="dark"
                    editable={false}
                    selectTextOnFocus={false}
                  />
                </View>
                <View style={{width: '40%'}}>
                  <CustomInput
                    placeholder={`${moment(new Date())
                      .format('HH:mm')
                      .toString()}`}
                    iconName="ios-timer-sharp"
                    type="ionicon"
                    label="Pick-up Time"
                    // onChangeText={onChangeText}
                    ref={timeRef}
                    value={startTime}
                    onPress={() => setStartOpen(!startOpen)}
                    returnKeyType="next"
                    returnKeyLabel="next"
                    editable={false}
                    selectTextOnFocus={false}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    keyboardAppearance="dark"
                    // style={{width:'30%'}}
                    // onChangeText={handleChange('email')}
                    // onBlur={handleBlur('email')}
                    // error={errors.email}
                    // touched={touched.email}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <View style={{width: '40%'}}>
                  <CustomInput
                    placeholder={`${moment(new Date())
                      .format('YYYY-MM-DD')
                      .toString()}`}
                    iconName="date-range"
                    type="material"
                    label="Drop-off Date"
                    ref={date}
                    value={endDate}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    keyboardAppearance="dark"
                    editable={false}
                    selectTextOnFocus={false}
                  />
                </View>
                <View style={{width: '40%'}}>
                  <CustomInput
                    placeholder={`${moment(new Date())
                      .format('HH:mm')
                      .toString()}`}
                    iconName="ios-timer-sharp"
                    type="ionicon"
                    label="Drop-off Time"
                    ref={timeRef}
                    value={endTime}
                    onPress={() => setEndOpen(!endOpen)}
                    returnKeyType="next"
                    returnKeyLabel="next"
                    // onSubmitEditing={() => {
                    //   username.current?.focus();
                    // }}
                    editable={false}
                    selectTextOnFocus={false}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                  />
                </View>
              </View>
              {total? (
              <View style={{flexDirection:'row',justifyContent:'center',marginVertical:10}}>
                <Text style={{fontWeight:'bold',color:Colors.lightPurple}}>Total Amount : </Text>
                <Text style={{fontWeight:'bold',fontSize:15}} >{thousandSeparator(total)}</Text>
              </View>
              ):
              null}
            </View>

            <DatePicker
              modal
              mode="time"
              open={startOpen}
              date={selectedStartTime}
              onConfirm={date => {
                setStartOpen(false);
                setStartTime(date);
              }}
              onCancel={() => {
                setStartOpen(false);
              }}
            />
            <DatePicker
              modal
              mode="time"
              open={endOpen}
              date={selectedEndTime}
              onConfirm={date => {
                setEndOpen(false);

                setEndTime(date);
              }}
              onCancel={() => {
                setEndOpen(false);
              }}
            />
            {/* <View style={{width: '40%'}}>
                  <CustomInput
                    placeholder={`${moment(new Date())
                      .format('HH:mm')
                      .toString()}`}
                    iconName="ios-timer-sharp"
                    type="ionicon"
                    label="Drop-off Time"
                    ref={timeRef}
                    value={endTime}
                    onPress={() => setEndOpen(!endOpen)}
                    returnKeyType="next"
                    returnKeyLabel="next"
                    // onSubmitEditing={() => {
                    //   username.current?.focus();
                    // }}
                    editable={false}
                    selectTextOnFocus={false}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                  />
                </View> */}
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP('100%'),
    // backgroundColor: '#ecf0f1',
    // backgroundColor: '#ffffff',
    // padding: 8,
  },
  Calender: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 3,
    backgroundColor: '#ffffff',
    width: '100%',
    // padding: 10,
    // height: 90,
    elevation: 7,
  },
  Mapcontainer: {
    ...StyleSheet.absoluteFillObject,
    height:heightPercentageToDP('70%'), //the container will fill the whole screen.
    // justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DateAndLocation;
