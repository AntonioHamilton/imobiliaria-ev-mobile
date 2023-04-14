import React, { useEffect, useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { api } from "../../api/api";
import AnnouncementCard from "../../components/AnnouncementCard";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import Title from "../../components/Title";
import { SearchContext } from "../../context/searchProvider";
import useDebounce from "../../hooks/useDebounce";
import { Anuncio } from "../../types/apiTypes";
import { formatMoney, formatType } from "../../utils/FormatData";

const Home = () => {
  const [announcements, setAnnouncements] = useState<Anuncio[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Anuncio[]>([]);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 0);

  const getAnnouncements = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get('/anuncios')
      setAnnouncements(data);
      setFilteredAnnouncements(data)
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false);    
  }

  const searchInList = () => {
    if (debouncedSearchTerm && announcements) {
      return announcements.filter((announcement) => {
        return announcement.titulo.toLowerCase().search(debouncedSearchTerm.toLowerCase()) >= 0
      })
    } 
    return announcements
  }

  useEffect(() => {
    setSearchTerm('')
    getAnnouncements()
  }, [])

  useEffect(() => {
    setFilteredAnnouncements(searchInList())
  }, [debouncedSearchTerm])

  return (
    <ScrollView>
      <View style={{ marginVertical: 20, marginHorizontal: 16, alignItems: "center", flex: 1, marginTop: 40 }}>
        <Title>ANÚNCIOS</Title>
        <Search setSearch={setSearchTerm}/>
        {!isLoading && filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            title={announcement.titulo} 
            type={formatType(announcement.tipo)} 
            price={formatMoney(announcement.valor)} 
            navConfig={{link: "AnnouncementDetail", id: announcement.id}}
          />
        ))}
        {announcements.length === 0 && !isLoading && <EmptyState text={"Não existem anúncios ainda!"}/>}
        {announcements.length !== 0 && filteredAnnouncements.length === 0 && !isLoading && <EmptyState text={"Nenhum anúncio foi encontrado para essa busca"}/>}
      </View>

      {isLoading && <Loading />}
    </ScrollView>
  )
}

export default Home;