import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserContextprops = {
  token: string;
  setToken: Function;
};

export const UserContext = createContext<UserContextprops>({
    token: '',
    setToken: () => {}
})

const UserProvider = ({ children }: {children: ReactNode}) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    (async () => {
        const beforeToken = await AsyncStorage.getItem('@data_user')
        if(beforeToken) setToken(beforeToken);
    })()
  }, [])

  useEffect(() => {
    (async () => {
        await AsyncStorage.setItem('@data_user', token)
    })()
  }, [token])

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
