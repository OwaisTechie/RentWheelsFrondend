import * as React from 'react';
import {View, LogBox} from 'react-native';
import Toast from 'react-native-toast-message';
import Route from './App/Navigators/StackNavigator/MainNavigator/index';
// import {Provider} from 'react-redux';
// import store from './App/Redux/Store/Store';
// import Custom_Loader from './App/Components/Custom_Loader/Custom_Loader';
// import CustomAlert from './App/Components/Custom_Alert/CustomAlert';
// import GlobalAlert from './App/Components/GlobalAlert/GlobalAlert';
import store from './App/Redux/store/store';
import {Provider} from 'react-redux';
import Custom_Loader from './App/Components/Custom_Loader/Custom_Loader';
import { NativeBaseProvider } from 'native-base';
LogBox.ignoreAllLogs(true);
const App = props => {
  return (
    <Provider store={store}>
          
        <Route />
        <Toast />
        <Custom_Loader />
        
        {/* <AuthContextProvider> */}
        {/* // <GlobalAlert /> */}
        {/* </AuthContextProvider> */}
      </Provider>
  );
};

export default App;
