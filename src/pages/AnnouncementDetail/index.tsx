import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Title from "../../components/Title";
import Card from "../../components/Card";
import { Anuncio } from "../../types/apiTypes";
import { useCallback, useContext, useEffect, useState } from "react";
import { areaFormat, formatMoney, formatDate } from "../../utils/FormatData"
import { api } from "../../api/api";
import Loading from "../../components/Loading";
import { useRoute } from "@react-navigation/native";
import React from "react";
import Button from "../../components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { UserContext } from "../../context/userProvider";
import Heart from '../../assets/icons/heart.png'
import HeartEmpty from '../../assets/icons/heart-empty.png'

const AnnouncementDetail = () => {
  const { user } = useContext(UserContext)
  const [isLoggedIn] = useState(!!user?.data);
  const userExists = user?.data
  const employeeAccess = (isLoggedIn && userExists && user.isEmployee)

  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [favoriteData, setFavoriteData] = useState<any>(undefined)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [property, setProperty] = useState<Anuncio>()
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useRoute<any>();

  const imovel = property?.imovel
  const endereco = property?.imovel?.endereco

  const favoriteRequest = async () => {
    setIsFavorite(!isFavorite)

    if (isFavorite && favoriteData) {
      api.delete(`/favoritos?id=${favoriteData.id}`).then((result) => {
        setFavoriteData(undefined)
      })
    
      return
    }

    api.post(`/favoritos`, {
      "clienteId": user.data.id,
      "anuncioId": params.id
    }).then((result) => {
      setFavoriteData(result.data)
    })
  }

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

  const getFavorites = () => {
    api.get(`/favoritos?id=${user.data.id}`).then(result => {
      
    const isFavorite = result.data.find((favorite: any) => {
      return favorite.anuncioId === params.id
    })

    setFavoriteData(isFavorite)

    if (isFavorite) setIsFavorite(true)
    })
  }

  const showInterest = (id: number | undefined) => {
    if(id) {
      nav.navigate('RegisterInterest', { id })
    }
  }

  const showListInterest = (id: number | undefined) => {
    if(id) {
      nav.navigate('Interested', { id })
    }
  }

  useFocusEffect(useCallback(() => {
    getProperty()
    getFavorites()
  }, []))

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
          {isFavorite && !employeeAccess && <Button style={{ marginTop: 20 }} onPress={favoriteRequest}>
            Remover dos Favoritos <Image style={styles.image} source={Heart} />
          </Button>}
          {!isFavorite && !employeeAccess && <Button style={{ marginTop: 20 }} onPress={favoriteRequest}>
            Adicionar aos Favoritos <Image style={styles.image} source={HeartEmpty} />
          </Button>}
          {
            employeeAccess
            ?
            <Button style={{ marginTop: 20 }} onPress={() => showListInterest(property?.id)}>Ver Interessados</Button>
            :
            <Button style={{ marginTop: 20 }} onPress={() => showInterest(property?.id)}>Demonstrar Interesse</Button>                
          }
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
  image: {
    width: 23,
    height: 23,
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