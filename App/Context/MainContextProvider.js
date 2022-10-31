import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, createContext, useReducer,useMemo} from 'react';
import mainReducer from '../Redux/auth/Reducer';

export const AuthContext = createContext();

const initialState = {
  users: {
    isLoading: true,
    user: null,
    userToken: null,
  },
  userMode:{
    mode:'P',
    isLoading: true
  },cart: []
};

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  console.log("AuthContextProvider =>> ",state)
  const authContext = useMemo(
    () => ({
      signIn: async data => {
        if (data) {
          console.log('SignIn', data);
          try {
            await AsyncStorage.setItem('userToken', data.Token);
          } catch (e) {
            console.log('ERR ', e);
          }
        }
        let payload = {
          user: data,
          userToken: data.Token,
        };
        dispatch({type: 'LOGIN', users: payload});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log('ERR ', error);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: async () => {
        dispatch({type: 'REGISTER'});
      },
      
    }),
    [],
  );


  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useContextValue = () => useContext(AuthContext);
