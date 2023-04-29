import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native"
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import Card from '../../components/Card';
import { Funcionario } from '../../types/apiTypes';
import { api } from '../../api/api';
import Loading from '../../components/Loading';
import EmployeeCard from '../../components/EmployeeCard';

const Employees = () =>  {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [employees, setEmployees] = useState<Funcionario[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const getEmployees = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get('/funcionarios')
      setEmployees(data);
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false);    
  }

  useFocusEffect(useCallback(() => {
    getEmployees()
  },[]))

  return (
    <ScrollView>
      { !isLoading &&
        <View style={{ 
          marginVertical: 20, 
          marginHorizontal: 16, 
          alignItems: "center", 
          flex: 1, 
          marginTop: 40 
        }}>
          <Title>FUNCIONÁRIOS</Title>
          <Button onPress={() => nav.navigate('RegisterEmployee')}>
            Cadastrar Funcionário
          </Button>
          {employees.map((employee: Funcionario) => (
            <EmployeeCard
              key={employee.id}
              name={employee?.nome}
              email={employee?.email}
              onPress={() => nav.navigate("EmployeeDetail", {id: employee.id, isOnlyOne: employees.length === 1})}
            />
          ))}
        </View>
      }
      {isLoading && <Loading/>}
    </ScrollView>
  )
}
export default Employees