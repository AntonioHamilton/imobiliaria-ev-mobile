import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Button from '../../components/Button';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import { Picker } from '@react-native-picker/picker';

const RegisterProperty = () => {
  const [avaiability, setAvaiability] = useState('indisponivel');
  const [type, setType] = useState('casa');
  const [data, setData] = useState<{[key: string]: string | number | boolean}>({
    disponível: avaiability === "disponível" ?? false,
  });

  const handleChange = (value: string | number, name: string) => {
    const newData = data;
    newData[name] = value
    setData(newData)
  }

  return (
      <ScrollView>
        <View style={styles.container}>
          <Title>
            Cadastrar Imóvel
          </Title>
          <Text style={styles.formTitle}>Sobre o imóvel</Text>
          <Text style={styles.pickerLabel}>Disponibilidade *</Text>
          <Picker
            style={styles.picker}
            selectedValue={avaiability}
            onValueChange={(itemValue) => setAvaiability(itemValue)}
          >
            <Picker.Item label="Disponível" value="disponivel" />
            <Picker.Item label="Indisponível" value="indisponivel" />
          </Picker>
          <Text style={styles.pickerLabel}>Tipo de imóvel *</Text>
          <Picker
            style={styles.picker}
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Terreno" value="terreno" />
            <Picker.Item label="Apartamento" value="apartamento" />
          </Picker>
          <TextField
            label='Área (m²) *'
            onChange={(value) => handleChange(value, "area")}
            autoCorrect={false}
            placeholder='22 m²'
          />
          <TextField
            label='IPTU (R$) *'
            onChange={(value) => handleChange(value, "iptu")}
            autoCorrect={false}
            placeholder='1000,00 R$'
          />
          <Text style={styles.formTitle}>Informações de Endereço</Text>
          <TextField
            label='Logradouro *'
            onChange={(value) => handleChange(value, "Logradouro")}
            autoCorrect={false}
            placeholder='Logradouro'
          />
          <TextField
            label='Número *'
            onChange={(value) => handleChange(value, "Número")}
            autoCorrect={false}
            placeholder='Número'
          />
          <TextField
            label='Complemento (opcional)'
            onChange={(value) => handleChange(value, "Complemento")}
            autoCorrect={false}
            placeholder='Complemento (opcional)'
          />
           <TextField
            label='CEP *'
            onChange={(value) => handleChange(value, "CEP")}
            autoCorrect={false}
            placeholder='CEP'
          />
          <TextField
            label='Cidade *'
            onChange={(value) => handleChange(value, "Cidade")}
            autoCorrect={false}
            placeholder='Cidade'
          />
          <TextField
            label='Estado *'
            onChange={(value) => handleChange(value, "Estado")}
            autoCorrect={false}
            placeholder='Estado'
          />
          <TextField
            label='País'
            onChange={(value) => handleChange(value, "País")}
            autoCorrect={false}
            placeholder='País'
          />
          <Button
            style={{width: "80%", alignSelf: "center"}}
            //onPress={() => {}} 
          >
            Cadastrar Imóvel
          </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20, 
    marginHorizontal: 16, 
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
  picker: {
    marginBottom: 16,
    backgroundColor: "#9155fd",
    width: "100%",
    color: "white",
  },
  pickerLabel:  {
    fontSize: 18,
    fontWeight: '600',
    color: '#6c48af',
    textAlign: "left",
    marginBottom: 6
  }
});

export default RegisterProperty;