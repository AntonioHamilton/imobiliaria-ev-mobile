import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import Title from '../../components/Title';
import TextField from '../../components/TextField';

const Employees = () => {
  const [data, setData] = useState<{[key: string]: string | number}>({

  })

  const handleChange = (value: string | number, name: string) => {
    const newData = data;
    newData[name] = value
    setData(newData)
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
        onChange={(value => handleChange(value, "senha"))}
      />
      <Button
        style={{width: "80%"}}
        //onPress={() => {}} 
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


export default Employees