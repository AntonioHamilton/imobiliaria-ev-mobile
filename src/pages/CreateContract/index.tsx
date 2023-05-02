import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import Loading from "../../components/Loading"
import Title from "../../components/Title"
import { Picker } from '@react-native-picker/picker'
import { api } from '../../api/api'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/types'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import { formatFullDate, formatStringToDate } from '../../utils/FormatData'

const CreateContract = ({ route: { params: { imovelId } } }: any) => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [contractType, setContractType] = useState("v")

  const [contrato, setContrato] = useState<{[key: string]: string | number | boolean | Date}>({
    vencimento: '',
    dataAssinatura: '',
    valor: 0,
    imovelId: Number(imovelId),
  });

  const [cliente, setCliente] = useState<{[key: string]: string | number | boolean | Date}>({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: '',
    telefone: "",
    email: "",
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

  
  const handleChange = (type: "contrato" | "endereço" | "cliente", value: string | number, name: string) => {
    if (type === "contrato") {
      const newData = contrato;
      newData[name] = value
      setContrato(newData)
    }
    if (type === "endereço") {
      const newData = enderecoCliente;
      newData[name] = value
      setEnderecoCliente(newData)
    }
    if (type === "cliente") {
      const newData = cliente;
      newData[name] = value
      setCliente(newData)
    }
  }

  const onSubmit = async () => {

    const vencimentoFormatted = formatStringToDate(contrato.vencimento as string)
    const assinaturaFormatted = formatStringToDate(contrato.dataAssinatura as string)
    const nascimentoFormatted = formatStringToDate(cliente.dataNascimento as string)

    if (vencimentoFormatted.error) {
      Alert.alert('Adicione uma data de vencimento válida')
      return
    }

    if (assinaturaFormatted.error) {
      Alert.alert('Adicione uma data de assinatura válida')
      return
    }

    if (nascimentoFormatted.error) {
      Alert.alert('Adicione uma data de nascimento válida')
      return
    }

    try {
      setLoading(true);
      await api.post("/contrato",
      { 
        contrato: {
          ...contrato, 
          vencimento: vencimentoFormatted.date,
          dataAssinatura: assinaturaFormatted.date,
          tipo: contractType
        }, 
        cliente: {
          ...cliente,
          dataNascimento: nascimentoFormatted.date
        }, 
        endereco: enderecoCliente 
      });

      setLoading(false);
      nav.navigate('PropertyDetail', { id: imovelId });
    } catch (e) {
      Alert.alert('Não foi possível emitir um contrato')
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      {!loading && <View style={styles.container}>
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
          <Picker.Item label="Aluguel" value={"a"} />
          <Picker.Item label="Venda" value={"v"} />
        </Picker>
        <TextField
          placeholder='01/05/2024'
          label='Data de vencimento *'
          onChange={(value) => handleChange('contrato', value, "vencimento")}
          autoCorrect={false}
        />
        <TextField
          placeholder='01/05/2023'
          label='Data de assinatura *'
          onChange={(value) => handleChange('contrato', value, "dataAssinatura")}
          autoCorrect={false}
        />
        <TextField
          defaultValue={String(contrato.valor)}
          label='Valor *'
          onChange={(value) => handleChange('contrato', Number(value), "valor")}
          autoCorrect={false}
        />
        <Text style={styles.formTitle}>Sobre o cliente</Text>
        <TextField
          placeholder='nome'
          label='Nome *'
          onChange={(value) => handleChange('cliente', value, "nome")}
          autoCorrect={false}
        />
        <TextField
          placeholder='999.999.999-99'
          label='CPF *'
          onChange={(value) => handleChange('cliente', value, "cpf")}
          autoCorrect={false}
        />
        <TextField
          placeholder='9999999-9'
          label='RG *'
          onChange={(value) => handleChange('cliente', value, "rg")}
          autoCorrect={false}
        />
        <TextField
          placeholder='01/05/2023'
          label='Data de nascimento *'
          onChange={(value) => handleChange('cliente', value, "dataNascimento")}
          autoCorrect={false}
        />
        <TextField
          placeholder='(79) 99999-9999'
          label='Telefone *'
          onChange={(value) => handleChange('cliente', value, "telefone")}
          autoCorrect={false}
        />
        <TextField
          placeholder='teste@gmail.com'
          label='Email *'
          onChange={(value) => handleChange('cliente', value, "email")}
          autoCorrect={false}
        />
        <Text style={styles.formTitle}>Endereço do cliente</Text>
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
        <Button
          style={{width: "80%", alignSelf: "center"}}
          onPress={() => onSubmit()} 
        >
          Emitir Contrato
        </Button>
      </View>
      }
      {loading && <Loading/>}
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

export default CreateContract