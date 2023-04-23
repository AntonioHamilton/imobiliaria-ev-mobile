import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Funcionario } from "../types/apiTypes";

export type UserContextprops = {
  getUser: Function;
  defineUser: Function;
  user: any,
};

export const UserContext = createContext<UserContextprops>({
  user: null,
  getUser: () => {},
  defineUser: () => {}
})

const UserProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState({
    data: {},
    isEmployee: false,
  });

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('@data_user')
    if(userData) {
      const parsedData = JSON.parse(userData)
      setUser({data: parsedData.data, isEmployee: parsedData.isEmployee });
    }
  }

  useEffect(() => {
    getUser()
  }, [])
      
  const defineUser = async (user: Funcionario, isEmployee: boolean) => {
    setUser({data: user, isEmployee});
    await AsyncStorage.setItem('@data_user', JSON.stringify({data: user, isEmployee}))
  }

  return (
    <UserContext.Provider value={{ getUser, defineUser, user}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
