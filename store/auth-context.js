import { createContext, useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");

  useEffect(()=>{
    async function fetchToken(){

      const getToken=await AsyncStorage.getItem('token');
      if(getToken){
        setAuthToken(getToken);
      }
    }
    fetchToken();
  },[])
  function getAuthenicatedToken(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token',token)
  }
  function logOut() {
    setAuthToken("");
    AsyncStorage.removeItem('token');
  }
  const values = {
    token: authToken,
    isAuthenticated: !!authToken, //converts it into truthy values,
    authenticate: getAuthenicatedToken,
    logout: logOut,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
