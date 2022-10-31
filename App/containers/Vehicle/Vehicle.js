import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getAllVehicles, getAllCategories} from './apiCalls/apiCalls';
import {Container, Header, Icon, Item, Input} from 'native-base';
import CategoryFilter from './CategoryFilter';
import {Colors, CustomIcons} from '../../Theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import VehicleList from './VehicleList';
import {ListItem} from '../Map/BottomSheet/ListItem';
import { useDispatch } from 'react-redux';
import { setNearByVehicle } from '../../Redux/auth/Reducer/vehicleReducer';
var {height} = Dimensions.get('window');
// import {setVehicle} from '../../Redux/auth/Reducer/vehicleReducer';
const Vehicle = () => {
  const [vehicles, setvehicles] = useState([]);
  const [vehiclesFiltered, setVehiclesFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [vehiclesCtg, setvehiclesCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Vehicle
      let payload = {
        noOfSeats: 4,
        noOfDoors: 2,
      };
      getAllVehicles(payload, onSuccess, onFailure);
      getAllCategories(onCategorySuccess, onCategoryFailure);
      //   axios
      //     .get(`${baseURL}products`)
      //     .then((res) => {
      //       setProducts(res.data);
      //       setProductsFiltered(res.data);
      //       setProductsCtg(res.data);
      //       setInitialState(res.data);
      //       setLoading(false)
      //     })
      //     .catch((error) => {
      //       console.log('Api call error')
      //     })

      // Categories
      //   axios
      //     .get(`${baseURL}categories`)
      //     .then((res) => {
      //       setCategories(res.data)
      //     })
      //     .catch((error) => {
      //       console.log('Api call error')
      //     })

      return () => {
        
        setvehicles([]);
        setVehiclesFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, []),
  );

  // Product Methods
  const searchProduct = text => {
    setProductsFiltered(
      products.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const onSuccess = response => {
    setvehicles(response.data);
    setVehiclesFiltered(response.data);
    setvehiclesCtg(response.data);
    setInitialState(response.data);
    setLoading(false);
  };
  const onFailure = () => {
    console.log('onFailure =>> ');
  };
  const onCategorySuccess = response => {
    setCategories(response);
    setCategories(response);
  };
  const onCategoryFailure = () => {
    console.log('onCategoryFailure =>> ');
  };
  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = ctg => {
    {
      ctg === 'all'
        ? [setvehiclesCtg(initialState), setActive(true)]
        : [
            setvehiclesCtg(
              products.filter(i => i.category._id === ctg),
              setActive(true),
            ),
          ];
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={Colors.backgroundLight}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <View style={styles.NavIcons}>
          <View style={styles.CustomNavIcon}>
            <TouchableOpacity>
              <CustomIcons
                type="evil"
                name="navicon"
                size={22}
                color={Colors.lightPurple}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.CustomNavIcon}>
            <TouchableOpacity>
              <CustomIcons
                type="ionicon"
                name="md-logo-whatsapp"
                size={22}
                color={Colors.lightPurple}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <CategoryFilter
          categories={categories}
          categoryFilter={changeCtg}
          productsCtg={vehiclesCtg}
          active={active}
          setActive={setActive}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
          {vehiclesCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {vehiclesCtg.map(item => {
                return <ListItem item={item} />;
              })}
            </View>
          ) : (
            <View style={[styles.center, {height: height / 2 + 100}]}>
              <Text>No products found</Text>
            </View>
          )}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // input: {
  //   // borderWidth: 1,
  //   // back: 'blue'
  // },
  header: {},
  Container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.header_background,
  },
  CustomNavIcon: {
    height: 36,
    width: 36,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    marginHorizontal: wp('3%'),
    marginVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  NavIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listContainer: {
    // // height: height,
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // flexWrap: 'wrap',
    // paddingBottom: hp('3%'),
    // overflow:'hidden'
    paddingBottom: hp('3%'),
    backgroundColor: Colors.White,
    // padding:10
    // backgroundColor: 'gainsboro',
  },
});

export default Vehicle;
