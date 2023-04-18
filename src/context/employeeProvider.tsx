import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type EmployeeContextprops = {
  token: string;
  setToken: Function;
};

export const EmployeeContext = createContext<EmployeeContextprops>({
    token: '',
    setToken: () => {}
})

const EmployeeProvider = ({ children }: {children: ReactNode}) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    (async () => {
        const beforeToken = await AsyncStorage.getItem('@data_employee')
        if(beforeToken) setToken(beforeToken);
    })()
  }, [])

  useEffect(() => {
    (async () => {
        await AsyncStorage.setItem('@data_employee', token)
    })()
  }, [token])

  return (
    <EmployeeContext.Provider value={{ token, setToken }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
