import React, { useEffect, useState } from 'react'

import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import Title from "../../components/Title"
import { Picker } from "@react-native-picker/picker"
import TextField from "../../components/TextField"
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { api } from '../../api/api'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/types'
import { Contrato } from '../../types/apiTypes'
import { formatFullDate, formatStringToDate } from '../../utils/FormatData'

const ChangeContract = ({ route: { params: { imovelId, contratoId } } }: any) => {
  const [contractType, setContractType] = useState("V")
  const [contract, setContract] = useState<Contrato>()
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [contrato, setContrato] = useState<{[key: string]: string | number | boolean | Date}>({
    vencimento: '',
    dataAssinatura: '',
    valor: 0,
    imovelId: Number(imovelId),
  });

  const handleChange = (value: string | number, name: string) => {
    const newData = contrato;
    newData[name] = value
    setContrato(newData)
  }

  const getContract = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get(`/contrato/${contratoId}`)
      setContract(data)
      setContrato({
        vencimento: formatFullDate(data.vencimento),
        dataAssinatura: formatFullDate(data.dataAssinatura),
        valor: data.valor,
        imovelId: Number(imovelId),
      });
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false);    
  }

  const handleSubmit = async () => {
    const vencimentoFormatted = formatStringToDate(contrato.vencimento as string)
    const assinaturaFormatted = formatStringToDate(contrato.dataAssinatura as string)

    if (vencimentoFormatted.error) {
      Alert.alert('Adicione uma data de vencimento válida')
      return
    }

    if (assinaturaFormatted.error) {
      Alert.alert('Adicione uma data de assinatura válida')
      return
    }

    try {
      await api.put(`/contrato/${contratoId}`, { contrato: {
        ...contrato, 
        vencimento: vencimentoFormatted.date,
        dataAssinatura: assinaturaFormatted.date,
        tipo: contractType
      } })
      nav.navigate('ContractDetail', { imovelId, contratoId })
    } catch (e) {
      Alert.alert('Erro ao alterar o contrato')
      console.error(e)
    }
  }

  useEffect(() => {
    getContract()
  }, [])

  return (
    <ScrollView>
      {!isLoading && <View style={styles.container}>
        <Title>
          {true ? "Emitir Contrato" : "Cadastrar Imóvel"}
        </Title>
        <Text style={styles.formTitle}>Sobre o contrato</Text>
        <Text style={styles.pickerLabel}>Tipo de contrato *</Text>
        <Picker
          style={styles.picker}
          selectedValue={contractType}
          onValueChange={(itemValue) => setContractType(itemValue)}
        >
          <Picker.Item label="Aluguel" value={"A"} />
          <Picker.Item label="Venda" value={"V"} />
        </Picker>
        <TextField
          defaultValue={formatFullDate(contract?.dataAssinatura as Date)}
          placeholder='01/05/2023'
          label='Data de assinatura *'
          onChange={(value) => handleChange(value, "dataAssinatura")}
          autoCorrect={false}
        />
        <TextField
          defaultValue={formatFullDate(contract?.vencimento as Date)}
          placeholder='01/05/2024'
          label='Data de vencimento *'
          onChange={(value) => handleChange(value, "vencimento")}
          autoCorrect={false}
        />
        <TextField
          defaultValue={String(contract?.valor)}
          label='Valor *'
          onChange={(value) => handleChange(Number(value), "valor")}
          autoCorrect={false}
        />
        <Button
          onPress={handleSubmit}
          style={{width: "80%", alignSelf: "center"}}
        >
          Alterar contrato
        </Button>
      </View>
      }
      {isLoading && <Loading/>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20, 
    marginHorizontal: 16, 
    flex: 1,
    marginTop: 40,
    paddingBottom: 50
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
  },
  formTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
})

export default ChangeContract;