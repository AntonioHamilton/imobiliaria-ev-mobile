import React, { useCallback, useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { api } from "../../api/api";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import { UserContext } from "../../context/userProvider";
import FavoriteCard from "../../components/FavoriteCard";
import { RootStackParamList } from "../../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { formatMoney } from "../../utils/FormatData";

const Favorites = () => {
  const { user } = useContext(UserContext)
  const [favorites, setFavorites] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getFavorites = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get(`/favoritos?id=${user.data.id}`)
      setFavorites(data);
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false);    
  }

  useFocusEffect(useCallback(() => {
    getFavorites()
  }, []))

  return (
    <ScrollView>
      <View style={{ marginVertical: 20, marginHorizontal: 16, alignItems: "center", flex: 1, marginTop: 40 }}>
        <Title>FAVORITOS</Title>
        {!isLoading && favorites.map((favorite: any) => (
          <FavoriteCard
            key={favorite.id}
            name={favorite.anuncio.titulo}
            price={formatMoney(favorite.anuncio.valor)}
            onPress={() => nav.navigate('AnnouncementDetail', { id: favorite.anuncioId })}
          />
        ))}
        {favorites.length === 0 && !isLoading && <EmptyState text={"Você ainda não adicionou nada ao seus favoritos!"}/>}
      </View>

      {isLoading && <Loading />}
    </ScrollView>
  )
}

export default Favorites;