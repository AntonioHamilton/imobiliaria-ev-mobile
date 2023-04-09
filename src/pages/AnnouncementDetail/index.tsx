import { View, ScrollView, Text, StyleSheet } from "react-native";
import Title from "../../components/Title";
import Card from "../../components/Card";
import { Anuncio } from "../../types/apiTypes";
import { useEffect, useState } from "react";
import { areaFormat, formatMoney, formatDate } from "../../utils/FormatData"
import { api } from "../../api/api";
import Loading from "../../components/Loading";
import { useRoute } from "@react-navigation/native";

const AnnouncementDetail = () => {
  const [property, setProperty] = useState<Anuncio>()
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useRoute<any>();

  const imovel = property?.imovel
  const endereco = property?.imovel?.endereco

  const getProperty = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get(`/anuncios/${params.id}`)
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
          <Title>{property?.titulo}</Title>
          <Text style={styles.descriptionsContainer}>Data de publicação: {formatDate(property?.dataDeCriacao)}</Text>
          <Text style={styles.value}>Valor: {formatMoney(property?.valor)}</Text>
          <Text style={styles.descriptionsContainer}>IPTU: {formatMoney(imovel?.iptu)}</Text>
          <Text style={[styles.descriptionsContainer, { marginBottom: 12 }]}>Área: {areaFormat(imovel?.area)}</Text>
          <Card>
            <Text style={styles.addressTitle}>Informações do Endereço</Text>
            <View>
              <Text style={styles.descriptions}>{endereco?.pais}</Text>
              <Text style={styles.descriptions}>{endereco?.estado}, {endereco?.cidade}</Text>
              <Text style={styles.descriptions}>{endereco?.logradouro} - {endereco?.numero}, {endereco?.cep}</Text>
            </View>
          </Card>
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
  value: {
    fontSize: 18, 
    color: "#3a3541de",
  }
})

export default AnnouncementDetail