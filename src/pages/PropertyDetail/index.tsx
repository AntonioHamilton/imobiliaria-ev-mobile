import { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useRoute } from "@react-navigation/native";
import { Imovel } from "../../types/apiTypes";
import { api } from "../../api/api";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import Card from "../../components/Card";
import Button from "../../components/Button";

const PropertyDetail = () => {
  const [property, setProperty] = useState<Imovel>()
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useRoute<any>();
  const endereco = property?.endereco

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

  useEffect(() => {
    getProperty()
  }, [])

  return (
    <ScrollView>
      {!isLoading && 
        <View style={styles.container}>
          <Title>Imóvel na {endereco?.logradouro}</Title>
          <Text style={styles.descriptionsContainer}>{property?.tipo.nome} | ${property?.area} m²</Text>
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
          <Button transparent style={{...styles.buttonTransparent, marginTop: 40}}>
            Editar Imóvel
          </Button>
          <Button transparent style={styles.buttonTransparent}>
            Criar Anúncio
          </Button>
          <Button transparent style={styles.buttonTransparent}>
            Emitir Contrato
          </Button>
          <Button transparent style={styles.buttonTransparent}>
            Visualizar Contratos
          </Button>
          <Button style={styles.buttonDelete}>
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