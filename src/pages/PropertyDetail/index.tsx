import React, { useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Imovel } from "../../types/apiTypes";
import { api } from "../../api/api";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";

const PropertyDetail = () => {
  const [property, setProperty] = useState<Imovel>()
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useRoute<any>();
  const endereco = property?.endereco
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getProperty = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get(`/imoveis/${params.id}`)
      setProperty(data);
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false);    
  }
  
  const handleEdit = () => {
    nav.navigate('RegisterProperty', { id: property?.id})
  }

  const handleDelete = () => {
    Alert.alert('Aviso', 'Realmente deseja deletar este imóvel?', [
      {
          text: 'Não',
          onPress: () => {
            console.log('Cancel')
          }
      },
      {
          text: 'Sim',
          onPress: () => {
            api.delete(`/imoveis/${params.id}`)
                  .then(() => {
                      Alert.alert('Aviso', 'Imóvel deletado!')
                      nav.navigate('Properties')
                  }).catch(() => Alert.alert('Aviso', 'Erro ao deletar imóvel!'))
          }
      }
    ])
  }

  useEffect(() => {
    getProperty()
  }, [])

  return (
    <ScrollView>
      {!isLoading && 
        <View style={styles.container}>
          <Title>Imóvel na {endereco?.logradouro}</Title>
          <Text style={styles.descriptionsContainer}>{property?.tipo.nome} | {property?.area} m²</Text>
          <Text style={styles.descriptionsContainer}>IPTU: {property?.iptu} R$</Text>
          <Text style={styles.descriptionsContainer}>
            {property?.disponivel ? 
              <Text>
                Imóvel disponível para anúncio
              </Text> : <Text>
                Imóvel não disponível para anúncio
              </Text>
            }
          </Text>
          <Card>
            <Text style={styles.addressTitle}>Informações do Endereço</Text>
            <View>
              <Text style={styles.descriptions}>{endereco?.pais}</Text>
              <Text style={styles.descriptions}>{endereco?.estado}, {endereco?.cidade}</Text>
              <Text style={styles.descriptions}>{endereco?.logradouro} - {endereco?.numero}, {endereco?.cep}</Text>
            </View>
          </Card>
          <Button onPress={handleEdit} transparent style={{...styles.buttonTransparent, marginTop: 40}}>
            Editar Imóvel
          </Button>
          <Button  transparent style={styles.buttonTransparent}>
            Criar Anúncio
          </Button>
          <Button onPress={() => nav.navigate('CreateContract', { imovelId: params.id })} transparent style={styles.buttonTransparent}>
            Emitir Contrato
          </Button>
          <Button onPress={() => nav.navigate('Contracts')} transparent style={styles.buttonTransparent}>
            Visualizar Contratos
          </Button>
          <Button style={styles.buttonDelete} onPress={handleDelete}>
            Excluir Imóvel
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
  }
})

export default PropertyDetail