import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native';
import Button from '../../components/Button';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import { formatStringToDate } from '../../utils/FormatData';
import { api } from '../../api/api';
import Loading from '../../components/Loading';
import { Endereco } from '../../types/apiTypes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

const Register = () => {
  //variables
  const [loading, setLoading] = useState(false)
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [cliente, setCliente] = useState<{[key: string]: string | number | boolean | Date}>({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: '',
    telefone: "",
    email: "",
    password: ""
  });

  const [enderecoCliente, setEnderecoCliente] = useState<{[key: string]: string | number | boolean | Date}>({
    logradouro: "",
    cidade: "",
    estado: "",
    pais: "",
    cep: "",
    complemento: "",
    numero: "",
  });

  const handleChange = (type: string, value: string | number, name: string) => {
    if (type === "cliente") {
      const newData = cliente;
      newData[name] = value
      setCliente(newData)
    }
    if (type === "endereço") {
      const newData = enderecoCliente;
      newData[name] = value
      setEnderecoCliente(newData)
    }
  }

  const onSubmit = () => {
    setLoading(true);
    const nascimentoFormatted = formatStringToDate(cliente.dataNascimento as string)

    if (nascimentoFormatted.error) {
      Alert.alert('Adicione uma data de nascimento válida')
      return
    }

    api.post("/enderecos", enderecoCliente).then((result) => {
      api.post("/cliente", {...cliente, dataNascimento: nascimentoFormatted.date, enderecoId: result.data.id}).then(() => {
        Alert.alert("Usuário cadastrado com sucesso!")
        nav.navigate("LoginUser")
      }).catch(e => {
        Alert.alert("Não foi possível cadastrar o usuário")
      })
      setLoading(false);
    }).catch(e => {
      Alert.alert("Os dados do endereço são inválidos")
      setLoading(false);
    })
  }

  return (
    <ScrollView>
      {!loading && 
      <View style={styles.container}>
        <Title>
          Cadastro
        </Title>
        <Text style={styles.formTitle}>Dados do usuário</Text>
        <TextField
          label="Nome *"
          placeholder="Nome completo"
          autoCorrect={false}
          onChange={(value => handleChange('cliente', value, "nome"))}
        />
        <TextField
          label="CPF *"
          placeholder="99999999999"
          autoCorrect={false}
          keyboardType='numeric'
          onChange={(value => handleChange('cliente', value, "cpf"))}
        />
        <TextField
          label="RG *"
          placeholder="99999999"
          autoCorrect={false}
          keyboardType='numeric'
          onChange={(value => handleChange('cliente', value, "rg"))}
        />
        <TextField
          label="Data de nascimento *"
          placeholder="01/01/2001"
          autoCorrect={false}
          onChange={(value => handleChange('cliente', value, "dataNascimento"))}
        />
        <TextField
          label="Telefone *"
          placeholder="79999999999"
          autoCorrect={false}
          onChange={(value => handleChange('cliente', value, "telefone"))}
        />
        <TextField
          label="Email *"
          placeholder="usuario@gmail.com"
          autoCorrect={false}
          onChange={(value => handleChange('cliente', value, "email"))}
        />
        <TextField
          label="Senha *"
          placeholder="senha"
          secureTextEntry
          autoCorrect={false}
          onChange={(value => handleChange('cliente', value, "password"))}
        />
        <Text style={styles.formTitle}>Endereço do usuário</Text>
        <TextField
          placeholder='Av. Teste de Teste'
          label='Logradouro *'
          onChange={(value) => handleChange('endereço', value, "logradouro")}
          autoCorrect={false}
        />
        <TextField
          placeholder='Aracaju'
          label='Cidade *'
          onChange={(value) => handleChange('endereço', value, "cidade")}
          autoCorrect={false}
        />
        <TextField
          placeholder='Sergipe'
          label='Estado *'
          onChange={(value) => handleChange('endereço', value, "estado")}
          autoCorrect={false}
        />
        <TextField
          placeholder='49000-000'
          label='CEP *'
          onChange={(value) => handleChange('endereço', value, "cep")}
          autoCorrect={false}
        />
        <TextField
          placeholder='Brasil'
          label='País *'
          onChange={(value) => handleChange('endereço', value, "pais")}
          autoCorrect={false}
        />
        <TextField
          placeholder='Próximo a lojinha da esquina'
          label='Complemento (opcional)'
          onChange={(value) => handleChange('endereço', value, "complemento")}
          autoCorrect={false}
        />
        <TextField
          placeholder='99'
          label='Número *'
          onChange={(value) => handleChange('endereço', value, "numero")}
          autoCorrect={false}
        />
        <Button onPress={onSubmit}>
          Cadastrar
        </Button>
      </View>}
      {loading && <Loading/>}
    </ScrollView>
  );
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
    formTitle: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 16,
    },
});

export default Register