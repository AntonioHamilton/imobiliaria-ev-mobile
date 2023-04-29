import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { View, Text, StyleSheet, Alert, Switch } from 'react-native'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/types'
import { api } from '../../api/api'
import TextField from '../../components/TextField'

const EmployeeDetail = ({ route: { params: { id, isOnlyOne } } }: any) => {
  const [data, setData] = useState<{[key: string]: string | number}>({})
  const [changePassword, setChangePassword] = useState(false)

  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const getEmployee = async () => {
    const res = await api.get(`/funcionarios/${id}`)
    setData({
      nome: res.data.nome,
      email: res.data.email
    })
  }

  const handleEmployeeChange = async () => {
    const funcionario = {
      ...data,
      password: changePassword ? data.password : undefined,
    };

    await api.put(`/funcionarios/${id}`, funcionario)

    nav.navigate('Employees')
  }

  const handleChange = (value: string | number, name: string) => {
    const newData = data;
    newData[name] = value
    setData(newData)
  }

  const handleDelete = () => {
    Alert.alert('Aviso', 'Realmente deseja deletar este funcionário?', [
      {
        text: 'Não',
        onPress: () => {
          console.log('Cancel')
        }
      },
      {
        text: 'Sim',
        onPress: () => {
          api.delete(`/funcionarios/${id}`)
            .then(() => {
                Alert.alert('Aviso', 'Funcionário deletado!')
                nav.navigate('Employees')
            }).catch(() => Alert.alert('Aviso', 'Erro ao deletar funcionário!'))
        }
      }
    ])
  }

  useEffect(() => {
    getEmployee()
  }, [])

  return (
    <View style={{ 
      marginVertical: 20, 
      marginHorizontal: 16, 
      alignItems: "center", 
      flex: 1, 
      marginTop: 40 
    }}>
      <Title>FUNCIONÁRIO {String(id)}</Title>
      <TextField
        label="Nome *"
        placeholder="Nome completo"
        autoCorrect={false}
        defaultValue={data.nome as string}
        onChange={(value => handleChange(value, "nome"))}
      />
      <TextField
        label="Email *"
        placeholder="usuario@gmail.com"
        autoCorrect={false}
        defaultValue={data.email as string}
        onChange={(value => handleChange(value, "email"))}
      />
      <View 
        style={{
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center" 
        }}
      >
        <Switch 
          value={changePassword} 
          onChange={() => setChangePassword(!changePassword)}
          thumbColor="#9155fd"
          trackColor={{
            true: "#c8a9fe",
            false: "#89868ede"
          }}
        />
        <Text>Mudar a senha?</Text>
      </View>
      {changePassword &&
        <TextField
          label="Senha *"
          placeholder="senha"
          autoCorrect={false}
          onChange={(value => handleChange(value, "password"))}
          secureTextEntry
        />
      }
      <Button style={{marginBottom: 8}} onPress={handleEmployeeChange}>
        Salvar Alterações
      </Button>
      {!isOnlyOne && 
        <Button style={styles.buttonDelete} onPress={handleDelete}>
          Remover Funcionário
        </Button>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  buttonDelete: {
    backgroundColor: "#FF4C51"
  }
})

export default EmployeeDetail