// import React, {useState} from 'react';
// import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {Colors} from '../../../Theme';
// // import {TabView, SceneMap} from 'react-native-tab-view';

// const FirstRoute = () => (
//   <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
// );

// const SecondRoute = () => (
//   <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
// );

// // This is our placeholder component for the tabs
// // This will be rendered when a tab isn't loaded yet
// // You could also customize it to render different content depending on the route
// const LazyPlaceholder = ({route}) => (
//     <View style={styles.scene}>
//       <Text>Loading {route.title}…</Text>
//     </View>
//   );
// const bookings = () => {
//   const [index, setIndex] = useState(0);
//   const [routes, setRoute] = useState([
//     {key: 'first', title: 'First'},
//     {key: 'second', title: 'Second'},
//   ]);

  

//   const _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
//   const _handleIndexChange = index => this.setState({index});

//   return (
//     <TabView
//       lazy
//       navigationState={{ index, routes }}
//       renderScene={SceneMap({
//         first: FirstRoute,
//         second: SecondRoute,
//       })}
//       renderLazyPlaceholder={LazyPlaceholder}
//       onIndexChange={setIndex}
//       initialLayout={{width: Dimensions.get('window').width}}
//       style={styles.container}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//     // backgroundColor: Colors,
//   },
//   Logo: {
//     width: '70%',
//     marginTop: 20,
//     maxHeight: 200,
//     maxWidth: 300,
//   },
//   title: {
//     color: '#111111',
//     fontSize: 40,
//     fontWeight: 'bold',
//     // alignSelf:'flex-start',
//   },
//   //   forgotpasstouchable:{

//   //   },
//   hairline: {
//     backgroundColor: 'black',
//     height: 1,
//     width: 120,
//   },
//   forgotpasstitle: {
//     color: '#EFB250',
//   },
//   memberJoinText: {
//     flexDirection: 'row',
//     marginTop: 15,
//   },
//   googleBtn: {
//     flexDirection: 'row',
//     marginTop: 20,
//     padding: 20,
//     width: '90%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: '#EEEEEE',
//     borderRadius: 20,
//     backgroundColor: '#F9F9F9',
//     // backgroundColor: "white",
//   },
//   input: {
//     marginTop: 10,
//     padding: 18,
//     backgroundColor: '#F9F9F9',
//     width: '90%',
//     //  color: 'blue',
//     borderRadius: 20,
//     //  borderColor:'blue',
//     //  outline: "none"
//   },
// });

// export default bookings;
