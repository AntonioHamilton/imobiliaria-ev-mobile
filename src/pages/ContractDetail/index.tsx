import React, { useCallback, useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Contrato } from "../../types/apiTypes";
import { api } from "../../api/api";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import Button from "../../components/Button";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { formatFullDate, formatMoney, formatType } from "../../utils/FormatData";

const ContractDetail = ({ route: { params: { contratoId, imovelId } } }: any) => {
  const [contract, setContract] = useState<Contrato | any>()
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getContract = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get(`/contrato/${contratoId}`)
      setContract(data);
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false);    
  }
  
  const handleEdit = () => {
    nav.navigate('ChangeContract', { contratoId, imovelId })
  }

  const handleDelete = () => {
    Alert.alert('Aviso', 'Realmente deseja revogar este contrato?', [
      {
          text: 'Não',
          onPress: () => {
            console.log('Cancel')
          }
      },
      {
          text: 'Sim',
          onPress: () => {
            api.delete(`/contrato/${contratoId}`)
                  .then(() => {
                      Alert.alert('Aviso', 'Contrato revogado!')
                      nav.navigate('Contracts', imovelId)
                  }).catch(() => Alert.alert('Aviso', 'Erro ao revogar contrato!'))
          }
      }
    ])
  }

  const verifyContractExpired = (signDate: Date, expirationDate: Date) => {
    const today = new Date()
    if (today <= new Date(expirationDate)) return true;
    return new Date(signDate) >= new Date(expirationDate)
  }

  function getOnlyDate(date: string) {
    if(!date) return "";
    return new Date(date).toISOString().split('T')[0].split('-').reverse().join('/')
  }
  
  async function handleGeneratePDFConctract() {
    const html = `
      <h1 style="font-size: 50px;">Contrato</h1>
      <br />
      <h2>Sobre</h2>
      <span><b>Tipo de Contrato:</b> ${contract?.tipo ? (contract?.tipo.replace(' ', '') == "v" ? "Venda" : "Aluguel") : ""}</span><br />
      <span><b>Data de Vencimento:</b> ${getOnlyDate(contract?.vencimento) || ""}</span><br />
      <span><b>Data de Assinatura:</b> ${getOnlyDate(contract?.dataAssinatura) || ""}</span><br />
      <span><b>Valor:</b> ${contract?.valor || ""}</span><br />
      <br />
      <hr />
      <h2>Cliente</h2>
      <span><b>Nome:</b> ${contract?.cliente?.nome || ""}</span><br />
      <span><b>CPF:</b> ${contract?.cliente?.cpf || ""}</span><br />
      <span><b>RG:</b> ${contract?.cliente?.rg || ""}</span><br />
      <span><b>Data de Nascimento:</b> ${getOnlyDate(contract?.cliente?.dataNascimento) || ""}</span><br />
      <span><b>Telefone:</b> ${contract?.cliente?.telefone || ""}</span><br />
      <span><b>E-mail:</b> ${contract?.cliente?.email || ""}</span><br />
      <br />
      <hr />
      <h2>Endereço</h2>
      <span><b>Logradouro:</b> ${contract?.imovel?.endereco?.logradouro || ""}</span><br />
      <span><b>Cidade:</b> ${contract?.imovel?.endereco?.cidade || ""}</span><br />
      <span><b>Estado:</b> ${contract?.imovel?.endereco?.estado || ""}</span><br />
      <span><b>CEP:</b> ${contract?.imovel?.endereco?.cep || ""}</span><br />
      <span><b>País:</b> ${contract?.imovel?.endereco?.pais || ""}</span><br />
      ${contract?.imovel?.endereco?.complemento ? `<span><b>Complemento:</b> ${contract?.imovel?.endereco?.complemento || ""}</span><br />` : ""}
      <span><b>Número:</b> ${contract?.imovel?.endereco?.numero || ""}</span>
      <span style="position: absolute; bottom: 20px; right: 20px;"><b>Funcionário:</b> ${contract?.imovel?.funcionario?.nome || ""}</span>
    `
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  useFocusEffect(useCallback(() => {
    getContract()
  },[]))

  return (
    <ScrollView>
      {!isLoading && 
        <View style={styles.container}>
          <Title>INFORMAÇÕES DO CONTRATO</Title>
          <Text style={styles.addressTitle}>Id: {contract?.id}</Text>
          <View>
            {
              verifyContractExpired(
                contract?.dataAssinatura as Date, 
                (contract?.vencimento as Date)
              ) ? 
                (<Text style={styles.contractTypeCancel}>
                  Contrato revogado
                </Text>)
                :
                (<Text style={styles.contractTypeActive}>
                  Contrato Ativo
                </Text>)
            }
          </View>
          <Text style={styles.descriptionsContainer}>Tipo: {formatType(contract?.tipo as string)}</Text>
          <Text style={styles.descriptionsContainer}>Valor: {formatMoney(contract?.valor)}</Text>
          <Text style={styles.descriptionsContainer}>Assinatura: {formatFullDate(contract?.dataAssinatura as Date)}</Text>
          <Text style={styles.descriptionsContainer}>Vencimento: {formatFullDate(contract?.vencimento as Date)}</Text>

          <Button 
            transparent
            onPress={handleEdit}
            style={{...styles.buttonTransparent, marginTop: 40}}
          >
            Alterar Contato
          </Button>
          <Button style={{marginBottom: 16}} onPress={async () => await handleGeneratePDFConctract()}>
            Visualizar Contrato Completo (PDF)
          </Button>
          <Button style={styles.buttonDelete} onPress={handleDelete}>
            Revogar Contrato
          </Button>
        </View>
      }
      {isLoading && <Loading />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20, 
    marginHorizontal: 16, 
    flex: 1, 
    marginTop: 40,
    alignItems: "center"
  },
  addressTitle: {
    fontSize: 20, 
    fontWeight: "600", 
    color: "#3a3541de",
    marginBottom: 12
  },
  descriptions: {
    fontSize: 16, 
    color: "#3a3541ad", 
  },
  descriptionsContainer: {
    fontSize: 18, 
    color: "#3a3541ad", 
  },
  buttonTransparent: {
    marginBottom: 8,
    backgroundColor: "transparent",
    shadowColor: "transparent",
  },
  buttonDelete: {
    backgroundColor: "#FF4C51"
  },
  contractTypeActive: {
    fontSize: 20, 
    fontWeight: "600", 
    color: "#56CA00",
    marginBottom: 12
  },
  contractTypeCancel: {
    fontSize: 20, 
    fontWeight: "600", 
    color: "#FF4C51",
    marginBottom: 12
  },
})

export default ContractDetail