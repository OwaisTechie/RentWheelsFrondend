import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import CustomSwitch from '../../../../Components/Custom_Switch/CustomSwitch';
import {Colors} from '../../../../Theme'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CardView from 'react-native-cardview';
import BottomSheetSkelton from '../../../Map/BottomSheet/BottomSheetSkelton';
import { useFocusEffect } from '@react-navigation/native';
import { activeRentals } from '../apiCalls/apiCall';

import { CompletedBookingsItem } from './CompletedBookingsItem';

const CompletedAndOngoing = () => {
  const [switchValue, setSwitchValue] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes, setRoute] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const [onGoing, setOnGoing] = useState([]);
  const [completed, setCompleted] = useState([]);


  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      activeRentals(onSuccess, onFailure);
      // Do something when the screen is focused
      return (() => {
        setOnGoing([]);
        setCompleted([]);
        setIsLoading(false);
      });
    }, [])
   );
  

  function bookingView() {
    switch (switchValue) {
      case 1:
        return (
          <View style={{height: '100%'}}>
            {isLoading ? (
              <BottomSheetSkelton />
            )  : onGoing.length < 1 ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'black'}}>Sorry there are no Active Rentals</Text></View> : (
              <View>
                <FlatList
                  data={onGoing}
                  contentContainerStyle={styles.contentContainer}
                  refreshing={true}
                  style={{height: '95%'}}
                  keyExtractor={key => {
                    return key._id;
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <CompletedBookingsItem
                      item={item}
                      onPressElement={() => console.log('first')}
                    />
                  )}
                />
              </View>
            )}
          </View>
        );
      case 2:
        return (
          <View style={{height: '100%'}}>
            {isLoading ? (
              <BottomSheetSkelton />
            ) : completed.length < 1 ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'black'}}>Sorry there are no Completed Rentals</Text></View>  : (
              <View>
                <FlatList
                  data={completed}
                  // renderItem={({item}) => (
                  //   <TouchableOpacity
                  //     onPress={() => {
                  //       console.log(item.vehicle.registrationNumber);
                  //     }}>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.vehicle.registrationNumber}
                  //     </Text>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.renter.username}
                  //     </Text>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.renter.email}
                  //     </Text>
                  //   </TouchableOpacity>
                  // )}
                  contentContainerStyle={styles.contentContainer}
                  refreshing={true}
                  style={{height: '95%'}}
                  keyExtractor={key => {
                    return key._id;
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    console.log("ITEM ->> ",item)
                    return (
                      <CompletedBookingsItem
                      item={item}
                      onPressElement={() => console.log('first')}
                    />
                    );
                  }
                   
                  }
                />
              </View>
            )}
          </View>
        );
    }
  }

  const onSuccess = data => {
    const {
      Payload: {onGoing,completed},
    } = data;
    
    setOnGoing(onGoing);
    setCompleted(completed);
    setIsLoading(false);
  };

  const onFailure = () => {
    console.log('onFailure');
    setIsLoading(false);
  };

  return (
    <View
      style={{backgroundColor: 'white', flex: 1, paddingHorizontal: wp('2%')}}>
      {/* { */}
      {/* openCamera ? renderCamera() : */}
      <View>
        <View
          style={{
            // height: General_Styles.generalHeight / 4,
            marginVertical: hp('3%'),
            // paddingVertical:hp('5%'),
            // width: General_Styles.generalWidth,
            // backgroundColor: Colors,
            justifyContent: 'center',
          }}>
          <CustomSwitch
            selectionMode={1}
            option1="Active Rentals"
            option2="Completed Rentals"
            onSelectSwitch={e => setSwitchValue(e)}
          />

          {bookingView()}
        </View>
      </View>
    </View>

    // <TabView
    //   lazy
    //   navigationState={{ index, routes }}
    //   renderScene={SceneMap({
    //     first: FirstRoute,
    //     second: SecondRoute,
    //   })}
    //   renderLazyPlaceholder={LazyPlaceholder}
    //   onIndexChange={setIndex}
    //   initialLayout={{width: Dimensions.get('window').width}}
    //   style={styles.container}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: Colors,
  },
  Logo: {
    width: '70%',
    marginTop: 20,
    maxHeight: 200,
    maxWidth: 300,
  },
  title: {
    color: '#111111',
    fontSize: 40,
    fontWeight: 'bold',
    // alignSelf:'flex-start',
  },
  //   forgotpasstouchable:{

  //   },
  hairline: {
    backgroundColor: 'black',
    height: 1,
    width: 120,
  },
  forgotpasstitle: {
    color: '#EFB250',
  },
  memberJoinText: {
    flexDirection: 'row',
    marginTop: 15,
  },
  googleBtn: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
    // backgroundColor: "white",
  },
  input: {
    marginTop: 10,
    padding: 18,
    backgroundColor: '#F9F9F9',
    width: '90%',
    //  color: 'blue',
    borderRadius: 20,
    //  borderColor:'blue',
    //  outline: "none"
  },
  contentContainer: {
    paddingBottom: hp('3%'),
    // height:hp('100%'),
    backgroundColor: Colors.White,
  },
});

export default CompletedAndOngoing;