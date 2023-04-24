import React from 'react'
import Title from '../../components/Title'
import { View, StyleSheet, Alert } from 'react-native'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/types'
import { api } from '../../api/api'

const EmployeeDetail = ({ route: { params: { id } } }: any) => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

  return (
    <View style={{ 
      marginVertical: 20, 
      marginHorizontal: 16, 
      alignItems: "center", 
      flex: 1, 
      marginTop: 40 
    }}>
      <Title>FUNCIONÁRIO {String(id)}</Title>
      <Button style={styles.buttonDelete} onPress={handleDelete}>Excluir Funcionário</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonDelete: {
    backgroundColor: "#FF4C51"
  }
})

export default EmployeeDetail