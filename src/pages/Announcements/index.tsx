import { useEffect, useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { api } from "../../api/api";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import Title from "../../components/Title";
import { SearchContext } from "../../context/searchProvider";
import useDebounce from "../../hooks/useDebounce";
import { Announcement } from "../../types/apiTypes";
import { formatMoney, formatType } from "../../utils/FormatData";

const Home = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

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
      return announcements.filter((anuncio) => {
        return anuncio.titulo.toLowerCase().search(debouncedSearchTerm.toLowerCase()) >= 0
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
          <Card
            key={announcement.id}
            title={announcement.titulo} 
            type={formatType(announcement.tipo)} 
            price={formatMoney(announcement.valor)} 
            link={`${announcement.id}`}
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