import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../../../Theme';

const FilterList = ({item, onPress, backgroundColor, borderColor}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#FAFAFA' : 'white',
        },
      ]}
      onPress={onPress}>
      {/* <TouchableOpacity onPress={onPress}> */}
      <View style={[styles.renderProduct, {borderColor: borderColor.color}]}>
        <Image
          onLoadEnd={() => setLoading(false)}
          source={item.url}
          style={styles.renderImage}
          onLoadStart={() => setLoading(true)}
        />
        <Text
          style={{
            color: Colors.darkgrey,
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          {item.vehicleType}
        </Text>
      </View>
      {/* </TouchableOpacity> */}
    </Pressable>
  );
};

export default FilterList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  NearByText: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  contentContainer: {
    paddingBottom: hp('3%'),
    // height:hp('100%'),
    backgroundColor: Colors.White,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },

  contentContainerStyle: {
    padding: 16,
    overflow: 'visible',
    // height:'100%',
    // flex:2,
    backgroundColor: Colors.White,
  },
  item: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 10,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.White,
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerNearText: {
    color: Colors.paleorange,
    fontWeight: '500',
    fontSize: 10,
  },
  renderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  renderProduct: {
    flexDirection: 'column',
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    marginHorizontal: 6,
    marginVertical: 6,
    margin: 10,
    width: 150,
    height: 100,
    elevation: 5,
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
  // headerListText: {
  //   color: Colors.lightPurple,
  //   fontWeight: 'bold',
  //   fontSize: 15,
  // },
  headerList: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
    paddingHorizontal: wp('5%'),
  },
  panelHandle: {
    width: 41,
    height: 4,
    backgroundColor: '#E1E1E1',
    borderRadius: 17,
  },
});
