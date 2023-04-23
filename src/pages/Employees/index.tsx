import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native"
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import Card from '../../components/Card';
import { Funcionario } from '../../types/apiTypes';
import { api } from '../../api/api';
import Loading from '../../components/Loading';

const Employees = () =>  {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [employees, setEmployees] = useState<Funcionario[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const getEmployee = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get('/funcionarios')
      setEmployees(data);
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false);    
  }

  useEffect(() => {
    getEmployee()
  }, [])

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
            <Card key={employee.id}>
              <Text style={styles.title}>{employee?.nome}</Text>
              <Text style={styles.email}>{employee?.email}</Text>
              <Button>Detalhes</Button>
            </Card>
          ))}
        
        </View>
      }
      {isLoading && <Loading/>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 20
  },
  email: {
    color: "black",
    fontSize: 16
  }
})

export default Employees