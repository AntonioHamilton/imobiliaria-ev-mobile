import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import Button from '../../components/Button';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import { api } from '../../api/api';
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const RegisterEmployee = () => {
  const [data, setData] = useState<{[key: string]: string | number}>({})
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleChange = (value: string | number, name: string) => {
    const newData = data;
    newData[name] = value
    setData(newData)
  }

  const handleSubmit = async () => {
    try {
      await api.post(`/funcionarios`, data);
      nav.navigate('Employees')
    } catch (e) {
      Alert.alert('Aviso', 'Não foi possível cadastrar o funcionário')
    }
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Title>
        Cadastro
      </Title>
      <TextField
        label="Nome *"
        placeholder="Nome completo"
        autoCorrect={false}
        onChange={(value => handleChange(value, "nome"))}
      />
      <TextField
        label="Email *"
        placeholder="usuario@gmail.com"
        autoCorrect={false}
        onChange={(value => handleChange(value, "email"))}
      />
      <TextField
        label="Senha *"
        placeholder="senha"
        autoCorrect={false}
        onChange={(value => handleChange(value, "password"))}
        secureTextEntry
      />
      <Button
        style={{width: "80%"}}
        onPress={handleSubmit} 
      >
        Cadastrar
      </Button>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20, 
    marginHorizontal: 16, 
    alignItems: "center", 
    flex: 1,
    marginTop: 40,
    paddingBottom: 50,
  },
});


export default RegisterEmployee