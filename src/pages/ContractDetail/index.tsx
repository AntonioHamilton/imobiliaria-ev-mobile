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
    const formattedSignDate = new Date(signDate)
    const formattedExpirationDate = new Date(expirationDate)
    const today = new Date()
    if (today >= formattedExpirationDate) return true;
    return formattedSignDate >= formattedExpirationDate
  }

  function getOnlyDate(date: string) {
    if(!date) return "";
    return new Date(date).toISOString().split('T')[0].split('-').reverse().join('/')
  }
  
  async function handleGeneratePDFConctract() {
    const html = `<body style="margin: 0"><div style="position: relative; font-family: system-ui, sans-serif;">
    <div style="display: flex; justify-content: center;">
      <h1 style="background-color: #9155fd; padding: 16; font-size: 24; color: #FFF; width: 400; text-align: center; margin-top: 0">Contrato de locação</h1>
    </div>
    <h2 style="text-align: center; margin: 0;">Este Contrato é acordado entre:</h2>
    <div style="display: flex; flex-direction: row; justify-content: space-evenly; text-align: center;">
      <div>
        <h3 style="margin-bottom: 16px;">Responsável</h3>
        <h4 style="margin-top: 0px;">Kit In Net LTDA.</h4>
      </div>
      <div>
        <h3 style="margin-bottom: 16px;">Inquilino</h3>
        <h4 style="margin-top: 0px;">${contract?.cliente?.nome || ""}</h4>
      </div>
    </div>
    <h2 style="margin-bottom: 8px;">O Proprietário concorda em ${contract?.tipo ? (contract?.tipo.replace(' ', '') == "v") ? "Vender" : "Alugar" : ""} o imóvel localizado em:</h2>
    <div style="margin-bottom: 16px;">
      ${contract?.imovel?.endereco?.logradouro || ""}, ${contract?.imovel?.endereco?.numero || ""}, ${contract?.imovel?.endereco?.complemento || ""}. 
      ${contract?.imovel?.endereco?.cidade || ""} - ${contract?.imovel?.endereco?.estado || ""}.${contract?.imovel?.endereco?.cep || ""}. 
      ${contract?.imovel?.endereco?.pais || ""}
    </div>
    <div>
      A data de vencimento deste contrato é ${getOnlyDate(contract?.vencimento) || ""}, começando em ${getOnlyDate(contract?.dataAssinatura) || ""} ${contract?.tipo ? (contract?.tipo.replace(' ', '') == "v") ? `com valor de ${formatMoney(contract?.valor)} a ser pago` : `, no valor acordado de ${formatMoney(contract?.valor)} a ser pago mensalmente,` : ""} na execução desse contrato e o valor de
      ${formatMoney(contract?.imovel?.iptu) || "R$ 0"} como IPTU do imóvel.
    </div>
    <h2>Cliente</h2>
    <span><b>Nome:</b> ${contract?.cliente?.nome || ""}</span><br />
    <span><b>CPF:</b> ${contract?.cliente?.cpf || ""}</span><br />
    <span><b>RG:</b> ${contract?.cliente?.rg || ""}</span><br />
    <span><b>Data de Nascimento:</b> ${getOnlyDate(contract?.cliente?.dataNascimento) || ""}</span><br />
    <span><b>Telefone:</b> ${contract?.cliente?.telefone || ""}</span><br />
    <span><b>E-mail:</b> ${contract?.cliente?.email || ""}</span><br />
    <h2>Termos e condições</h2>
    <h3 style="margin: 8px 16px;">1. Uso da propriedade</h3>
    <p style="margin: 8px 32px;">A propriedade alugada deverá ser utilizando somente como residência.</p>
    <h3 style="margin: 8px 16px;">2. Do pagamento dos Serviços de utilidade pública</h3>
    <p style="margin: 8px 32px;">Durante o tempo de contrato, o locatário concordo em pagar os serviços de utilidade pública como luz, água, gás e outros serviços utilizados na propriedade.</p>
    <h3 style="margin: 8px 16px;">3. Reconhecimento</h3>
    <p style="margin: 8px 32px;"> As partes reconhecem e entendem os termos aqui estabelecidos neste Contrato. Assinado em ${getOnlyDate(contract?.dataAssinatura) || ""}</p>
   
    <div style="display: flex; justify-content: space-around; text-align: center; margin-top: 60px;">
      <div style="padding-bottom: 30px; border-bottom: 2px solid black; width: 200px; align-items: center">
        <h3>
          Responsável
        </h3>
      </div>
      <div style="padding-bottom: 30px; border-bottom: 2px solid black; width: 200px; align-items: center">
        <h3>
          Inquilino
        </h3>
      </div>
    </div>
  </div>
  </body>
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