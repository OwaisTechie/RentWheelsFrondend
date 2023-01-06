import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  PermissionsAndroid,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking,
  AppState,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';
import {AuthContext} from '../../Context/MainContextProvider';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Images, Colors, CustomIcons} from '../../Theme';
import MapScreen from '../Map/MapScreen';
import CustomModal from '../../Components/CustomModal/CustomModal';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import CustomAlert from '../../Components/Custom_Alert/CustomAlert';
import getNearByLocation from './apiCalls/apiCalls';
import {MARKERS_DATA} from '../../Components/MapChildComponent/mapData';
import {CustomMarker} from '../../Components/MapChildComponent/CustomMarker';
import {mapStyle, mapDarkStyle} from '../../Theme/mapStyle';
// import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

import {useMap} from '../../Components/MapChildComponent/useMap';
import {ListItem} from './Bottomsheet/ListItem';
import Custom_Loader from '../../Components/Custom_Loader/Custom_Loader';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
  getAllVehicle,
  setNearByVehicle,
} from '../../Redux/auth/Reducer/vehicleReducer';
import {
  setUserAddress,
  setUserLatLong,
} from '../../Redux/auth/Reducer/AddressReducer';
import {useFocusEffect} from '@react-navigation/native';

const GoogleApikey = 'AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g'
const Home = props => {
  // const theme = useTheme();
  const placesRef = useRef();
  const dispatch = useDispatch();
  const {userMode, users} = useSelector(state => state.auth);

  
  // const [vehicles, setVehicles] = useState(useSelector(getAllVehicle));
  const sheetRef = useRef(null);
  const fall = new Animated.Value(1);
  const windowHeight = Dimensions.get('window').height;

  // const [lat, changelat] = useState(0);
  // const [long, changelong] = useState(0);
  const [latLong, setLatLong] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isLoading, setLoading] = useState(false);
  // const [isplaces,setIsPlaces] = useState(false);
  const [aState, setAppState] = useState(AppState.currentState);
  const [pickupLocation, setpickupLocation] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [openSetting, setOpenSetting] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [address, setAddress] = useState('');
  const [checkLocation, setCheckLocation] = useState(false);
  useFocusEffect(
    useCallback(() => {
      // let unmounted = false;
      // let source = axios.CancelToken.source();
      const subscription = AppState.addEventListener('change', nextAppState => {
        console.log('Next AppState is: ', nextAppState);
        setAppState(nextAppState);
      });
      fetchLocation();

      return () => {
        subscription.remove();
      };
    }, [checkLocation, modalState]),
  );
  const fetchLocation = async () => {
    const chckLocationPermission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      alert("You've access for the location");
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              let {latitude, longitude} = position.coords;
              
              setLatLong({
                latitude: latitude,
                longitude: longitude,
              });
              dispatch(
                setUserLatLong({
                  latitude: latitude,
                  longitude: longitude,
                }),
              );
              
              Geocoder.init(GoogleApikey); // use a valid API key
              Geocoder.from(latitude, longitude)
                .then(json => {
                  var addressComponent = json.results[0].formatted_address;
                  setAddress(addressComponent);
                  dispatch(setUserAddress(addressComponent));
                })
                .catch(error => console.warn(error));
            },

            error => {
              // See error code charts below.
              setCheckLocation(!checkLocation);
          
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
              showLocationDialog: true,
              forceRequestLocation: true,
            },
          );
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          fetchLocation();
        
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          setModalState(!modalState);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const onSuccess = data => {
    // setVehicles(data.vehicles);
    dispatch(setNearByVehicle(data.vehicles));
    setLoading(false);
  };

  const onFailure = err => {
    setLoading(false);
    // setIsLoading(false);
  };
  const renderItem = ({item}) => <Item title={item.title} />;

  const enableSetting = async () => {
    await Linking.openSettings();
    setModalState(!modalState);
  };
  // const {signOut} =useContext(AuthContext);
  return (
    <>
      <View style={styles.container}>
        
         {/* { */}
          {/* // address ? */}
        <MapScreen
          LocationMarker={latLong}
          
        />
        {/* // :null
        //  }        */}
      </View>
      {modalState && (
        <CustomModal
          visible={modalState}
          modalButtonText={'OPEN SETTING'}
          onPressModal={enableSetting}
          headtext={'PERMISSION REQUIRED'}
        />
      )}
    </>
    // {/* <Button
    //   onPress={() => signOut()}
    //   title="SignOut"
    //   color="#841584"
    // /> */}
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.White,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 80,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },

  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    // padding: 15,
    width: 200,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
  },
  // pinText: {
  //     color: 'white',
  //     fontWeight: 'bold',
  //     textAlign: 'center',
  //     fontSize: 20,
  //     marginBottom: 10,
  // },
  // Arrow below the bubble

  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  contentContainerStyle: {
    // flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  panelHandle: {
    width: 41,
    height: 4,
    backgroundColor: '#E1E1E1',
    borderRadius: 17,
  },
  // Character name
  name: {
    fontSize: 22,
    marginTop: 10,
  },
  // Character image
  image: {
    width: 200,
    height: 150,
    // backgroundColor:'grey'
  },
  CustomNavIcon: {
    height: hp('5%'),
    width: wp('10%'),
    marginRight: 5,
    backgroundColor: '#FAFAFA',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchBar: {
    height: hp('5%'),
    width: wp('100%'),
    backgroundColor: '#FAFAFA',
    borderRadius: 25,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Home;
