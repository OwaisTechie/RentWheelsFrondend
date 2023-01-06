import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import {moderateScale} from '../utils/ResponsiveUi';
export const SKELETON_SPEED = 1500;
export const SKELETON_BG = '#dddddd';
export const SKELETON_HIGHLIGHT = '#e7e7e7';
export const MAX_RATING_DEVIATION = 200;
const {width, height} = Dimensions.get('window');

const BottomSheetSkelton = () => {
  return (
    <ScrollView
    style={{flex: 1}}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{margin:20,width:'100%'}}>
    <SkeletonPlaceholder>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <View style={{width: 120, height: 20, borderRadius: 4}} />
          <View
            style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
          />
        </View>
      </View>
      <View style={{marginTop: 10, marginBottom: 30}}>
        <View style={{width: 300, height: 20, borderRadius: 4}} />
        <View
          style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
        />
      </View>
    </SkeletonPlaceholder>
    <SkeletonPlaceholder>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <View style={{width: 120, height: 20, borderRadius: 4}} />
          <View
            style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
          />
        </View>
      </View>
      <View style={{marginTop: 10, marginBottom: 30}}>
        <View style={{width: 300, height: 20, borderRadius: 4}} />
        <View
          style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
        />
      </View>
    </SkeletonPlaceholder>
    <SkeletonPlaceholder>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <View style={{width: 120, height: 20, borderRadius: 4}} />
          <View
            style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
          />
        </View>
      </View>
      <View style={{marginTop: 10, marginBottom: 30}}>
        <View style={{width: 300, height: 20, borderRadius: 4}} />
        <View
          style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
        />
      </View>
    </SkeletonPlaceholder>
    <SkeletonPlaceholder>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <View style={{width: 120, height: 20, borderRadius: 4}} />
          <View
            style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
          />
        </View>
      </View>
      <View style={{marginTop: 10, marginBottom: 30}}>
        <View style={{width: 300, height: 20, borderRadius: 4}} />
        <View
          style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
        />
      </View>
    </SkeletonPlaceholder>
    <SkeletonPlaceholder>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <View style={{width: 120, height: 20, borderRadius: 4}} />
          <View
            style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
          />
        </View>
      </View>
      <View style={{marginTop: 10, marginBottom: 30}}>
        <View style={{width: 300, height: 20, borderRadius: 4}} />
        <View
          style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
        />
      </View>
    </SkeletonPlaceholder>
  </ScrollView>
  )
};

const styles = StyleSheet.create({
  // item: {
  //   flexDirection: 'row',
  //   padding: 15,
  //   margin: 10,
  //   paddingBottom: 5,
  //   marginBottom: 0,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 20,
  //   padding: 10,

  //   elevation: 8,
  // },
  // logo: {
  //   height: 100,
  //   width: 100,
  //   borderRadius: 50,
  //   marginRight: 19,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // logoImage: {
  //   height: '80%',
  //   width: '80%',
  // },
  // title: {
  //   fontSize: 14,
  //   fontWeight: '600',
  // },
  // direction: {
  //   fontSize: 14,
  //   fontWeight: '400',
  // },
  // skeltonImageView: {
  //   width: width / 5,
  //   // margin: moderateScale(8),
  //   borderWidth: 0,
  //   // borderRadius: moderateScale(50),
  //   height: height / 11,
  // },
  // skeltonMainView: {
  //   width: width / 1.4,
  //   // margin: moderateScale(8),
  //   borderWidth: 0,
  //   height: height / 16,
  //   // elevation: moderateScale(5),
  //   shadowOpacity: 0.6,
  //   shadowRadius: 5,
  //   shadowOffset: {height: 0, width: 0},
  //   borderRadius: 5,
  //   // height: globals.screenHeight * 0.24,
  // },
  // skeltonChangePasswordView: {
  //   width: '96%',
  //   // margin: moderateScale(8),
  //   borderWidth: 0,
  //   // borderRadius: moderateScale(5),
  //   height: height * 0.13,
  //   // elevation: moderateScale(5),
  //   shadowOpacity: 0.6,
  //   shadowRadius: 5,
  //   shadowOffset: {height: 0, width: 0},
  // },
});

export default BottomSheetSkelton;
